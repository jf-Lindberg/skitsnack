export class ResponseError extends Error {
    public status?: number;

    constructor(message: string, status?: number) {
        super(message);
        this.status = status;
        this.name = 'MyResponseError';
        Object.setPrototypeOf(this, ResponseError.prototype);
    }
}
