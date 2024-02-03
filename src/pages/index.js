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
  profileAvatar,
  editProfileTitleInput,
  editProfileDescriptionInput,
  galleryList,
  newCardTitleInput,
  newCardImageLinkInput,
  options,
  editProfileForm,
  addCardForm,
  avatarForm,
} from "../utils/constants.js";
import ConfirmPopup from "../components/ConfirmPopup.js";

const api = new Api({});

// USER INFO -----

const userInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileDescriptionSelector: ".profile__description",
  profileAvatarSelector: ".profile__avatar",
});

api.loadUserInfo().then((userData) => {
  console.log(`${userData} - this is userData`);
  //see what userData is and use `<%=require('${userData.src}')%>`
  userInfo.setUserInfo(userData.name, userData.about, userData.link); //or userData.link
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
  api
    .editUserInfo(inputValues.name, inputValues.description)
    .then((userData) => {
      userInfo.setUserInfo(userData.name, userData.about);
    });
  profileFormPopup.closeModal();
  editFormValidator.toggleButtonState();
}

//AVATAR FORM POPUP -----

const avatarFormPopup = new PopupWithForm({
  popupSelector: "#avatar-modal",
  handleFormSubmit: handleAvatarFormSubmit,
});

avatarFormPopup.setEventListeners();

profileAvatar.addEventListener("click", () => avatarFormPopup.openModal());

function handleAvatarFormSubmit(inputValue) {
  api.updateAvatar(inputValue.link).then((userData) => {
    profileAvatar.src = userData.link;
  });
  avatarFormPopup.closeModal();
  avatarFormValidator.toggleButtonState();
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
let galleryListSection;
api.getInitialCards().then((cardArr) => {
  galleryListSection = new Section(
    {
      items: cardArr.reverse(),
      renderer: (data) => {
        const cardElement = createCard(data);
        galleryListSection.addItem(cardElement);
      },
    },
    ".gallery__list"
  );
  galleryListSection.renderItems();
});

// ADD NEW CARD FORM -----

const newCardFormPopup = new PopupWithForm({
  popupSelector: "#add-modal",
  handleFormSubmit: handleAddCardFormSubmit,
});

function handleDeleteClick(cardData) {
  confirmPopup.openModal(cardData);
}

profileAddButton.addEventListener("click", () => newCardFormPopup.openModal());

function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  );
  const cardElement = card.generateCard();
  return cardElement;
}

function handleLikeClick(card) {
  const cardId = card.getId();
  if (card.getLikeStatus()) {
    api
      .unlikeCard(cardId)
      .then(() => {
        card.setLikeStatus(false);
      })
      .catch((err) => console.log(`${err} Something is wrong`));
  } else {
    api.likeCard(cardId).then(() => {
      card.setLikeStatus(true);
    });
  }
}

newCardFormPopup.setEventListeners();

function handleAddCardFormSubmit(inputValues) {
  api.addNewCard(inputValues.name, inputValues.link).then((data) => {
    const cardElement = createCard(data);
    galleryListSection.addItem(cardElement);
    newCardFormPopup.closeModal();
    cardFormValidator.toggleButtonState();
  });
}

//CONFIRMATION POPUP -----

function handleSubmit(card) {
  const cardId = card.getId();
  api.deleteCard(cardId).then(() => {
    card.removeCard();
    confirmPopup.closeModal();
  });
}

const confirmPopup = new ConfirmPopup({
  popupSelector: "#confirmationModal",
  handleSubmit,
});

confirmPopup.setEventListeners();
//FORM INIT -----

const editFormValidator = new FormValidator(options, editProfileForm);
const cardFormValidator = new FormValidator(options, addCardForm);
const avatarFormValidator = new FormValidator(options, avatarForm);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

//TRYING API -----

/*api.loadUserInfo().then((userData) => {
  userInfo.setUserInfo(userData.name, userData.about);
});*/

api.getInitialCards().then((cardArr) => {
  console.log(cardArr);
});
