import { cardTemplate } from "./index";
import { userId } from "./index";
import { deleteCardFromServer } from "./api";
import { putLike } from "./api";
import { deleteLike } from "./api";

export const createCard = (
  name,
  link,
  id,
  userCardId,
  deleteCard,
  likeButtonFunction,
  deletelikeButtonFunction,
  likeCount,
  isLike,
  openModalImage
) => {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCountElement = cardElement.querySelector(".card__like-count");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector(".card__title").textContent = name;
  likeCountElement.textContent = likeCount;

  deleteButton.addEventListener("click", (event) => {
    return deleteCard(event, id);
  });
  likeButton.addEventListener("click", (event) => {
    if (isLike) {
      isLike = false;
      return deletelikeButtonFunction(event, id, likeCountElement);
    } else {
      isLike = true;
      return likeButtonFunction(event, id, likeCountElement);
    }
  });
  cardImage.addEventListener("click", () => openModalImage(name, link));

  if (userCardId !== userId) {
    deleteButton.remove();
  }

  if (isLike) {
    likeButton.classList.add("card__like-button_is-active");
  }

  return cardElement;
};

export const deleteCard = (event, id) => {
  const cardItem = event.target.closest(".places__item");
  cardItem.remove();

  deleteCardFromServer(id).catch((err) => {
    console.log(err);
  });
};

export const likeButtonFunction = (event, id, likeCountElement) => {
  putLike(id)
    .then((res) => {
      event.target.classList.add("card__like-button_is-active");
      likeCountElement.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deletelikeButtonFunction = (event, id, likeCountElement) => {
  deleteLike(id)
    .then((res) => {
      event.target.classList.remove("card__like-button_is-active");
      likeCountElement.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
};
