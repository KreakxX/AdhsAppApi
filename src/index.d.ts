import Elysia from "elysia";
export declare const app: Elysia<"", {
    decorator: {
        jwt: {
            sign(signValue: Omit<{
                [x: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | {
                    [key: string]: string | number | boolean | /*elided*/ any | /*elided*/ any | null | undefined;
                } | null | undefined)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined;
                } | null | undefined)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined;
                } | null | undefined)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined;
                } | null | undefined)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined;
                } | null | undefined)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined;
                } | null | undefined)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined;
                } | null | undefined)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined;
                } | null | undefined)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined;
                } | null | undefined)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined;
                } | null | undefined)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined;
                } | null | undefined)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined;
                } | null | undefined;
            }, "nbf" | "exp" | "iat"> & import("@elysiajs/jwt").JWTPayloadInput): Promise<string>;
            verify(jwt?: string, options?: import("jose").JWTVerifyOptions): Promise<false | ({
                [x: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | {
                    [key: string]: string | number | boolean | /*elided*/ any | /*elided*/ any | null | undefined;
                } | null | undefined)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined;
                } | null | undefined)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined;
                } | null | undefined)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined;
                } | null | undefined)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined;
                } | null | undefined)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined;
                } | null | undefined)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined;
                } | null | undefined)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined;
                } | null | undefined)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined;
                } | null | undefined)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined;
                } | null | undefined)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined;
                } | null | undefined)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | /*elided*/ any | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined)[] | /*elided*/ any | null | undefined;
                } | null | undefined;
            } & Omit<import("@elysiajs/jwt").JWTPayloadSpec, never>)>;
        };
    };
    store: {
        cache: {
            get: <T = any>(key: string) => Promise<T | null>;
            set: (key: string, data: any, ttlSeconds?: number) => Promise<boolean>;
            del: (key: string) => Promise<boolean>;
        };
    };
    derive: {};
    resolve: {};
}, {
    typebox: {};
    error: {};
} & {
    typebox: {};
    error: {};
} & {
    typebox: {};
    error: {};
} & {
    typebox: {};
    error: {};
}, {
    schema: {};
    standaloneSchema: {};
    macro: {};
    macroFn: {};
    parser: {};
    response: {};
} & {
    schema: {};
    standaloneSchema: {};
    macro: {};
    macroFn: {};
    parser: {};
    response: {};
} & {
    schema: {};
    standaloneSchema: {};
    macro: {};
    macroFn: {};
    parser: {};
    response: {};
} & {
    schema: {};
    standaloneSchema: {};
    macro: {};
    macroFn: {};
    parser: {};
    response: {};
}, {
    auth: {};
} & {
    auth: {
        auth: {
            google: {
                post: {
                    body: {
                        idToken: string;
                    };
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            token: string;
                        };
                        401: {
                            error: string;
                        };
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    };
} & {
    auth: {
        is: {
            user: {
                onboarded: {
                    get: {
                        body: unknown;
                        params: {};
                        query: {
                            userId: string;
                        };
                        headers: unknown;
                        response: {
                            200: {
                                onboarded: boolean;
                            };
                            422: {
                                type: "validation";
                                on: string;
                                summary?: string;
                                message?: string;
                                found?: unknown;
                                property?: string;
                                expected?: string;
                            };
                        };
                    };
                };
            };
        };
    };
} & {
    auth: {
        is: {
            jwt: {
                valid: {
                    get: {
                        body: unknown;
                        params: {};
                        query: unknown;
                        headers: unknown;
                        response: {
                            200: {
                                authenticated: boolean;
                            };
                            404: string;
                            422: {
                                type: "validation";
                                on: string;
                                summary?: string;
                                message?: string;
                                found?: unknown;
                                property?: string;
                                expected?: string;
                            };
                        };
                    };
                };
            };
        };
    };
} & {
    auth: {
        onboarding: {
            status: {
                put: {
                    body: {
                        onboarded: boolean;
                    };
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            ok: boolean;
                        };
                        401: string;
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    };
} & {
    auth: {
        account: {
            delete: {
                body: unknown;
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        deleted: boolean;
                    };
                    401: string;
                    404: string;
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    auth: {
        create: {
            log: {
                post: {
                    body: {
                        itemId?: string | null | undefined;
                        at: string;
                        routineId: string;
                        routineName: string;
                        itemName: string;
                        forgotten: boolean;
                        weekday: number;
                        minuteOfDay: number;
                    }[];
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        401: string;
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    };
} & {
    auth: {
        read: {
            log: {
                get: {
                    body: unknown;
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            at: string;
                            id: string;
                            userId: string;
                            routineId: string;
                            routineName: string;
                            itemId: string | null;
                            itemName: string;
                            forgotten: boolean;
                            weekday: number;
                            minuteOfDay: number;
                        }[];
                        401: string;
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    };
} & {
    routines: {};
} & {
    routines: {
        get: {
            body: unknown;
            params: {};
            query: unknown;
            headers: unknown;
            response: {
                200: {
                    routines: {
                        items: {
                            id: string;
                            name: string;
                            routineId: string;
                            description: string | null;
                            imageUrl: string | null;
                            checkedAt: Date | null;
                            checkedBy: string | null;
                        }[];
                        id: string;
                        name: string;
                        createdAt: Date;
                        groupId: string | null;
                        userId: string | null;
                        radius: number;
                        triggerHour: number | null;
                        triggerMinute: number | null;
                        freeSpace: number | null;
                        street: string | null;
                        streetNumber: string | null;
                        triggerOnExit: boolean;
                        activeDays: any;
                        timeframeEnd: string | null;
                        timeframeStart: string | null;
                        weeklyPlan: any;
                        locations: {
                            routineId: string;
                            latitude: number;
                            longitude: number;
                            locationId: string;
                        }[];
                    }[];
                };
                401: "No Authorization Header found" | "Invalid or expired token";
                422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                };
            };
        };
    };
} & {
    routines: {
        ":id": {
            get: {
                body: unknown;
                params: {
                    id: string;
                };
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        routine: {
                            items: {
                                id: string;
                                name: string;
                                routineId: string;
                                description: string | null;
                                imageUrl: string | null;
                                checkedAt: Date | null;
                                checkedBy: string | null;
                            }[];
                            locations: {
                                routineId: string;
                                latitude: number;
                                longitude: number;
                                locationId: string;
                            }[];
                        } & {
                            id: string;
                            name: string;
                            createdAt: Date;
                            groupId: string | null;
                            userId: string | null;
                            radius: number;
                            triggerHour: number | null;
                            triggerMinute: number | null;
                            freeSpace: number | null;
                            street: string | null;
                            streetNumber: string | null;
                            triggerOnExit: boolean;
                            activeDays: import("@prisma/client/runtime/library").JsonValue | null;
                            timeframeEnd: string | null;
                            timeframeStart: string | null;
                            weeklyPlan: import("@prisma/client/runtime/library").JsonValue | null;
                        };
                    };
                    401: "No Authorization Header found" | "Invalid or expired token";
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    routines: {
        post: {
            body: {
                items?: {
                    description?: string | null | undefined;
                    imageUrl?: string | null | undefined;
                    name: string;
                }[] | undefined;
                radius?: number | undefined;
                triggerHour?: number | null | undefined;
                triggerMinute?: number | null | undefined;
                freeSpace?: number | undefined;
                street?: string | null | undefined;
                streetNumber?: string | null | undefined;
                triggerOnExit?: boolean | undefined;
                activeDays?: number[] | null | undefined;
                timeframeEnd?: string | null | undefined;
                timeframeStart?: string | null | undefined;
                weeklyPlan?: {
                    freeSpace: number;
                    enabled: boolean;
                    days: {
                        active: boolean;
                        times: {
                            hour: number;
                            minute: number;
                        }[];
                    }[];
                } | null | undefined;
                name: string;
                locations: {
                    latitude: number;
                    longitude: number;
                }[];
            };
            params: {};
            query: unknown;
            headers: unknown;
            response: {
                200: {
                    routine: {
                        items: {
                            id: string;
                            name: string;
                            routineId: string;
                            description: string | null;
                            imageUrl: string | null;
                            checkedAt: Date | null;
                            checkedBy: string | null;
                        }[];
                        id: string;
                        name: string;
                        createdAt: Date;
                        groupId: string | null;
                        userId: string | null;
                        radius: number;
                        triggerHour: number | null;
                        triggerMinute: number | null;
                        freeSpace: number | null;
                        street: string | null;
                        streetNumber: string | null;
                        triggerOnExit: boolean;
                        activeDays: any;
                        timeframeEnd: string | null;
                        timeframeStart: string | null;
                        weeklyPlan: any;
                        locations: {
                            routineId: string;
                            latitude: number;
                            longitude: number;
                            locationId: string;
                        }[];
                    };
                };
                401: string;
                422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                };
            };
        };
    };
} & {
    routines: {
        ":id": {
            patch: {
                body: {
                    items?: {
                        description?: string | null | undefined;
                        imageUrl?: string | null | undefined;
                        name: string;
                    }[] | undefined;
                    name?: string | undefined;
                    radius?: number | undefined;
                    triggerHour?: number | null | undefined;
                    triggerMinute?: number | null | undefined;
                    freeSpace?: number | null | undefined;
                    street?: string | null | undefined;
                    streetNumber?: string | null | undefined;
                    triggerOnExit?: boolean | undefined;
                    activeDays?: number[] | null | undefined;
                    timeframeEnd?: string | null | undefined;
                    timeframeStart?: string | null | undefined;
                    weeklyPlan?: {
                        freeSpace: number;
                        enabled: boolean;
                        days: {
                            active: boolean;
                            times: {
                                hour: number;
                                minute: number;
                            }[];
                        }[];
                    } | null | undefined;
                    locations: {
                        latitude: number;
                        longitude: number;
                    }[];
                };
                params: {
                    id: string;
                };
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        routine: any;
                    };
                    401: string;
                    403: string;
                    404: string;
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    routines: {
        ":id": {
            delete: {
                body: unknown;
                params: {
                    id: string;
                };
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        message: string;
                    };
                    401: string;
                    403: string;
                    404: string;
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    routines: {
        ":id": {
            items: {
                ":itemId": {
                    patch: {
                        body: {
                            checkedBy: string;
                        };
                        params: {
                            id: string;
                            itemId: string;
                        };
                        query: unknown;
                        headers: unknown;
                        response: {
                            200: {
                                item: any;
                            };
                            401: string;
                            403: string;
                            404: string;
                            422: {
                                type: "validation";
                                on: string;
                                summary?: string;
                                message?: string;
                                found?: unknown;
                                property?: string;
                                expected?: string;
                            };
                        };
                    };
                };
            };
        };
    };
} & {
    routines: {
        ":id": {
            items: {
                ":itemId": {
                    delete: {
                        body: unknown;
                        params: {
                            id: string;
                            itemId: string;
                        };
                        query: unknown;
                        headers: unknown;
                        response: {
                            200: {
                                message: string;
                            };
                            401: string;
                            403: string;
                            404: string;
                            422: {
                                type: "validation";
                                on: string;
                                summary?: string;
                                message?: string;
                                found?: unknown;
                                property?: string;
                                expected?: string;
                            };
                        };
                    };
                };
            };
        };
    };
} & {
    notifications: {};
} & {
    notifications: {
        token: {
            post: {
                body: {
                    token: string;
                };
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        ok: boolean;
                    };
                    401: string;
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    notifications: {
        trigger: {
            post: {
                body: {
                    message?: string | undefined;
                    routineId: string;
                };
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        sent?: number | undefined;
                        ok: boolean;
                    };
                    401: string;
                    400: string;
                    404: string;
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    groups: {};
} & {
    groups: {
        post: {
            body: {
                name: string;
            };
            params: {};
            query: unknown;
            headers: unknown;
            response: {
                200: {
                    group: {
                        id: string;
                        name: string;
                        createdAt: Date;
                        routines: {
                            items: {
                                id: string;
                                name: string;
                                routineId: string;
                                description: string | null;
                                imageUrl: string | null;
                                checkedAt: Date | null;
                                checkedBy: string | null;
                            }[];
                            id: string;
                            name: string;
                            createdAt: Date;
                            groupId: string | null;
                            userId: string | null;
                            radius: number;
                            triggerHour: number | null;
                            triggerMinute: number | null;
                            freeSpace: number | null;
                            street: string | null;
                            streetNumber: string | null;
                            triggerOnExit: boolean;
                            activeDays: any;
                            timeframeEnd: string | null;
                            timeframeStart: string | null;
                            weeklyPlan: any;
                        }[];
                        createdByUserId: string | null;
                        inviteCode: string;
                        members: {
                            id: string;
                            groupId: string;
                            userId: string;
                            muted: boolean | null;
                            user: {
                                email: string;
                                id: string;
                                googleSub: string;
                                name: string | null;
                                avatarUrl: string | null;
                                onboarding: boolean;
                                createdAt: Date;
                                fcmToken: string | null;
                            };
                        }[];
                    };
                };
                401: string;
                422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                };
            };
        };
    };
} & {
    groups: {
        get: {
            body: unknown;
            params: {};
            query: unknown;
            headers: unknown;
            response: {
                200: {
                    groups: {
                        id: string;
                        name: string;
                        createdAt: Date;
                        routines: {
                            items: {
                                id: string;
                                name: string;
                                routineId: string;
                                description: string | null;
                                imageUrl: string | null;
                                checkedAt: Date | null;
                                checkedBy: string | null;
                            }[];
                            id: string;
                            name: string;
                            createdAt: Date;
                            groupId: string | null;
                            userId: string | null;
                            radius: number;
                            triggerHour: number | null;
                            triggerMinute: number | null;
                            freeSpace: number | null;
                            street: string | null;
                            streetNumber: string | null;
                            triggerOnExit: boolean;
                            activeDays: any;
                            timeframeEnd: string | null;
                            timeframeStart: string | null;
                            weeklyPlan: any;
                            locations: {
                                routineId: string;
                                latitude: number;
                                longitude: number;
                                locationId: string;
                            }[];
                        }[];
                        createdByUserId: string | null;
                        inviteCode: string;
                        members: {
                            id: string;
                            groupId: string;
                            userId: string;
                            muted: boolean | null;
                            user: {
                                email: string;
                                id: string;
                                googleSub: string;
                                name: string | null;
                                avatarUrl: string | null;
                                onboarding: boolean;
                                createdAt: Date;
                                fcmToken: string | null;
                            };
                        }[];
                    }[];
                };
                401: string;
                422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                };
            };
        };
    };
} & {
    groups: {
        join: {
            post: {
                body: {
                    inviteCode: string;
                };
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        group: any;
                    };
                    401: string;
                    400: string;
                    404: string;
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    groups: {
        leave: {
            delete: {
                body: {
                    groupId: string;
                };
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        message: string;
                    };
                    401: string;
                    404: string;
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    groups: {
        reminders: {
            post: {
                body: {
                    items?: {
                        description?: string | null | undefined;
                        imageUrl?: string | null | undefined;
                        name: string;
                    }[] | undefined;
                    radius?: number | undefined;
                    triggerHour?: number | null | undefined;
                    triggerMinute?: number | null | undefined;
                    freeSpace?: number | null | undefined;
                    street?: string | null | undefined;
                    streetNumber?: string | null | undefined;
                    triggerOnExit?: boolean | undefined;
                    name: string;
                    groupId: string;
                    locations: {
                        latitude: number;
                        longitude: number;
                    }[];
                };
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        reminder: {
                            items: {
                                id: string;
                                name: string;
                                routineId: string;
                                description: string | null;
                                imageUrl: string | null;
                                checkedAt: Date | null;
                                checkedBy: string | null;
                            }[];
                            id: string;
                            name: string;
                            createdAt: Date;
                            groupId: string | null;
                            userId: string | null;
                            radius: number;
                            triggerHour: number | null;
                            triggerMinute: number | null;
                            freeSpace: number | null;
                            street: string | null;
                            streetNumber: string | null;
                            triggerOnExit: boolean;
                            activeDays: any;
                            timeframeEnd: string | null;
                            timeframeStart: string | null;
                            weeklyPlan: any;
                            locations: {
                                routineId: string;
                                latitude: number;
                                longitude: number;
                                locationId: string;
                            }[];
                        };
                    };
                    401: string;
                    403: string;
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    groups: {
        reminders: {
            delete: {
                body: {
                    reminderId: string;
                };
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        message: string;
                    };
                    401: string;
                    403: string;
                    404: string;
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    groups: {
        ":id": {
            delete: {
                body: unknown;
                params: {
                    id: string;
                };
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        message: string;
                    };
                    401: string;
                    403: string;
                    404: string;
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    groups: {
        reminders: {
            ":reminderId": {
                items: {
                    ":itemId": {
                        patch: {
                            body: unknown;
                            params: {
                                itemId: string;
                                reminderId: string;
                            };
                            query: unknown;
                            headers: unknown;
                            response: {
                                200: {
                                    item: any;
                                };
                                401: "Unauthorized" | "Invalid token";
                                403: string;
                                404: string;
                                422: {
                                    type: "validation";
                                    on: string;
                                    summary?: string;
                                    message?: string;
                                    found?: unknown;
                                    property?: string;
                                    expected?: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
} & {
    groups: {
        reminders: {
            ":reminderId": {
                reset: {
                    delete: {
                        body: unknown;
                        params: {
                            reminderId: string;
                        };
                        query: unknown;
                        headers: unknown;
                        response: {
                            200: {
                                ok: boolean;
                            };
                            401: "Unauthorized" | "Invalid token";
                            403: string;
                            404: string;
                            422: {
                                type: "validation";
                                on: string;
                                summary?: string;
                                message?: string;
                                found?: unknown;
                                property?: string;
                                expected?: string;
                            };
                        };
                    };
                };
            };
        };
    };
} & {
    groups: {
        mute: {
            post: {
                body: {
                    groupId: string;
                };
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        ok: boolean;
                    };
                    401: "Unauthorized" | "Invalid token";
                    404: "Not a member of this group";
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    groups: {
        mute: {
            delete: {
                body: {
                    groupId: string;
                };
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        ok: boolean;
                    };
                    401: "Unauthorized" | "Invalid token";
                    404: "Not a member of this group";
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    groups: {
        add: {
            routine: {
                put: {
                    body: {
                        groupId: string;
                        routineId: string;
                    };
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            success: boolean;
                        };
                        401: "Unauthorized" | "Invalid token";
                        403: string;
                        404: string;
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    };
} & {
    groups: {
        remove: {
            routine: {
                put: {
                    body: {
                        groupId: string;
                        routineId: string;
                    };
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            success: boolean;
                        };
                        401: "Unauthorized" | "Invalid token";
                        403: string;
                        422: {
                            type: "validation";
                            on: string;
                            summary?: string;
                            message?: string;
                            found?: unknown;
                            property?: string;
                            expected?: string;
                        };
                    };
                };
            };
        };
    };
}, {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
    response: {};
}, {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
    response: {};
} & {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
    response: {};
} & {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
    response: {};
} & {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
    response: {};
} & {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
    response: {};
}>;
