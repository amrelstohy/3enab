const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : 500;
  console.log(statusCode);
  if (process.env.NODE_ENV !== "production") {
    console.log(err.stack);
  }
  res.status(statusCode).json({
    status: "error",
    message:
      process.env.NODE_ENV !== "production"
        ? err.message
        : "something went wrong",
  });
};

module.exports = { errorHandler };
