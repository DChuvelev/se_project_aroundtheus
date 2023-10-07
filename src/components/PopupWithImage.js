import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(data, picSelector, captSelector) {
        super(data);
        this._picture = this._popupWindow.querySelector(picSelector);
        this._caption = this._popupWindow.querySelector(captSelector);
    }
    open({ link, altInfo, name} ) {
        super.open();
        this._picture.src = link;
        this._picture.alt = altInfo;
        this._caption.textContent = name;
    }
    
}