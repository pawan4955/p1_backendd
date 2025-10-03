class ApiResponse{
    constructor(statusCode,message="success"){
        this.statusCode=statusCode
        this.data=this
        this.message=message
        this.success=statusCode<400
    }
    
}