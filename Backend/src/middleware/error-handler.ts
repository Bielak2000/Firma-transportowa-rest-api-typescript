import {NextFunction, Request, Response} from 'express';
import {ValidationError} from "class-validator";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if(Array.isArray(err) && err[0] instanceof ValidationError)
    return handleValidationError(err, req, res, next);

  return res.status(err.status).json({errors: [err.message]});
};

const handleValidationError = (validationErrors: ValidationError[], req: Request, res: Response, next: NextFunction) => {
  const msg: string[] = [];
  for(const error of validationErrors){
    for (let constraint in error.constraints) {
      msg.push(error.constraints[constraint])
    }
  }

  return res.status(400).json({errors: msg});
}

export const routingNotFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({errors: ["routing not found"]});
};
