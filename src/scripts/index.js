import "../pages/index.css";

import { initialCards } from "./cards";
import { createCard } from "./card";
import { deleteCard } from "./card";
import { likeButtonFunction } from "./card";
import { openModalImage } from "./modal";
import { openModal } from "./modal";
import { modalEditingProfile } from "./modal";
import { modalAddCard } from "./modal";

export const cardTemplate = document.querySelector("#card-template").content;
export const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");

profileEditButton.addEventListener("click", () =>
  openModal(modalEditingProfile)
);
cardAddButton.addEventListener("click", () => openModal(modalAddCard));

initialCards.forEach((elem) => {
  placesList.append(
    createCard(
      elem.name,
      elem.link,
      deleteCard,
      likeButtonFunction,
      openModalImage
    )
  );
});
