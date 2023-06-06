const Contact = require("../shema/contacts");
const { httpError } = require("../helpers/httpsError");

const getAllcontacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.find({ owner });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Contact.findById(id);

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
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
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

    const result = await Contact.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

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
    const result = await Contact.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
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
