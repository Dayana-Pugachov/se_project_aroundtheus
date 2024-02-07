import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._saveButton = this._popupElement.querySelector(".modal__save");
    this._saveButtonText = this._saveButton.textContent;
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
      this._handleFormSubmit(this._getInputValues()); //this is where inputValues param comes from. That's why we consequently pass it in index.js inside handleFormSubmit(*here*);
    });
    super.setEventListeners();
  }

  closeModal() {
    this._popupForm.reset();
    super.closeModal();
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._saveButton.textContent = loadingText;
    } else {
      this._saveButton.textContent = this._saveButtonText;
    }
  }
  /*setButtonText(text) {
    this._saveButton.textContent = text;
  }*/
}
