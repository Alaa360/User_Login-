const Joi = require("joi");

const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(20).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(20).required(),
});

const signUpvalidation = (req, res, next) => {
  const { error } = signUpSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 400, error.details));
  next();
};

const loginvalidation = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 400, error.details));
  next();
};


module.exports = {signUpSchema,loginSchema,signUpvalidation,loginvalidation}