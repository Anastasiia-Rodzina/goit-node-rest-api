import HttpError from "../helpers/HttpError.js";
import Contact from "../models/contact.js";

export const getAllContacts = async (req, res) => {
  const { _id: owner } = req.body;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const favoriteFilter = favorite
    ? { $and: [{ owner }, { favorite }] }
    : { owner };
  const result = await Contact.find(favoriteFilter).skip(skip).limit(limit);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.body;
  const result = await Contact.findById(id, owner);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.body;
  const result = await Contact.findByIdAndDelete(id, owner);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

export const createContact = async (req, res) => {
  const { _id: owner } = req.body;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.body;
  const result = await Contact.findByIdAndUpdate(id, owner, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

export const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.body;
  const result = await Contact.findByIdAndUpdate(id, owner, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};
