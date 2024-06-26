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
  profileEditButton,
  profileAddButton,
  profileAvatarWrapper,
  editProfileTitleInput,
  editProfileDescriptionInput,
  options,
  editProfileForm,
  addCardForm,
  avatarForm,
} from "../utils/constants.js";
import ConfirmPopup from "../components/ConfirmPopup.js";

//PAGE LOAD -----

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5bd639c7-c1c3-496d-947f-3773995c6d1b",
    "Content-Type": "application/json",
  },
});

let galleryListSection;
api
  .loadPageContent()
  .then(([userData, cardArr]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setAvatar(userData.avatar);

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
  })
  .catch(console.error);

// USER INFO -----

const userInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileDescriptionSelector: ".profile__description",
  profileAvatarSelector: ".profile__avatar",
});

profileEditButton.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  editProfileTitleInput.value = info.name;
  editProfileDescriptionInput.value = info.description;
  editFormValidator.resetValidation();
  profileFormPopup.openModal();
});

// PROFILE FORM POPUP -----

const profileFormPopup = new PopupWithForm({
  popupSelector: "#edit-modal",
  handleFormSubmit: handleProfileFormSubmit,
});

profileFormPopup.setEventListeners();

function handleProfileFormSubmit(inputValues) {
  profileFormPopup.renderLoading(true);
  api
    .editUserInfo(inputValues.name, inputValues.description)
    .then((userData) => {
      userInfo.setUserInfo(userData.name, userData.about);
      profileFormPopup.closeModal();
      editFormValidator.toggleButtonState();
    })
    .catch(console.error)
    .finally(() => {
      profileFormPopup.renderLoading(false);
    });
}

//AVATAR FORM POPUP -----

const avatarFormPopup = new PopupWithForm({
  popupSelector: "#avatar-modal",
  handleFormSubmit: handleAvatarFormSubmit,
});

avatarFormPopup.setEventListeners();

profileAvatarWrapper.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarFormPopup.openModal();
});

function handleAvatarFormSubmit(inputValue) {
  avatarFormPopup.renderLoading(true);
  api
    .updateAvatar(inputValue.link)
    .then((userData) => {
      userInfo.setAvatar(userData.avatar);
      avatarFormPopup.closeModal();
      avatarFormValidator.toggleButtonState();
    })
    .catch(console.error)
    .finally(() => {
      avatarFormPopup.renderLoading(false);
    });
}

// POPUP WITH IMAGE -----

const popupWithImage = new PopupWithImage({
  popupSelector: "#previewModal",
});

popupWithImage.setEventListeners();

function handleImageClick(link, name) {
  popupWithImage.openModal(link, name);
}

// ADD NEW CARD FORM -----

const newCardFormPopup = new PopupWithForm({
  popupSelector: "#add-modal",
  handleFormSubmit: handleAddCardFormSubmit,
});

function handleDeleteClick(cardData) {
  confirmPopup.openModal(cardData);
}

profileAddButton.addEventListener("click", () => {
  cardFormValidator.resetValidation();
  newCardFormPopup.openModal();
});

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
      .catch(console.error);
  } else {
    api
      .likeCard(cardId)
      .then(() => {
        card.setLikeStatus(true);
      })
      .catch(console.error);
  }
}

newCardFormPopup.setEventListeners();

function handleAddCardFormSubmit(inputValues) {
  newCardFormPopup.renderLoading(true);
  api
    .addNewCard(inputValues.name, inputValues.link)
    .then((data) => {
      const cardElement = createCard(data);
      galleryListSection.addItem(cardElement);
      newCardFormPopup.closeModal();
      cardFormValidator.toggleButtonState();
    })
    .catch(console.error)
    .finally(() => {
      newCardFormPopup.renderLoading(false);
    });
}

//CONFIRMATION POPUP -----

function handleConfirmSubmit(card) {
  const cardId = card.getId();
  api
    .deleteCard(cardId)
    .then(() => {
      card.removeCard();
      confirmPopup.closeModal();
    })
    .catch(console.error);
}

const confirmPopup = new ConfirmPopup({
  popupSelector: "#confirmationModal",
  handleConfirmSubmit,
});

confirmPopup.setEventListeners();

//FORM INIT -----

const editFormValidator = new FormValidator(options, editProfileForm);
const cardFormValidator = new FormValidator(options, addCardForm);
const avatarFormValidator = new FormValidator(options, avatarForm);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();
