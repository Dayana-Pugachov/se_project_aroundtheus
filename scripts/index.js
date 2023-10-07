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

const profileEditModal = document.querySelector("#edit-modal");
const profileEditButton = document.querySelector(".profile__edit-button");

const editModalCloseButton = document.querySelector(".modal__close");
const addModalCloseButton = document.querySelector("#addModal-close");
const previewModalCloseButton = document.querySelector("#previewModal-close");

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
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const previewImageModal = document.querySelector("#previewModal");
const previewImage = previewImageModal.querySelector(".modal__image");
const previewDescription = previewImageModal.querySelector(
  ".modal__description"
);

const newCardTitleInput = profileAddModal.querySelector("#cardTitle-input-js");
const newCardImageLinkInput = profileAddModal.querySelector(
  "#cardImageLink-input-js"
);

/* EVENT LISTENERS */

profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  editProfileTitleInput.value = profileTitle.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

profileAddButton.addEventListener("click", () => openModal(profileAddModal));

profileAddFormElement.addEventListener("submit", handleAddCardFormSubmit);

/* FUNCTIONS */

function openModal(modal) {
  document.addEventListener("keydown", handleEsc);
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  document.removeEventListener("keydown", handleEsc);
  modal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = editProfileTitleInput.value;
  profileDescription.textContent = editProfileDescriptionInput.value;
  closeModal(profileEditModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const trashButton = cardElement.querySelector(".card__trash-button");

  cardImage.addEventListener("click", () => {
    openModal(previewImageModal);
    previewImage.setAttribute("src", data.link);
    previewImage.setAttribute("alt", data.name);
    previewDescription.textContent = data.name;
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  trashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);
  cardTitle.textContent = data.name;
  return cardElement;
}

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  galleryList.append(cardElement);
});

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = newCardTitleInput.value;
  const link = newCardImageLinkInput.value;
  const cardElement = getCardElement({
    name,
    link,
  });
  galleryList.prepend(cardElement);
  evt.target.reset();
  closeModal(profileAddModal);
}

const modalList = Array.from(document.querySelectorAll(".modal"));
modalList.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(modal);
    }
    if (evt.target.classList.contains("modal__close")) {
      closeModal(modal);
    }
  });
});

const handleEsc = (evt) => {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closeModal(openModal);
  }
};
