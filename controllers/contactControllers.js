import wrapperAsync from "../decorators/controllerWrapper.js";
import Contact from "../models/contactsValidation.js";

const getAll = wrapperAsync(async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  const total = await Contact.countDocuments({ owner });
  res.json({ result, total });
});

const getById = wrapperAsync(async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: contactId, owner });
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(result);
});

const createContact = wrapperAsync(async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });

  res.status(201).json(result);
});

const deleteContact = wrapperAsync(async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndDelete({ _id: contactId, owner });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Contact deleted",
  });
});

const updateContact = wrapperAsync(async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body
  );
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }

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
