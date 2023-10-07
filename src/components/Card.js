export class Card {
    constructor (data, cardSelector, handleImageClick) {
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
        this._cardElement = this._cardSelector.querySelector(".card").cloneNode(true);
        this._cardElementCaption = this._cardElement.querySelector(".card__caption");
        this._cardElementCaption.textContent = data.name;
        this._cardImageElement = this._cardElement.querySelector(".card__image");
        this._cardImageElement.src = data.link;
        this._cardImageElement.alt = data.alt;
    }

    _handleLikeCard(evt) {
        evt.target.classList.toggle("card__button-heart_active");
    }

    _handleDeleteCard(evt) {
        evt.target.closest(".card").remove();
    }

    _setEventListeners() {
        this._cardElement.querySelector(".card__button-heart").addEventListener("click", (evt) => {this._handleLikeCard(evt);});
        this._cardElement.querySelector(".card__button-delete").addEventListener("click", (evt) => {this._handleDeleteCard(evt);});
        this._cardImageElement.addEventListener("click", () => {this._handleImageClick(this)});    
    }
    getCardElement() {        
        this._setEventListeners();
        return this._cardElement;
    }

    getCardName() {
        return this._cardElementCaption.textContent;
    }

    getCardAltInfo() {
        return this._cardImageElement.alt;
    }

    getCardLink() {
        return this._cardImageElement.src;
    }
}