const express = require("express");
const router = express.Router();

const validate = require("../../middlewares/validateBody");
const validateStatus = require("../../middlewares/validateStatus");
const id = require("../../middlewares/validateid");
const contacts = require("../../controlers/functionsforworkingwithсontacts");
const authenticate = require("../../middlewares/authenticate");

router.use(authenticate);

router.get("/", contacts.getAllcontacts);

router.get("/:id", id.validId, contacts.getContactById);

router.post("/", validate.validateBody, contacts.createContact);

router.delete("/:id", id.validId, contacts.deleteContact);

router.put("/:id", id.validId, validate.validateBody, contacts.updateContact);

router.patch(
  "/:id/favorite",
  id.validId,
  validateStatus.validatStatus,
  contacts.updateStatusContact
);

module.exports = router;
