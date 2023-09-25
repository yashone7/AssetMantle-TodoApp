export function errorHandler(err, req, res, next) {
  // here i am logging the error but in real world situation you will use logging service
  console.log(err);
  res.status(500).json({ message: "something went wrong", err });
  next();
}
