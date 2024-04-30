export const errorMan = {

    INCORRECT_DATA: { code: 400, message: "Incorrect data provided." },
    UNAUTHORIZED: { code: 401, message: "Unauthorized access." },
    FORBIDDEN: { code: 403, message: "Access forbidden." },
    NOT_FOUND: { code: 404, message: "Resource not found." },
    DUPLICATED_KEY: { code: 409, message: "Duplicate key found." },
    UNPROCESSABLE_ENTITY: { code: 422, message: "Unprocessable entity." },


    UNEXPECTED_ERROR: { code: 500, message: "Unexpected error occurred." },
    INTERNAL_SERVER_ERROR: { code: 500, message: "Internal server error." },


    OK: { code: 200, message: "Success." },
    CREATED: { code: 201, message: "Resource created successfully." },
    ACCEPTED: { code: 202, message: "Request accepted for processing." },
};