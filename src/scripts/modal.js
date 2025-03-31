import { createCard } from "./card";
import { deleteCard } from "./card";
import { likeButtonFunction } from "./card";
import { placesList } from "./index";

const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
};

export const openModal = (modal) => {
  modal.classList.add("popup_is-opened");
  addEventListener("keydown", handleEscKeyUp);
};

const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  removeEventListener("keydown", handleEscKeyUp);
};

const createEventListener = (modalElement) => {
  const сross = modalElement.querySelector(".popup__close");

  сross.addEventListener("click", () => {
    closeModalEditingProfile();
    closeModal(modalElement);
  });

  modalElement.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup")) {
      closeModal(modalElement);
    }
  });
};

export const modalEditingProfile = document.querySelector(".popup_type_edit");
export const modalAddCard = document.querySelector(".popup_type_new-card");
export const modalImage = document.querySelector(".popup_type_image");

createEventListener(modalEditingProfile);
createEventListener(modalAddCard);
createEventListener(modalImage);

const formEditProfile = document.querySelector(".edit-profile");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

const closeModalEditingProfile = () => {
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
const cardNameInput = formAddCard.querySelector(".popup__input_type_card-name");
const linkInput = formAddCard.querySelector(".popup__input_type_url");

export const handleFormAddCardSubmit = (evt) => {
  evt.preventDefault();

  placesList.prepend(
    createCard(
      cardNameInput.value,
      linkInput.value,
      deleteCard,
      likeButtonFunction
    )
  );

  cardNameInput.value = "";
  linkInput.value = "";

  closeModal(modalAddCard);
};

formAddCard.addEventListener("submit", handleFormAddCardSubmit);

export const openModalImage = (name, link) => {
  const title = document.querySelector(".popup__caption");
  const image = document.querySelector(".popup__image");

  title.textContent = name;
  image.src = link;

  openModal(modalImage);
};
