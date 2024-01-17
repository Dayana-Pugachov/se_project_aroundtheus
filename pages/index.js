import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

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

/* SELECTORS */
//
const profileEditModal = document.querySelector("#edit-modal");
const profileEditButton = document.querySelector(".profile__edit-button");
//!!!!!!
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileFormElement = document.querySelector(".modal__form");
const profileAddFormElement = document.querySelector("#addCard-modal-form");

const profileAddModal = document.querySelector("#add-modal");
const profileAddButton = document.querySelector(".profile__add-button");

const editProfileTitleInput =
  profileFormElement.querySelector("#name-input-js");
const editProfileDescriptionInput = profileFormElement.querySelector(
  "#description-input-js"
);

const galleryList = document.querySelector(".gallery__list");

const newCardTitleInput = profileAddModal.querySelector("#cardTitle-input-js");
const newCardImageLinkInput = profileAddModal.querySelector(
  "#cardImageLink-input-js"
);

const previewImageModal = document.querySelector("#previewModal");
const previewImage = previewImageModal.querySelector(".modal__image");
const previewDescription = previewImageModal.querySelector(
  ".modal__description"
);

/* EVENT LISTENERS */

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

profileAddButton.addEventListener("click", () => newCardFormPopup.openModal());

/* FUNCTIONS */
//Have added these into Popup class
/*function openModal(modal) {
  document.addEventListener("keydown", handleEsc);
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  document.removeEventListener("keydown", handleEsc);
  modal.classList.remove("modal_opened");
}*/

const profileFormPopup = new PopupWithForm({
  popupSelector: "#edit-modal",
  handleFormSubmit: handleProfileFormSubmit,
});

profileFormPopup.setEventListeners();

function handleProfileFormSubmit(inputValues) {
  console.log(inputValues);
  userInfo.setUserInfo(
    editProfileTitleInput.value,
    editProfileDescriptionInput.value
  );
  /*profileTitle.textContent = editProfileTitleInput.value; //here I need to pass info from inputValues
  profileDescription.textContent = editProfileDescriptionInput.value;*/
  profileFormPopup.closeModal(); //
}

const popupWithImage = new PopupWithImage({
  popupSelector: "#previewModal",
});

popupWithImage.setEventListeners();

function handleImageClick(link, name) {
  popupWithImage.openModal(link, name);
}

function createCard(data) {
  const card = new Card(data, "#card-template", handleImageClick);
  const cardElement = card.generateCard();
  return cardElement;
}

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

/*initialCards.forEach((data) => {
  const cardElement = createCard(data);
  galleryList.append(cardElement);
});*/

const newCardFormPopup = new PopupWithForm({
  popupSelector: "#add-modal",
  handleFormSubmit: handleAddCardFormSubmit,
});

newCardFormPopup.setEventListeners();

function handleAddCardFormSubmit() {
  const name = newCardTitleInput.value;
  const link = newCardImageLinkInput.value;

  const cardElement = createCard({
    name,
    link,
  });

  galleryList.prepend(cardElement);
  //evt.target.reset();
  cardFormValidator.toggleButtonState();
  newCardFormPopup.closeModal();
}

//modified and added to Popup class
/*const modalList = Array.from(document.querySelectorAll(".modal"));
modalList.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(modal);
    }
    if (evt.target.classList.contains("modal__close")) {
      closeModal(modal);
    }
  });
});*/

//added to Popup class
/*const handleEsc = (evt) => {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".modal_opened");
    closeModal(openPopup);
  }
};*/ //added this into Popup class

//FORM INIT//

const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};

const editProfileForm = document.querySelector("#editProfile-modal-form");
const addCardForm = document.querySelector("#addCard-modal-form");

const editFormValidator = new FormValidator(options, editProfileForm);
const cardFormValidator = new FormValidator(options, addCardForm);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
