export default class Card {
    constructor (data, cardSelector, handleImageClick, confirmDelete, callApiDelete, callApiLike) {
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
        this._confirmDelete = confirmDelete;
        this._callApiDelete = callApiDelete;
        this._callApiLike = callApiLike;
        this._cardElement = this._cardSelector.querySelector(".card").cloneNode(true);
        this._cardElementCaption = this._cardElement.querySelector(".card__caption");
        this._cardElementCaption.textContent = data.name;
        this._likeElement = this._cardElement.querySelector(".card__button-heart");
        this._cardImageElement = this._cardElement.querySelector(".card__image");
        this._cardImageElement.src = data.link;
        this._cardImageElement.alt = data.name;
        this._cardImageElement.id = data._id;
        if (data.isLiked) {
            this._likeElement.classList.add("card__button-heart_active");
        }
    }

    _handleLikeCard = (evt) => {
        evt.target.classList.toggle("card__button-heart_active");
        this._callApiLike(this._cardImageElement.id, evt.target.classList.contains("card__button-heart_active"));
    }

    _handleDeleteCard = () => {
        this._confirmDelete(this);
    }

    deleteCard() {
        this._removeEventListeners();
        this._cardElement.remove();
        this._callApiDelete(this._cardImageElement.id);    
    }

    _callHandleImageClick = () => {
        this._handleImageClick(this);
    }

    _setEventListeners() {
        this._cardElement.querySelector(".card__button-heart").addEventListener("click", this._handleLikeCard);
        this._cardElement.querySelector(".card__button-delete").addEventListener("click", this._handleDeleteCard);
        this._cardImageElement.addEventListener("click", this._callHandleImageClick);    
    }

    _removeEventListeners() {
        this._cardElement.querySelector(".card__button-heart").removeEventListener("click", this._handleLikeCard);
        this._cardElement.querySelector(".card__button-delete").removeEventListener("click", this._handleDeleteCard);
        this._cardImageElement.removeEventListener("click", this._callHandleImageClick);
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