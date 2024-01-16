import Popup from "./Popup.js";

//1.ProfileForm = "#editProfile-modal-form" | 2. AddCardForm ="#addCard-modal-form"

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._buttonElement = document.querySelector(".modal__save");
  }

  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll(".modal__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      //this._popupElement.reset();
      this._buttonElement.setAttribute("disabled", "");
      this._buttonElement.classList.add("modal__save_disabled");

      super.setEventListeners();
    });
  }

  openModal() {
    super.openModal();
  }

  closeModal() {
    super.closeModal();
  }
}
