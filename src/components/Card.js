export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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
      this._handleImageClick(this._link, this._name);
    });

    this._likeButton = this._element.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
      //this._handleCardLike();
    });

    //my trash button
    const trashButton = this._element.querySelector(".card__trash-button");
    trashButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
      //this._handleDeleteCard();
    });
  }

  /*_handleDeleteCard() {
    this._element.remove();
  }*/

  handleCardLike() {
    this._likeButton.classList.toggle("card__like-button_active");
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

  getId() {
    return this._id; //don't compeletely understand how that works in relation to other classes and index.js
  }
}
