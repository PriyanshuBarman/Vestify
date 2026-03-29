export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params,
  });

  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.issues.map((err) => ({
        field: err.path[1],
        message: err.message,
        code: err.code,
      })),
    });
  }

  req.body = result.data.body;
  req.query = result.data.query;
  req.params = result.data.params;

  next();
};
