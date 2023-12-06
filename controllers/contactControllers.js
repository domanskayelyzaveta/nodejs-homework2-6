import wrapperAsync from "../decorators/controllerWrapper.js";
import Contact from "../models/contactsValidation.js";

const getAll = wrapperAsync(async (req, res) => {
  const result = await Contact.find();
  res.json(result);
});

const getById = wrapperAsync(async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(result);
});

const createContact = wrapperAsync(async (req, res) => {
  const { error } = create(req.body);
  if (error) {
    return res.status(400).json({
      message: `Missing required ${error.details[0].context.label} field`,
    });
  }
  const result = await Contact.addContact(req.body);
  res.json(result);
});

const deleteContact = wrapperAsync(async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (result) {
    res.status(200).json({ message: "Contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

const updateContact = wrapperAsync(async (req, res) => {
  const { error } = findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (error) {
    return res.status(400).json({
      message: `Missing ${error.details[0].context.label} fields`,
    });
  }
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  res.json(result);
});

const addToFavorites = wrapperAsync(async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;
  const result = await updateContact(contactId, body);
  if (!result) {
    return res.status(400).json({ message: "Missing field favorite" });
  }
  if (result) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json({ message: "Not found" });
  }
});

export default {
  getAll,
  getById,
  createContact,
  deleteContact,
  updateContact,
  addToFavorites,
};
