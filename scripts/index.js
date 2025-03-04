const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const addCard = (name, link, deleteCard) => {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__title").textContent = name;

  deleteButton.addEventListener("click", deleteCard);

  return cardElement;
};

const deleteCard = (event) => {
  const cardItem = event.target.closest(".places__item");
  cardItem.remove();
};

initialCards.forEach((elem) => {
  placesList.append(addCard(elem.name, elem.link, deleteCard));
});
