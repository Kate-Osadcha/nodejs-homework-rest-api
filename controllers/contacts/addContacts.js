const { Contact } = require("../../models");

const addContacts = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const contact = await Contact.create({ ...req.body, owner: _id });
    res
      .status(201)
      .json({ code: 201, status: "success", payload: { contact } });
  } catch (error) {
    next(error);
  }
};

module.exports = addContacts;
