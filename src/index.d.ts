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
        login: {
            post: {
                body: {
                    email: string;
                    password: string;
                };
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        jwt: string;
                        message: string;
                        status: boolean;
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
} & {
    auth: {
        "register-code": {
            post: {
                body: {
                    email: string;
                };
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        status: boolean;
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
} & {
    auth: {
        register: {
            post: {
                body: {
                    email: string;
                    password: string;
                    name: string;
                    code: string;
                };
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        user: {
                            email: string;
                            id: string;
                            password: string | null;
                            googleID: string | null;
                            name: string;
                            onboarding: boolean;
                            fcmToken: string | null;
                            twoFactorCode: string | null;
                            twoFactorExpiresAt: Date | null;
                            createdAt: Date;
                        };
                    };
                    404: {
                        message: string;
                        status: boolean;
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
                        userId: string;
                        onboarded: boolean;
                    };
                    params: {};
                    query: unknown;
                    headers: unknown;
                    response: {
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
        "send-code": {
            post: {
                body: {
                    email: string;
                };
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        sent: boolean;
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
} & {
    auth: {
        "verify-code": {
            post: {
                body: {
                    email: string;
                    code: string;
                };
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        jwt: string;
                    };
                    404: string;
                    400: string;
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
                            description: string | null;
                            imageUrl: string | null;
                            checkedBy: string | null;
                            checkedAt: Date | null;
                            routineId: string;
                        }[];
                        id: string;
                        name: string;
                        createdAt: Date;
                        radius: number;
                        triggerHour: number | null;
                        triggerMinute: number | null;
                        triggerOnExit: boolean;
                        latitude: number | null;
                        longitude: number | null;
                        street: string | null;
                        streetNumber: string | null;
                        freeSpace: number | null;
                        userId: string | null;
                        groupId: string | null;
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
                                description: string | null;
                                imageUrl: string | null;
                                checkedBy: string | null;
                                checkedAt: Date | null;
                                routineId: string;
                            }[];
                        } & {
                            id: string;
                            name: string;
                            createdAt: Date;
                            radius: number;
                            triggerHour: number | null;
                            triggerMinute: number | null;
                            triggerOnExit: boolean;
                            latitude: number | null;
                            longitude: number | null;
                            street: string | null;
                            streetNumber: string | null;
                            freeSpace: number | null;
                            userId: string | null;
                            groupId: string | null;
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
                triggerOnExit?: boolean | undefined;
                latitude?: number | null | undefined;
                longitude?: number | null | undefined;
                street?: string | null | undefined;
                streetNumber?: string | null | undefined;
                freeSpace?: number | undefined;
                name: string;
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
                            description: string | null;
                            imageUrl: string | null;
                            checkedBy: string | null;
                            checkedAt: Date | null;
                            routineId: string;
                        }[];
                        id: string;
                        name: string;
                        createdAt: Date;
                        radius: number;
                        triggerHour: number | null;
                        triggerMinute: number | null;
                        triggerOnExit: boolean;
                        latitude: number | null;
                        longitude: number | null;
                        street: string | null;
                        streetNumber: string | null;
                        freeSpace: number | null;
                        userId: string | null;
                        groupId: string | null;
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
                    latitude?: number | null | undefined;
                    longitude?: number | null | undefined;
                    street?: string | null | undefined;
                    streetNumber?: string | null | undefined;
                    freeSpace?: number | null | undefined;
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
                    404: string;
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
                    404: string;
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
                            404: string;
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
                            404: string;
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
                    404: string;
                    400: string;
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
    groups: {};
} & {
    groups: {
        post: {
            body: {
                emoji?: string | undefined;
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
                                description: string | null;
                                imageUrl: string | null;
                                checkedBy: string | null;
                                checkedAt: Date | null;
                                routineId: string;
                            }[];
                            id: string;
                            name: string;
                            createdAt: Date;
                            radius: number;
                            triggerHour: number | null;
                            triggerMinute: number | null;
                            triggerOnExit: boolean;
                            latitude: number | null;
                            longitude: number | null;
                            street: string | null;
                            streetNumber: string | null;
                            freeSpace: number | null;
                            userId: string | null;
                            groupId: string | null;
                        }[];
                        inviteCode: string;
                        members: {
                            id: string;
                            userId: string;
                            groupId: string;
                            muted: boolean | null;
                            user: {
                                email: string;
                                id: string;
                                password: string | null;
                                googleID: string | null;
                                name: string;
                                onboarding: boolean;
                                fcmToken: string | null;
                                twoFactorCode: string | null;
                                twoFactorExpiresAt: Date | null;
                                createdAt: Date;
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
                                description: string | null;
                                imageUrl: string | null;
                                checkedBy: string | null;
                                checkedAt: Date | null;
                                routineId: string;
                            }[];
                            id: string;
                            name: string;
                            createdAt: Date;
                            radius: number;
                            triggerHour: number | null;
                            triggerMinute: number | null;
                            triggerOnExit: boolean;
                            latitude: number | null;
                            longitude: number | null;
                            street: string | null;
                            streetNumber: string | null;
                            freeSpace: number | null;
                            userId: string | null;
                            groupId: string | null;
                        }[];
                        inviteCode: string;
                        members: {
                            id: string;
                            userId: string;
                            groupId: string;
                            muted: boolean | null;
                            user: {
                                email: string;
                                id: string;
                                password: string | null;
                                googleID: string | null;
                                name: string;
                                onboarding: boolean;
                                fcmToken: string | null;
                                twoFactorCode: string | null;
                                twoFactorExpiresAt: Date | null;
                                createdAt: Date;
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
                    404: string;
                    400: string;
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
                    404: string;
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
                    triggerOnExit?: boolean | undefined;
                    latitude?: number | null | undefined;
                    longitude?: number | null | undefined;
                    street?: string | null | undefined;
                    streetNumber?: string | null | undefined;
                    freeSpace?: number | null | undefined;
                    name: string;
                    groupId: string;
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
                                description: string | null;
                                imageUrl: string | null;
                                checkedBy: string | null;
                                checkedAt: Date | null;
                                routineId: string;
                            }[];
                            id: string;
                            name: string;
                            createdAt: Date;
                            radius: number;
                            triggerHour: number | null;
                            triggerMinute: number | null;
                            triggerOnExit: boolean;
                            latitude: number | null;
                            longitude: number | null;
                            street: string | null;
                            streetNumber: string | null;
                            freeSpace: number | null;
                            userId: string | null;
                            groupId: string | null;
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
                    404: string;
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
                                404: string;
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
                        } & {};
                        query: unknown;
                        headers: unknown;
                        response: {
                            200: {
                                ok: boolean;
                            };
                            401: "Unauthorized" | "Invalid token";
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
                    404: "Not a member of this group";
                    401: "Unauthorized" | "Invalid token";
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
                    404: "Not a member of this group";
                    401: "Unauthorized" | "Invalid token";
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
