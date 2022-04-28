// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.verify || !user.comparePassword(password)) {
    return res.status(401).json({
      code: 401,
      status: "error",
      message: "Email is wrong or not verify, or password is wrong ",
    });
  }

  //   if (!user) {
  //     return res.status(401).json({
  //       code: 401,
  //       status: "error",
  //       message: `Email ${email} not found`,
  //     });
  //   }
  //   const passCompare = bcrypt.compareSync(password, user.password);
  //   if (!passCompare) {
  //     return res.status(401).json({
  //       code: 401,
  //       status: "error",
  //       message: "Password is wrong",
  //     });
  //   }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    code: 200,
    status: "success",
    data: {
      token,
    },
  });
};

module.exports = login;
