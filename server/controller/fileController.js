const { MESSAGE_CONSTANTS } = require("../utils/constants");
const Output = require("../utils/output");
const fileService = require("../service/fileService");

const getFiles = async (req, res) => {
  try {
    const data = await fileService.getFiles({ user: req.user._id.toString() });

    return Output.success(res, MESSAGE_CONSTANTS.SUCCESSFULLY_GET_FILES, data);
  } catch (error) {
    return Output.error(res, error);
  }
};

const addFile = async (req, res) => {
  try {
    // if file is not sent in the req.file
    if (!req.file) throw MESSAGE_CONSTANTS.UPLOAD_FILE_IN_FORMDATA;

    const { _id } = req.user;
    const data = await fileService.addFile({
      ...req.file,
      userId: _id.toString(),
    });

    return Output.success(
      res,
      MESSAGE_CONSTANTS.SUCCESSFULLY_UPLOADED_FILE,
      data
    );
  } catch (error) {
    return Output.error(res, error);
  }
};

const getFile = async (req, res) => {
  try {
    const { _id } = req.user;
    const { fileId } = req.params;
    console.log(5);
    const data = await fileService.getFile({ userId: _id.toString(), fileId });

    return Output.success(res, MESSAGE_CONSTANTS.SUCCESSFULLY_GET_FILES, data);
  } catch (error) {
    return Output.error(res, error);
  }
};

const shareFile = async (req, res) => {
  try {
    const data = await fileService.shareFile({
      userId: req.user._id.toString(),
      fileId: req.params.fileId,
      ...req.body,
    });

    return Output.success(
      res,
      MESSAGE_CONSTANTS.SUCCESSFULLY_SHARED_FILE,
      data
    );
  } catch (error) {
    return Output.error(res, error);
  }
};

const getSharedFiles = async (req, res) => {
  try {
    const data = await fileService.getSharedFiles({
      userId: req.user._id.toString(),
    });

    return Output.success(
      res,
      MESSAGE_CONSTANTS.SUCCESSFULLY_GET_SHARED_FILES,
      data
    );
  } catch (error) {
    return Output.error(res, error);
  }
};

const getSharedFile = async (req, res) => {
  try {
    const { _id } = req.user;
    const { fileId } = req.params;

    const data = await fileService.getSharedFile({
      userId: _id.toString(),
      fileId,
    });

    return Output.success(
      res,
      MESSAGE_CONSTANTS.SUCCESSFULLY_GET_SHARED_FILE,
      data
    );
  } catch (error) {
    return Output.error(res, error);
  }
};

module.exports = {
  getFiles,
  addFile,
  getFile,
  shareFile,
  getSharedFiles,
  getSharedFile,
};
