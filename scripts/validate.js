const inputFormsInfo = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit-btn",
    inactiveButtonClass: "modal__submit-btn_disabled",      // do I realy need it? I used :disabled pseudo-class instead
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
}

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
}


const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

const toggleSubmitButton = (buttonElement, inactiveButtonClass, inputList) => {
    if (hasInvalidInput(inputList)) {
        // buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        // buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }

}


const setEventListeners = ({formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleSubmitButton(buttonElement, inactiveButtonClass, inputList);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            toggleSubmitButton(buttonElement, inactiveButtonClass, inputList);
        });
    });

}


const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        // const fieldsetList = Array.from(formElement.querySelectorAll(".modal__input-fieldset"));
        setEventListeners({formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass});
    });    
}

const resetValidation = (modalBox) => {
    const simulateInputEvent = new Event("input");
    const formInputs = Array.from(modalBox.querySelectorAll(".modal__input"));
    formInputs.forEach((modalInput) => {modalInput.dispatchEvent(simulateInputEvent);});
}

enableValidation(inputFormsInfo);
