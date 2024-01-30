// CLASSES IMPORTS + STYLESHEET -----
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import "./index.css";

// CONSTANTS IMPORTS -----
import {
  initialCards,
  profileEditButton,
  profileAddButton,
  editProfileTitleInput,
  editProfileDescriptionInput,
  galleryList,
  newCardTitleInput,
  newCardImageLinkInput,
  options,
  editProfileForm,
  addCardForm,
} from "../utils/constants.js";

// USER INFO -----

const userInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileDescriptionSelector: ".profile__description",
});

profileEditButton.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  editProfileTitleInput.value = info.name;
  editProfileDescriptionInput.value = info.description;
  profileFormPopup.openModal();
});
//right now what getUserInfo() retuns is the hardcoded values from HTML
//need to find a way to change that

//right now what I see in the profile - are hardcoded <h1>s with my titles in HTML
//unrelated to any existing method in the code, I want this user data to be just put in those <h1>s from the server

// PROFILE FORM POPUP -----

const profileFormPopup = new PopupWithForm({
  popupSelector: "#edit-modal",
  handleFormSubmit: handleProfileFormSubmit,
});

profileFormPopup.setEventListeners();

function handleProfileFormSubmit(inputValues) {
  userInfo.setUserInfo(inputValues);
  profileFormPopup.closeModal();
  editFormValidator.toggleButtonState();
}

// POPUP WITH IMAGE -----

const popupWithImage = new PopupWithImage({
  popupSelector: "#previewModal",
});

popupWithImage.setEventListeners();

function handleImageClick(link, name) {
  popupWithImage.openModal(link, name);
}

// SECTION - GALLERY LIST -----

const galleryListSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = createCard(data);

      galleryListSection.addItem(cardElement);
    },
  },
  ".gallery__list"
);

galleryListSection.renderItems();

// ADD NEW CARD FORM -----

const newCardFormPopup = new PopupWithForm({
  popupSelector: "#add-modal",
  handleFormSubmit: handleAddCardFormSubmit,
});

profileAddButton.addEventListener("click", () => newCardFormPopup.openModal());

function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  const cardElement = card.generateCard();
  return cardElement;
}

newCardFormPopup.setEventListeners();

function handleAddCardFormSubmit(inputValues) {
  const cardElement = createCard(inputValues);
  galleryListSection.addItem(cardElement);
  newCardFormPopup.closeModal();
  cardFormValidator.toggleButtonState();
}

//FORM INIT -----

const editFormValidator = new FormValidator(options, editProfileForm);
const cardFormValidator = new FormValidator(options, addCardForm);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

//TRYING API -----

const api = new Api({}); //I probably do need to pass something to the constructor

api.loadUserInfo().then((userData) => {
  userInfo.setUserInfo(userData.name, userData.about);
});

api.loadUserInfo().then((userData) => {
  console.log(userData);
});
