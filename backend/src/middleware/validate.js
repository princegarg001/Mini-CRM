export const validate = (schema) => (req, res, next) => {
  try {
    if (schema.body) schema.body.validate(req.body, { abortEarly: false });
    if (schema.params) schema.params.validate(req.params, { abortEarly: false });
    if (schema.query) schema.query.validate(req.query, { abortEarly: false });
    next();
  } catch (err) {
    if (err && err.details) {
      const errors = err.details.map(d => d.message);
      return res.status(400).json({ errors });
    }
    next(err);
  }
};
