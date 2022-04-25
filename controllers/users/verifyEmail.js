const { User } = require("../../models");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    return res
      .status(404)
      .json({ code: 404, status: "error", message: "User not found" });
  }
  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });
  return res
    .status(200)
    .json({ code: 200, status: "success", message: "Verification successful" });
};

module.exports = verifyEmail;
