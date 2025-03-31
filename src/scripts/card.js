import { cardTemplate } from "./index";
import { openModalImage } from "./modal.js";

export const deleteCard = (event) => {
  const cardItem = event.target.closest(".places__item");
  cardItem.remove();
};

export const createCard = (name, link, deleteCard, likeButtonFunction) => {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector(".card__title").textContent = name;

  deleteButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", likeButtonFunction);
  cardImage.addEventListener("click", () => openModalImage(name, link));

  return cardElement;
};

export const likeButtonFunction = (event) => {
  if (event.target.classList.contains("card__like-button_is-active")) {
    event.target.classList.remove("card__like-button_is-active");
  } else {
    event.target.classList.add("card__like-button_is-active");
  }
};
