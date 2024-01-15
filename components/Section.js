export default class Section {
  constructor({ items, renderer }, containerSelector) {
    //containerSelector = galleryList = ".gallery__list"
    this._renderedItems = items; //renderedItems = initialCards (how all the new cards get added as well?)
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector); //we'll see if it's possible to use the const name only, insted of querySelector
  }

  renderItems(/*I'll leave it empty for now*/) {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}

//imported Section class to index.js
//if I create a separate utils folder with utils (funcs) and consts in the future, I'll need to import relevant items into index.js

/*const galleryList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardElement = createCard(data);
      addItem(cardElement);
    },
  },
  ".gallery__list"
);*/
