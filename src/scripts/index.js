import "../pages/index.css";

import { initialCards } from "./cards";
import { createCard } from "./card";
import { deleteCard } from "./card";
import { likeButtonFunction } from "./card";
import { createEventListener } from "./modal";
import { openModal } from "./modal";
import { closeModal } from "./modal";
import { enableValidation } from "./validation";
import { clearValidation } from "./validation";

export const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");

profileEditButton.addEventListener("click", () => {
  const formEditProfile = document.querySelector(".edit-profile");
  clearValidation(formEditProfile);
  updateDataEditingProfile();

  return openModal(modalEditingProfile);
});
cardAddButton.addEventListener("click", () => openModal(modalAddCard));

const modalEditingProfile = document.querySelector(".popup_type_edit");
const modalAddCard = document.querySelector(".popup_type_new-card");
const modalImage = document.querySelector(".popup_type_image");

createEventListener(modalEditingProfile);
createEventListener(modalAddCard);
createEventListener(modalImage);

const formEditProfile = document.querySelector(".edit-profile");
const nameInput = formEditProfile.querySelector("#popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  "#popup__input_type_description"
);

enableValidation(formEditProfile);

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const updateDataEditingProfile = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

const handleFormEditingProfileSubmit = (evt) => {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileName.textContent = name;
  profileJob.textContent = job;

  closeModal(modalEditingProfile);
};

formEditProfile.addEventListener("submit", handleFormEditingProfileSubmit);

const formAddCard = document.querySelector(".new-place");
const cardNameInput = formAddCard.querySelector("#popup__input_type_card-name");
const linkInput = formAddCard.querySelector("#popup__input_type_url");

const handleFormAddCardSubmit = (evt) => {
  evt.preventDefault();

  placesList.prepend(
    createCard(
      cardNameInput.value,
      linkInput.value,
      deleteCard,
      likeButtonFunction,
      openModalImage
    )
  );

  cardNameInput.value = "";
  linkInput.value = "";
  clearValidation(formAddCard);

  closeModal(modalAddCard);
};

formAddCard.addEventListener("submit", handleFormAddCardSubmit);

const titleModalImage = document.querySelector(".popup__caption");
const imageModalImage = document.querySelector(".popup__image");

const openModalImage = (name, link) => {
  titleModalImage.textContent = name;
  imageModalImage.src = link;
  imageModalImage.alt = name;

  openModal(modalImage);
};

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
