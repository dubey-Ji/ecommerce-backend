class ApiResponse {
    success: boolean;
    message: string;
    data: any;
    constructor(success: boolean, message: string, data: any) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}

export default ApiResponse;