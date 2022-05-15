exports.errorHandler = (err, _, res) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    res.status(404).send({ msg: "Data not available" });
  }
};
