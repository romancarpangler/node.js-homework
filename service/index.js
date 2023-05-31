const Contact = require("./shema/contacts");

const listContacts = async () => {
  const response = await Contact.find();
  return response;
};

const getContactById = async (id) => {
  const response = await Contact.findById(id);
  return response;
};

const removeContact = async (id) => {
  const response = await Contact.findByIdAndRemove(id);
  return response;
};

const addContact = async (body) => {
  const response = await Contact.create(body);
  return response;
};

const updateContact = async (id, data) => {
  const response = await Contact.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });
  return response;
};

const updateFavorite = async (id, data) => {
  const response = await Contact.findByIdAndUpdate({ _id: id }, data, {
    new: true,
  });
  return response;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite,
};
