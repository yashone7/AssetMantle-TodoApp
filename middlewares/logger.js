/** @type {import("express").RequestHandler} */
export function logger(req, res, next) {
  console.log(res.statusCode);
  next();
}
