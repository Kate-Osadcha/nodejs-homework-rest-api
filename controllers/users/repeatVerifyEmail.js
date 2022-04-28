const { User } = require("../../models");

const repeatVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email, verify: false });

  if (!email) {
    return res.status(400).json({
      code: 400,
      status: "error",
      message: "Missing required field email",
    });
  }

  if (user) {
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Verification email sent",
    });
  }

  if (!user) {
    return res.status(400).json({
      code: 400,
      status: "error",
      message: "Verification has already been passed",
    });
  }
};

module.exports = repeatVerifyEmail;
