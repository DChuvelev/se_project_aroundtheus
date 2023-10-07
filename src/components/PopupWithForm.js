import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(data, formSelector, submitHandler) {
        super(data);
        this._submitHandler = submitHandler;
        this._popupForm = this._popupWindow.querySelector(formSelector);
        this._formInputs = Array.from(this._popupForm.querySelectorAll("input"));
    }
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (evt) => {
            this._submitHandler(evt, this._getInputValues());
        });
    }
    _getInputValues() {
        const inputValues = {};
        this._formInputs.forEach((formInput) => {
            inputValues[formInput.name] = formInput.value;
        });
        return inputValues;
    }
    setInputValues(data) {
        this._formInputs.forEach((formInput) => {
            formInput.value = data[formInput.name];
        });
    }
    close() {
        super.close();
        this._popupForm.reset();
    }
}