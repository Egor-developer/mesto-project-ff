const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const createCard = (name, link, deleteCard) => {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector(".card__title").textContent = name;

  deleteButton.addEventListener("click", deleteCard);

  return cardElement;
};

const deleteCard = (event) => {
  const cardItem = event.target.closest(".places__item");
  cardItem.remove();
};

initialCards.forEach((elem) => {
  placesList.append(createCard(elem.name, elem.link, deleteCard));
});
