const contacts = require("../service/index");
const { httpError } = require("../helpers/httpsError");

const getAllcontacts = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await contacts.getContactById(id);

    if (!result) {
      throw httpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw httpError(404, "Not found");
    }
    res.json({ massage: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await contacts.updateContact(id, req.body);

    if (!result) {
      throw httpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bodyLength = Boolean(Object.keys(req.body).length);
    if (!bodyLength) {
      throw httpError(400, "missing field favorite");
    }
    const result = await contacts.updateFavorite(id, req.body);
    if (!result) {
      throw httpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllcontacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
