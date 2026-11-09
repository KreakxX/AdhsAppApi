#!/usr/bin/env bash
# Deploy der remindspot-api auf den Server.
#   ./deploy.sh            -> bauen, übertragen, Container austauschen, prüfen
#   ./deploy.sh rollback   -> Container auf <IMAGE_NAME>:previous zurückschalten
set -euo pipefail

# --- Konfiguration -----------------------------------------------------------
SERVER_IP="87.106.135.145"
SERVER_USER="root"
CONTAINER_NAME="remindspot-api"
IMAGE_NAME="remindspot-api"
HOST_PORT="8070"
CONTAINER_PORT="8060"
REMOTE_ENV_FILE="/opt/remindspot-api/.env"   # wird nur als Pfad an docker übergeben, nie gelesen
HEALTH_WAIT_SECONDS=10
# -----------------------------------------------------------------------------

SERVER="${SERVER_USER}@${SERVER_IP}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

log() { printf '\n==> %s\n' "$*"; }

# Tauscht auf dem Server den laufenden Container gegen einen neuen aus dem
# angegebenen Image aus, prüft ihn und stellt bei Fehler den alten wieder her.
remote_swap() {
  local image="$1"
  ssh "$SERVER" bash -s -- \
    "$CONTAINER_NAME" "$image" "$HOST_PORT" "$CONTAINER_PORT" "$REMOTE_ENV_FILE" "$HEALTH_WAIT_SECONDS" \
    <<'REMOTE'
set -euo pipefail
NAME="$1"; IMAGE="$2"; HOST_PORT="$3"; CONTAINER_PORT="$4"; ENV_FILE="$5"; WAIT="$6"
OLD="${NAME}_old"

exists() { docker container inspect "$1" >/dev/null 2>&1; }

if exists "$OLD"; then
  echo "FEHLER: Container '$OLD' existiert noch (abgebrochener Deploy?)." >&2
  echo "Bitte manuell prüfen und entfernen, bevor erneut deployt wird." >&2
  exit 1
fi

HAD_OLD=0
if exists "$NAME"; then
  echo "Stoppe '$NAME' und benenne in '$OLD' um ..."
  docker stop "$NAME" >/dev/null
  docker rename "$NAME" "$OLD"
  HAD_OLD=1
fi

echo "Starte neuen Container aus '$IMAGE' ..."
docker run -d --name "$NAME" --restart unless-stopped \
  -p "${HOST_PORT}:${CONTAINER_PORT}" \
  --env-file "$ENV_FILE" \
  "$IMAGE" >/dev/null || true

echo "Warte ${WAIT}s ..."
sleep "$WAIT"

RUNNING="$(docker inspect -f '{{.State.Running}}' "$NAME" 2>/dev/null || echo false)"
HTTP_CODE="$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:${HOST_PORT}/" || true)"
HTTP_CODE="${HTTP_CODE:-000}"
echo "Running=$RUNNING  HTTP=$HTTP_CODE"

if [ "$RUNNING" = "true" ] && [ "$HTTP_CODE" != "000" ]; then
  echo "Prüfung OK."
  if [ "$HAD_OLD" = "1" ]; then
    docker rm "$OLD" >/dev/null
  fi
  # Nur dangling Images entfernen, damit :previous für Rollbacks erhalten bleibt.
  docker image prune -f >/dev/null
  echo "Aufgeräumt."
  exit 0
fi

echo "FEHLER: Neuer Container ist nicht gesund. Letzte 30 Logzeilen:" >&2
docker logs --tail 30 "$NAME" 2>&1 || true

docker rm -f "$NAME" >/dev/null 2>&1 || true
if [ "$HAD_OLD" = "1" ]; then
  echo "Stelle alten Container wieder her ..." >&2
  docker rename "$OLD" "$NAME"
  docker start "$NAME" >/dev/null
fi
exit 1
REMOTE
}

deploy() {
  local ts
  ts="$(date +%Y%m%d-%H%M%S)"

  log "1/4 Baue Image ${IMAGE_NAME}:latest und ${IMAGE_NAME}:${ts}"
  docker build -f "${SCRIPT_DIR}/dockerfile" \
    -t "${IMAGE_NAME}:latest" -t "${IMAGE_NAME}:${ts}" \
    "$SCRIPT_DIR"

  log "2/4 Sichere aktuelles Server-Image als ${IMAGE_NAME}:previous"
  ssh "$SERVER" "docker tag ${IMAGE_NAME}:latest ${IMAGE_NAME}:previous" \
    || echo "(noch kein Image auf dem Server – übersprungen)"

  log "3/4 Übertrage Image auf ${SERVER_IP}"
  docker save "${IMAGE_NAME}:latest" | gzip | ssh "$SERVER" 'gunzip | docker load'

  log "4/4 Tausche Container aus und prüfe"
  if remote_swap "${IMAGE_NAME}:latest"; then
    log "Deploy erfolgreich (${ts})."
  else
    log "Deploy FEHLGESCHLAGEN – alter Container wurde wiederhergestellt."
    exit 1
  fi
}

rollback() {
  log "Rollback auf ${IMAGE_NAME}:previous"
  if ! ssh "$SERVER" "docker image inspect ${IMAGE_NAME}:previous >/dev/null 2>&1"; then
    echo "FEHLER: Kein ${IMAGE_NAME}:previous auf dem Server vorhanden." >&2
    exit 1
  fi
  if remote_swap "${IMAGE_NAME}:previous"; then
    log "Rollback erfolgreich."
  else
    log "Rollback FEHLGESCHLAGEN – vorheriger Container wurde wiederhergestellt."
    exit 1
  fi
}

case "${1:-deploy}" in
  deploy)   deploy ;;
  rollback) rollback ;;
  *) echo "Nutzung: $0 [deploy|rollback]" >&2; exit 2 ;;
esac
