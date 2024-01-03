export const sendToken = (res, user, message, statusCode = 200) => {
  try {
    const token = user.getJWTToken();
    console.log("\n" + token);
    const options = {
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
    };

    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      message,
      user,
    });
  } catch (error) {
    console.error("Error setting cookie:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
