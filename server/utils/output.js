const express = require("express");

const success = async (res, message, data) => {
  res.status(200).json({
    status: 200,
    message,
    data: { response: data },
  });
};

const error = async (res, error) => {
  res.status(400).json({
    status: 400,
    error,
  });
};
module.exports = {
  success,
  error,
};
