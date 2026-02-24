export const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body || {},
      params: req.params || {},
      query: req.query || {},
    });

    if (!result.success) {
      const errors = result.error.issues.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors,
      });
    }

    next();
  };
};