export const notFoundHandler = (req, res) => {
  return res.status(404).json({
    success: false,
    statusCode: 404,
    message: `Can't find ${req.originalUrl} on this server!`,
  });
};
