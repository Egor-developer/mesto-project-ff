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

export const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  removeEventListener("keydown", handleEscKeyUp);
};

export const createEventListener = (modalElement) => {
  const сross = modalElement.querySelector(".popup__close");

  сross.addEventListener("click", () => {
    closeModal(modalElement);
  });

  modalElement.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup")) {
      closeModal(modalElement);
    }
  });
};
