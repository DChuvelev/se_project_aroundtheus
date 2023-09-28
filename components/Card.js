export class Card {
    constructor (data, cardSelector, handleImageClick) {
        this._name = data.name;
        this._link = data.link;
        this._alt = data.alt;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }

    _handleLikeCard(evt) {
        evt.target.classList.toggle("card__button-heart_active");
    }

    _handleDeleteCard(evt) {
        evt.target.closest(".card").remove();
    }

    _setEventListeners(cardElement) {
        cardElement.querySelector(".card__button-heart").addEventListener("click", (evt) => {this._handleLikeCard(evt);});
        cardElement.querySelector(".card__button-delete").addEventListener("click", (evt) => {this._handleDeleteCard(evt);});
        cardElement.querySelector(".card__image").addEventListener("click", () => {this._handleImageClick(this)});    
    }
    getCardElement() {
        const resultCard = this._cardSelector.querySelector(".card").cloneNode(true);
        resultCard.querySelector(".card__caption").textContent = this._name;
        const resultCardImage = resultCard.querySelector(".card__image");
        resultCardImage.src = this._link;
        resultCardImage.alt = this._alt;
        this._setEventListeners(resultCard);
        return resultCard;
    }

    getCardName() {
        return this._name;
    }

    getCardAltInfo() {
        return this._alt;
    }

    getCardLink() {
        return this._link;
    }
}