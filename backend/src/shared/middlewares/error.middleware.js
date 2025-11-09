export const errorHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;

  return res
    .status(statusCode)
    .json({ success: false, message: error.message });
};
