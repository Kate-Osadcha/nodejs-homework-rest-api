const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const { sendEmail } = require("../../helpers");
const { User } = require("../../models");

const register = async (req, res) => {
  const { name, email, password, subscription } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(409)
      .json({ code: 409, status: "error", message: "Email in use" });
  }

  const verificationToken = uuidv4();
  const avatarURL = gravatar.url(email);
  const newUser = new User({ name, email, avatarURL, verificationToken });

  newUser.setPassword(password);

  await newUser.save();
  const msg = {
    to: email,
    subject: "Подтверждение email",
    html: ` <a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Потвердить email</a>`,
  };

  await sendEmail(msg);

  return res.status(201).json({
    code: 201,
    status: "success",
    data: {
      user: {
        name,
        email,
        subscription,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = register;
