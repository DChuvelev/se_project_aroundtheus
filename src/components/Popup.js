export default class Popup {
    constructor( {popupSelector, popupOpenedClass, closeButtonSelector} ) {
        this._popupWindow = document.querySelector(popupSelector);
        this._closeButton = this._popupWindow.querySelector(closeButtonSelector);
        this._popupOpenedClass = popupOpenedClass;
        this._isOpened = false;
    }

    open() {
        this._popupWindow.classList.add(this._popupOpenedClass);
        this._isOpened = true;
        // modalOpened = box;
        document.addEventListener("keydown", (evt) => {this._handleEscClose(evt);});
    }
    close() {
        if (this._isOpened) {
            this._popupWindow.classList.remove(this._popupOpenedClass);
            // modalOpened = null;
        }
        document.removeEventListener("keydown", this._handleEscapeClose);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this._closeButton.addEventListener("mousedown", () => {this.close();});
        this._popupWindow.addEventListener("mousedown", (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });    
    }
}