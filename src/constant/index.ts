const CONFIG = {
  JWT_SECRET: "csk12chpn3ban2yrscmebckaftr2yrswn3ipl",
  SALT_ROUND: 10,
  JWT_EXPIRE: "365",
  ONE_HOUR: 1 * 60 * 60 * 1000, // 1 hour in ms
  RESEND_WAITING_TIME: 15 * 1000,
  PROFILE_FOLDER: "profile",
  RESET_PASSWORD_EXPIRE_LINK: "2",
  DISTANCE_RADIUS: 200,
  DEFAULT_PROFILE: "nis/profile/1717092575931.png",
  RESEND_INTERVAL_SECONDS: 45,
  PORT: 3000,
} as const;

export default CONFIG;