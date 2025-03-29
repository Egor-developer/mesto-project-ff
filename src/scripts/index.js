import "../pages/index.css";

import { initialCards } from "./cards";
import { createCard } from "./card";
import { deleteCard } from "./card";
import { openModal } from "./modal";
import { modalEditingProfile } from "./modal";
import { modalAdditionsCards } from "./modal";
import { modalImage } from "./modal";

export const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");

profileEditButton.addEventListener("click", () =>
  openModal(modalEditingProfile)
);
cardAddButton.addEventListener("click", () => openModal(modalAdditionsCards));
// imageButton.addEventListener("click", () => openModal(modalImage));

initialCards.forEach((elem) => {
  placesList.append(createCard(elem.name, elem.link, deleteCard));
});
