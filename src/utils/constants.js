const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];
const galleryList = document.querySelector(".gallery__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileFormElement = document.querySelector(".modal__form");
const profileAddModal = document.querySelector("#add-modal");
const profileAddButton = document.querySelector(".profile__add-button");
const profileAvatar = document.querySelector(".profile__avatar");
const profileAvatarWrapper = document.querySelector(".profile__avatar-wrapper");

//INPUTS -----
const editProfileTitleInput =
  profileFormElement.querySelector("#name-input-js");
const editProfileDescriptionInput = profileFormElement.querySelector(
  "#description-input-js"
);

const newCardTitleInput = profileAddModal.querySelector("#cardTitle-input-js");
const newCardImageLinkInput = profileAddModal.querySelector(
  "#cardImageLink-input-js"
);

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
  initialCards,
  profileEditButton,
  profileAddButton,
  profileAvatar,
  profileAvatarWrapper,
  editProfileTitleInput,
  editProfileDescriptionInput,
  galleryList,
  newCardTitleInput,
  newCardImageLinkInput,
  options,
  editProfileForm,
  addCardForm,
  avatarForm,
};
