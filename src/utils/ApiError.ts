class ApiError extends Error {
    success: boolean;
    message: string;
    data: any;
    constructor(success: boolean, message: string, data: any) {
        super(message);
        this.success = success;
        this.message = message;
        this.data = data;
    }
}

export default ApiError;