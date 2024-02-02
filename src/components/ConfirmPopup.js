import Popup from "./Popup.js";

export default class ConfirmPopup extends Popup {
  constructor({ popupSelector, handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit; //handleSubmit = the func that executes api "DELETE" logic, it's like a renderer
    this._confirmButton = document.querySelector(".modal__save_confirm");
  }

  setEventListeners() {
    this._confirmButton.addEventListener("click", () => {
      this._handleSubmit(this._cardData);
    });
    super.setEventListeners();
  }

  openModal(cardData) {
    //as I use the openModal in handleDeleteClick, I'll pass card's data to it in order to know card's id
    this._cardData = cardData;
    super.openModal();
  }
}
