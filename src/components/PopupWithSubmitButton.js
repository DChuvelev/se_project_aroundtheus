import Popup from "./Popup.js";
export default class PopupWithSubmitButton extends Popup {
    constructor(data, formSelector, submitHandler) {
        super(data);
        this._submitHandler = submitHandler;
        this._popupForm = this._popupWindow.querySelector(formSelector);
    }

    open(card) {
        this._cardToDelete = card;
        super.open();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (evt) => {
            this._submitHandler(evt, this._cardToDelete);
        });
    }

}