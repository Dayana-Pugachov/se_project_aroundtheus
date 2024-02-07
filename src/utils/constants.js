//ELEMENTS -----
const profileEditButton = document.querySelector(".profile__edit-button");
const profileFormElement = document.querySelector(".modal__form");
const profileAddButton = document.querySelector(".profile__add-button");
const profileAvatarWrapper = document.querySelector(".profile__avatar-wrapper");

//INPUTS -----
const editProfileTitleInput =
  profileFormElement.querySelector("#name-input-js");
const editProfileDescriptionInput = profileFormElement.querySelector(
  "#description-input-js"
);

//FORM VALIDATOR OPTIONS -----
const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};

//FORMS -----
const editProfileForm = document.querySelector("#editProfile-modal-form");
const addCardForm = document.querySelector("#addCard-modal-form");
const avatarForm = document.querySelector("#avatar-modal-form");

export {
  profileEditButton,
  profileAddButton,
  profileAvatarWrapper,
  editProfileTitleInput,
  editProfileDescriptionInput,
  options,
  editProfileForm,
  addCardForm,
  avatarForm,
};
