import { cardTemplate } from "./index.js";

export const deleteCard = (event) => {
  const cardItem = event.target.closest(".places__item");
  cardItem.remove();
};

export const createCard = (name, link, deleteCard) => {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector(".card__title").textContent = name;

  deleteButton.addEventListener("click", deleteCard);

  return cardElement;
};
