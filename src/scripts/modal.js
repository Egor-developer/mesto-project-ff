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

  сross.addEventListener("click", () => closeModal(modalElement));

  modalElement.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup")) {
      closeModal(modalElement);
    }
  });
};

export const modalEditingProfile = document.querySelector(".popup_type_edit");
export const modalAdditionsCards = document.querySelector(
  ".popup_type_new-card"
);
export const modalImage = document.querySelector(".popup_type_image");

createEventListener(modalEditingProfile);
createEventListener(modalAdditionsCards);
createEventListener(modalImage);

const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

function handleFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileName.textContent = name;
  profileJob.textContent = job;

  closeModal(modalEditingProfile);
}

formElement.addEventListener("submit", handleFormSubmit);
