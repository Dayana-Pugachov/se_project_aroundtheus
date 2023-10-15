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
