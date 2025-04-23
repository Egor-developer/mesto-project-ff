import "../pages/index.css";

import { createCard, deleteCard, likeButtonFunction } from "./card";
import { createEventListener, openModal, closeModal } from "./modal";
import { enableValidation, clearValidation } from "./validation";
import {
  getUserInfo,
  getCards,
  patchUserInfo,
  postCard,
  editAvatar,
} from "./api";

export const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const profileAvatar = document.querySelector(".profile__image");
const config = {
  formSelector: ".popup__form",
  formInput: ".popup__input",
  formButton: ".popup__button",
  buttonInactive: "popup__button_inactive",
  inputError: "popup__input-error",
};

profileEditButton.addEventListener("click", () => {
  const formEditProfile = document.querySelector(".edit-profile");
  clearValidation(formEditProfile, config);
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;

  return openModal(modalEditingProfile);
});
cardAddButton.addEventListener("click", () => openModal(modalAddCard));
profileAvatar.addEventListener("click", () => openModal(modalAvatar));

const modalEditingProfile = document.querySelector(".popup_type_edit");
const modalAddCard = document.querySelector(".popup_type_new-card");
const modalImage = document.querySelector(".popup_type_image");
const modalAvatar = document.querySelector(".popup_type_avatar");

createEventListener(modalEditingProfile);
createEventListener(modalAddCard);
createEventListener(modalImage);
createEventListener(modalAvatar);

const formEditProfile = document.querySelector(".edit-profile");
const nameInput = formEditProfile.querySelector("#popup__input_type_name");
const aboutInput = formEditProfile.querySelector(
  "#popup__input_type_description"
);

const profileName = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__description");

const renderLoading = (isLoading, elem) => {
  const buttonElement = elem.querySelector(".button");

  buttonElement.textContent = isLoading ? "Сохранить..." : "Сохранить";
};

const handleFormEditingProfileSubmit = (evt) => {
  evt.preventDefault();

  renderLoading(true, evt.target);

  patchUserInfo(nameInput.value, aboutInput.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileAbout.textContent = res.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt.target);
    });

  closeModal(modalEditingProfile);
};

formEditProfile.addEventListener("submit", handleFormEditingProfileSubmit);

enableValidation(config);

const formAddCard = document.querySelector(".new-place");
const cardNameInput = formAddCard.querySelector("#popup__input_type_card-name");
const cardLinkInput = formAddCard.querySelector("#popup__input_type_url");

const handleFormAddCardSubmit = (evt) => {
  evt.preventDefault();

  renderLoading(true, evt.target);

  postCard(cardNameInput.value, cardLinkInput.value)
    .then((res) => {
      placesList.prepend(
        createCard(res, deleteCard, likeButtonFunction, openModalImage)
      );
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt.target);
    });

  cardNameInput.value = "";
  cardLinkInput.value = "";

  clearValidation(formAddCard, config);
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

const formAvatar = document.querySelector(".edit-avatar");
const avatarLinkInput = formAvatar.querySelector("#popup__input_type_url");

const handleFormAvatarSubmit = (evt) => {
  evt.preventDefault();

  renderLoading(true, evt.target);

  editAvatar(avatarLinkInput.value)
    .then((res) => {
      profileAvatar.style = `background-image: url(${res.avatar})`;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt.target);
    });

  clearValidation(formAvatar, config);
  console.log(formAvatar, config);
  closeModal(modalAvatar);
};

formAvatar.addEventListener("submit", handleFormAvatarSubmit);

export let userId = null;

getUserInfo()
  .then((res) => {
    profileAvatar.style = `background-image: url(${res.avatar})`;
    profileName.textContent = res.name;
    profileAbout.textContent = res.about;
    userId = res._id;
  })
  .catch((err) => {
    console.log(err);
  });

getCards()
  .then((res) => {
    res.forEach((elem) => {
      placesList.append(
        createCard(elem, deleteCard, likeButtonFunction, openModalImage)
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

console.log("Egor Coding Add for me in trening!!!");
