export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  openModal() {
    document.addEventListener("keydown", this._handleEsc);
    this._popupElement.classList.add("modal_opened");
  }

  closeModal() {
    document.removeEventListener("keydown", this._handleEsc);
    this._popupElement.classList.remove("modal_opened");
  }

  _handleEsc(evt) {
    if (evt.key === "Escape") {
      const openPopup = document.querySelector(".modal_opened");
      console.log(openPopup);
      openPopup.closeModal();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      if (
        evt.target === this._popupElement ||
        evt.target.classList.contains("modal__close")
      ) {
        this.closeModal();
      }
    });
  }
}
