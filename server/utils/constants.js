const USER_ROLE_CONSTANTS = {
  ADMIN: "ADMIN",
  USER: "USER",
  GUEST: "GUEST",
};

const MODEL_CONSTANTS = {
  USER: {
    MODEL: "UserModel",
    TABLE: "users",
  },
  FILE: {
    MODEL: "FileModel",
    TABLE: "files",
  },
};

const MESSAGE_CONSTANTS = {
  SUCCESSFULLY_REGISTERED: "User registed, sent an email verification",
  EMAIL_ALREADY_EXISTS: "Email already exists",
  BCRYPT_INVALID_SALT_ROUNDS: "Invalid bcrypt salt rounds",
  EMAIL_VERIFICATION_SUBJECT: "Verify your email",
  EMAIL_VERIFICATION_TEXT: "Your OTP - ",
  EMAIL_VERIFIED_SUCCESSFULLY_LOGIN: "Email verified, redirecting to dashboard",
  INVALID_EMAIL: "Invalid email",
  USER_IS_NOT_REGISTERED: "Email is not registered, please register",
  INVALID_OTP: "Invalid Otp",
  SUCCESSFULLY_LOGIN: "Successfully login",
  OTP_IS_NOT_VERIFIED: "Otp is not verified, please verify",
  INVALID_EMAIL_AND_PASSWORD: "Invalid email/password",
  SUCCESSFULLY_LOGOUT: "Successfully logout",
  TOKEN_IS_REQUIRED: "Token is required",
  INVALID_USER_TOKEN_LOGIN_AGAIN: "Invalid user token, please login again",
  SUCCESSFULLY_GET_USER_INFO: "Successfully get user info",
  ACCESS_ID_IS_REQUIRED: "Access Id is required",
  YOU_DONT_HAVE_ACCESS_TO_THIS_REQUEST: "You dont have access to this request",
  SUCCESSFULLY_GET_FILES: "Successfully get files",
  SUCCESSFULLY_UPLOADED_FILE: "File will be uploaded soon",
  UPLOAD_FILE_IN_FORMDATA: "Please upload file in the formdata",
  ERROR_WHILE_UPLOADING_FILE: "Error occured while uploading file",
  FILE_NOT_FOUND: "File not found",
  YOU_CAN_ONLY_ACCESS_YOUR_FILE: "You can only access your file",
  SUCCESSFULLY_SHARED_FILE: "File shared successfully",
  SUCCESSFULLY_GET_SHARED_FILES: "Successfully get shared files",
  SUCCESSFULLY_GET_USERS: "Successfully get users",
  SUCCESSFULLY_GET_SHARED_FILE: "Successfully get shared file",
  FILE_NOT_SHARED_WITH_YOU: "File is not shared with you",
  SUCCESSFULLY_GET_STATS: "Successfully get stats",
};

const ACCESS_CONTROL_PERMISSIONS = {
  ADMIN: {
    modules: [
      {
        label: "Home",
        value: "home",
        link: "/",
        accessible: true,
      },
      {
        label: "Users",
        value: "users",
        link: "/users",
        accessible: true,
      },
    ],
    permissions: {
      USERS_GET_USERS: true,
      AUTH_LOGOUT_USER: true,
      AUTH_GET_ME: true,
      USERS_GET_STATS: true,
    },
  },
  USER: {
    modules: [
      {
        label: "Home",
        value: "home",
        link: "/",
        accessible: true,
      },
      {
        label: "My Drive",
        value: "my_drive",
        link: "/my-drive",
        accessible: true,
      },
      {
        label: "Shared with me",
        value: "shared_with_me",
        link: "/shared-with-me",
        accessible: true,
      },
    ],
    permissions: {
      AUTH_GET_ME: true,
      AUTH_LOGOUT_USER: true,
      FILES_GET_FILES: true,
      FILES_ADD_FILE: true,
      FILES_GET_FILE: true,
      FILES_SHARE_FILE: true,
      FILES_GET_SHARED_FILES: true,
      USERS_GET_USER_TYPE_USERS: true,
      FILES_GET_SHARED_FILE: true,
      USERS_GET_STATS: true,
    },
  },
  GUEST: {
    modules: [],
    permissions: {},
  },
};

const PERMISSIONS_CONSTANTS = {
  AUTH_GET_ME: "AUTH_GET_ME",
  AUTH_LOGOUT_USER: "AUTH_LOGOUT_USER",
  FILES_GET_FILES: "FILES_GET_FILES",
  FILES_ADD_FILE: "FILES_ADD_FILE",
  FILES_GET_FILE: "FILES_GET_FILE",
  FILES_SHARE_FILE: "FILES_SHARE_FILE",
  FILES_GET_SHARED_FILES: "FILES_GET_SHARED_FILES",
  USERS_GET_USER_TYPE_USERS: "USERS_GET_USER_TYPE_USERS",
  FILES_GET_SHARED_FILE: "FILES_GET_SHARED_FILE",
  USERS_GET_USERS: "USERS_GET_USERS",
  USERS_GET_STATS: "USERS_GET_STATS",
};

const FILE_SHARED_WITH_ACCESS = {
  VIEW: {
    label: "View",
    value: "VIEW",
  },
  DOWNLOAD: {
    label: "Download",
    value: "DOWNLOAD",
  },
};

const FILE_SHARED_STATUS = {
  RESTRICTED: {
    label: "Restricted",
    value: "RESTRICTED",
  },
  OPEN: {
    label: "Anyone with the link",
    value: "OPEN",
  },
};

module.exports = {
  USER_ROLE_CONSTANTS,
  MODEL_CONSTANTS,
  MESSAGE_CONSTANTS,
  ACCESS_CONTROL_PERMISSIONS,
  PERMISSIONS_CONSTANTS,
  FILE_SHARED_WITH_ACCESS,
  FILE_SHARED_STATUS,
};
