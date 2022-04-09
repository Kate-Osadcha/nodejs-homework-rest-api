// const { User } = require("../../models");

const getCurrent = async (req, res) => {
  const { name, email } = req.user;
  res.json({
    code: 200,
    status: "success",
    data: {
      user: {
        name,
        email,
      },
    },
  });
};

module.exports = getCurrent;
