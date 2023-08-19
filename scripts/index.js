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

const profileEditModal = document.querySelector(".modal");
const profileEditButton = document.querySelector(".profile__edit-button");

const modalCloseButton = document.querySelector(".modal__close");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileFormElement = document.querySelector(".modal__form");

const editProfileTitleInput = profileFormElement.querySelector(
  "#modal__input_title-js"
);
const editProfileDescriptionInput = profileFormElement.querySelector(
  "#modal__input_description-js"
);

const galleryList = document.querySelector(".gallery__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

profileEditButton.addEventListener("click", () => {
  profileEditModal.classList.add("modal_opened");
  editProfileTitleInput.value = profileTitle.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
});

modalCloseButton.addEventListener("click", () => {
  profileEditModal.classList.remove("modal_opened");
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = editProfileTitleInput.value;
  profileDescription.textContent = editProfileDescriptionInput.value;
  profileEditModal.classList.remove("modal_opened");
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);
  cardTitle.textContent = data.name;
  return cardElement;
}

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  galleryList.append(cardElement);
});
