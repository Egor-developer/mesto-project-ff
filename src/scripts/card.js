import { cardTemplate } from "./index";

export const deleteCard = (event) => {
  const cardItem = event.target.closest(".places__item");
  cardItem.remove();
};

export const createCard = (
  name,
  link,
  deleteCard,
  likeButtonFunction,
  openModalImage
) => {
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
  event.target.classList.toggle("card__like-button_is-active");
};
