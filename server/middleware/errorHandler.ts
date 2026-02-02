import { Request, Response, NextFunction } from 'express'

exports.notFound = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ success: false, message: 'Not Found' });
};

exports.errorHandler = (err: any, req: Request, res: Response, next: NextFunction) =>{
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Server Error',
    stack: err.stack
  });
};
