const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const { auth, validation } = require("../../middlewares/");

const {
  joiSchemaCreateContact,
  joiSchemaUpdateContact,
} = require("../../models/contact");

const router = express.Router();

router.get("/", auth, ctrl.getContacts);
router.get("/:contactId", ctrl.getContactsById);
router.post("/", auth, validation(joiSchemaCreateContact), ctrl.addContacts);
router.delete("/:contactId", ctrl.deleteContacts);
router.put(
  "/:contactId",
  validation(joiSchemaUpdateContact),
  ctrl.patchContact
);
router.patch("/:contactId/favorite", ctrl.patchFavorite);

module.exports = router;
