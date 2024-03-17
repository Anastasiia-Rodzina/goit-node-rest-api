import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import isValidId from "../helpers/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrlWrapper(getAllContacts));

contactsRouter.get("/:id", isValidId, ctrlWrapper(getOneContact));

contactsRouter.delete("/:id", isValidId, ctrlWrapper(deleteContact));

contactsRouter.post("/", ctrlWrapper(createContact));

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContact)
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrlWrapper(updateStatusContact)
);

export default contactsRouter;
