import Popup from "./Popup.js";

//1.ProfileForm = "#editProfile-modal-form" | 2. AddCardForm ="#addCard-modal-form"

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    console.log(this);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    //this._buttonElement = document.querySelectorAll(".modal__save"); //!!!!
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
      console.log(this._buttonElement);
    });
    super.setEventListeners();
  }

  openModal() {
    super.openModal();
  }

  closeModal() {
    const saveButtons = Array.from(document.querySelectorAll(".modal__save"));
    saveButtons.forEach((button) => {
      button.setAttribute("disabled", "");
      button.classList.add("modal__save_disabled");
    });

    this._popupForm.reset();
    super.closeModal();
  }
}
