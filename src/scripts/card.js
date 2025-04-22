import { cardTemplate, userId } from "./index";
import { deleteCardFromServer, putLike, deleteLike } from "./api";

export const createCard = (
  res,
  deleteCard,
  likeButtonFunction,
  openModalImage
) => {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCountElement = cardElement.querySelector(".card__like-count");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = res.link;
  cardImage.alt = res.name;
  cardElement.querySelector(".card__title").textContent = res.name;
  likeCountElement.textContent = res.likes.length;

  if (res.likes.find((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", (event) => {
    return likeButtonFunction(event, res._id, likeCountElement);
  });
  cardImage.addEventListener("click", () => openModalImage(res.name, res.link));

  if (res.owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", (event) => {
      return deleteCard(event, res._id);
    });
  }

  return cardElement;
};

export const deleteCard = (event, id) => {
  const cardItem = event.target.closest(".places__item");

  deleteCardFromServer(id)
    .then(() => {
      cardItem.remove();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const likeButtonFunction = (event, id, likeCountElement) => {
  if (event.target.classList.contains("card__like-button_is-active")) {
    deleteLike(id)
      .then((res) => {
        event.target.classList.remove("card__like-button_is-active");
        likeCountElement.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    putLike(id)
      .then((res) => {
        event.target.classList.add("card__like-button_is-active");
        likeCountElement.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
