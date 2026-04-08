import { User } from "src/models";

// admin.messages.ts
export const MESSAGE = {
  INTERNAL_SERVER_ERROR: "Something went wrong, please try again.",
  INVALID_TOKEN: "Token missing or invalid format.",
  SESSION_EXPIRED: "Session Expired",

  ADMIN_LOGIN_SUCCESS: "Admin logged in successfully.",
  ADMIN_REGISTER_SUCCESS: "Admin registered successfully.",
  EMAIL_EXIST: "Email already exists.",
  EMAIL_NOT_REGISTERED: "Email not registered.",
  INVALID_PASSWORD: "Invalid password.",
  INACTIVE_ACCOUNT: "Account is inactive.",
  NO_ACCOUNT_EXISTS: "No account exists with this email.",
  OTP_SENT: "OTP sent successfully.",
  OTP_VERIFIED: "OTP verified successfully.",
  INVALID_MOBILE_OTP: "Invalid OTP.",
  INVALID_OTP: "Invalid OTP.",
  PASSWORD_MISMATCH: "New password and confirm password do not match.",
  PASSWORD_UPDATE_SUCCESS: "Password updated successfully.",
  USER_NOT_FOUND: "User not found.",
  USER_LIST: "User list retrieved successfully.",


  //==================================banner =================

  ADD_BANNER_SUCCESS: "Banner added successfully.",
  UPDATE_BANNER_SUCCESS: "Banner updated successfully.",
  DELETE_BANNER_SUCCESS: "Banner deleted successfully.",
  BANNER_NOT_FOUND: "Banner not found.",

  //==================================interest =================

  ADD_INTEREST_SUCCESS: "Interest added successfully.",
  UPDATE_INTEREST_SUCCESS: "Interest updated successfully.",
  DELETE_INTEREST_SUCCESS: "Interest deleted successfully.",
  INTEREST_NOT_FOUND: "Interest not found.",

 //=====================ORDER===============================
 ORDER_PLACED: "Order placed successfully.",
 ORDER_NOT_FOUND: "Order not found.",
 ORDER_LIST: "Order list retrieved successfully.",
 ORDER_STATUS_UPDATED: "Order status updated successfully.",

//=====================USER===============================

USER_LIST_FETCHED: "User list retrieved successfully.",
USER_STATUS_UPDATED: "User status updated successfully.",
USER_BLOCKED: "User account has been blocked.",
USER_UNBLOCKED: "User account has been unblocked.",
USER_DELETED: "User account has been deleted.",
};