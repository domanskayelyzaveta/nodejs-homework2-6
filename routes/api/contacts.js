import express from "express";
import ctrl from "../../controllers/contactControllers.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import isValidID from "../../middlewares/isValidId.js";
import validateBody from "../../decorators/validateBody.js";
import authenticate from "../../middlewares/authenticate.js";
import upload from "../../middlewares/upload.js";
import {
  addSchema,
  updateFavoriteSchema,
  updateSchema,
} from "../../models/contactsValidation.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate); // коли всі маршрути приватні

contactsRouter.get("/", ctrl.getAll);

contactsRouter.get("/:contactId", isValidID, ctrl.getById);

contactsRouter.post(
  "/",
  // upload.fields([{name: "poster", maxCount: 1}]) якщо декілька файлів в полі,
  upload.single("avatar"),
  isEmptyBody,
  validateBody(addSchema),
  ctrl.createContact
);

contactsRouter.put(
  "/:contactId",
  isValidID,
  isEmptyBody,
  validateBody(updateSchema),
  ctrl.updateContact
);

contactsRouter.delete("/:contactId", isValidID, ctrl.deleteContact);

contactsRouter.patch(
  "/:contactId/favorites",
  isValidID,
  isEmptyBody,
  validateBody(updateFavoriteSchema),
  ctrl.addToFavorites
);

export default contactsRouter;
