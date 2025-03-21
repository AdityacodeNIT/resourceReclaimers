const asyncHandler = (fn) => async (req, res, next) => {
    try {
            await fn(req, res, next);
    } catch (error) {
            let statusCode = 500; // Default to internal server error

            if (error.code === 11000) {
                    statusCode = 409; // Conflict
            } else if (error.statusCode) {
                    // Use error.statusCode if it's already a valid HTTP status code
                    statusCode = error.statusCode;
            }

            res.status(statusCode).json({
                    success: false,
                    message: error.message || "Internal Server Error",
            });
    }
};

export { asyncHandler };
