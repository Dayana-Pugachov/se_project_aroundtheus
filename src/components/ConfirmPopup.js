import Popup from "./Popup.js";

export default class ConfirmPopup extends Popup {
  constructor({ popupSelector, handleYes }) {
    super(popupSelector);
    this._handleYes = handleYes; //handleYes = the func that executes api "DELETE" logic, it's like a renderer
    this._confirmButton = document.querySelector(".modal__save_confirm");
  }

  setEventListeners() {
    this._confirmButton.addEventListener("click", () => {
      this._handleYes();
    });
    super.setEventListeners();
  }
}
