export type AppResponse<T= void> = {
    success: true;
    data: T;
} | {
    success: false;
    reason: string;
    error?: unknown;
};