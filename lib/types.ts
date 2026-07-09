export type AppResponse<T> = {
    success: true,
    data: T,
} | {
    success: false,
    error: string
};