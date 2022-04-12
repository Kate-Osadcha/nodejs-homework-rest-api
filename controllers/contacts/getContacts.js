const { Contact } = require("../../models");

const getContacts = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const contacts = await Contact.find({ owner: _id }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id name email");
    res
      .status(200)
      .json({ code: 200, status: "success", payload: { contacts } });
  } catch (error) {
    next(error);
  }
};

module.exports = getContacts;
