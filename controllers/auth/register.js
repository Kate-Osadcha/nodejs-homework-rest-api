const { User } = require("../../models");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { name, email, password, subscription } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(409)
      .json({ code: 409, status: "error", message: "Email in use" });
  }
  const avatarURL = gravatar.url(email);
  const newUser = new User({ name, email, avatarURL });
  newUser.setPassword(password);
  newUser.save();

  return res.status(201).json({
    code: 201,
    status: "success",
    data: {
      user: {
        name,
        email,
        subscription,
        avatarURL,
      },
    },
  });
};

module.exports = register;
