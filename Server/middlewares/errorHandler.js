module.exports = (error, req, res, next) => {
  //   console.log(error);
  if (
    error.name === "SequelizeUniqueConstraintError" ||
    error.name === "SequelizeValidationError"
  ) {
    return res.status(400).json({
      message: error.errors[0].message,
    });
  }

  if (error.name === "InvalidUser") {
    return res
      .status(401)
      .json({ message: "Invalid email/username or password" });
  }

  if (error.name === "notFound") {
    return res.status(404).json({
      message: "Error not found",
    });
  } else {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
