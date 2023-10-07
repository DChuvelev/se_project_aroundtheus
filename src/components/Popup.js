export default class Popup {
    constructor( {popupSelector, popupOpenedClass, closeButtonSelector} ) {
        this._popupWindow = document.querySelector(popupSelector);
        this._closeButton = this._popupWindow.querySelector(closeButtonSelector);
        this._popupOpenedClass = popupOpenedClass;
    }

    open() {
        this._popupWindow.classList.add(this._popupOpenedClass);
        document.addEventListener("keydown", this._handleEscClose);
    }
    close() {
        this._popupWindow.classList.remove(this._popupOpenedClass);
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this._closeButton.addEventListener("click", () => {this.close();});
        this._popupWindow.addEventListener("mousedown", (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });    
    }
}