const previewImageModal = document.querySelector("#previewModal");
const previewImage = previewImageModal.querySelector(".modal__image");
const previewDescription = previewImageModal.querySelector(
  ".modal__description"
);

const handleEsc = (evt) => {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closeModal(openModal);
  }
};

const openModal = (modal) => {
  document.addEventListener("keydown", handleEsc);
  modal.classList.add("modal_opened");
};

const closeModal = (modal) => {
  document.removeEventListener("keydown", handleEsc);
  modal.classList.remove("modal_opened");
};

export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    const cardImage = this._element.querySelector(".card__image");
    cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });

    const likeButton = this._element.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      this._handleCardLike();
    });

    const trashButton = this._element.querySelector(".card__trash-button");
    trashButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleCardLike() {
    const likeButton = this._element.querySelector(".card__like-button");
    likeButton.classList.toggle("card__like-button_active");
  }

  /*_handlePreviewImage() {
    //open preview image//
    //openModal(previewImageModal);
    //previewImage.setAttribute("src", this._link);
    //previewImage.setAttribute("alt", this._name);
    //previewDescription.textContent = this._name;
    //close preview image//
    //closeModal(previewImageModal);
  }*/

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardTitle = this._element.querySelector(".card__title");
    const cardImage = this._element.querySelector(".card__image");

    cardImage.setAttribute("src", this._link);
    cardImage.setAttribute("alt", this._name);
    cardTitle.textContent = this._name;

    return this._element;
  }
}
