import Popup from "./Popup.js";

//1.ProfileForm = "#editProfile-modal-form" | 2. AddCardForm ="#addCard-modal-form"

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
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
      this._popupElement.reset();

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
