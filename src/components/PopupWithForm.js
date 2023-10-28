import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(data, formSelector, submitHandler) {
        super(data);
        this._submitHandler = submitHandler;
        this._popupForm = this._popupWindow.querySelector(formSelector);
        this._formInputs = Array.from(this._popupForm.querySelectorAll("input"));
        this._submitBtn = this._popupForm.querySelector('.modal__submit-btn');
        this._submitBtnOrigText = this._submitBtn.textContent;
    }
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (evt) => {
            this._submitHandler(evt, this._getInputValues(), this);
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
    renderLoading(isLoading, loadingText = 'Saving...') {
        this._submitBtn.textContent = (isLoading ? loadingText : this._submitBtnOrigText);
    }
}