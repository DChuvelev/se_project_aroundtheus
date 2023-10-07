import {
    cardTemplate,
    inputFormsInfo,
    addCardForm,
    modalTitleInputID,
    modalDescriptionInputID,
    modalPlaceInputID,
    modalPlacePicUrlInputID,
    formValidators
} from "../utils/constants.js";

import {
    imagePopup,
    addCardPopup,
    editProfilePopup,
    cardsSection,
    user,    
} from "../pages/index.js"

import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";

export function createCard(cardInfo) {
    const newCard = new Card(cardInfo, cardTemplate, handleImageClick);
    return newCard.getCardElement();
}

function handleImageClick(card) {
    imagePopup.open({
        link: card.getCardLink(),
        altInfo: card.getCardAltInfo(),
        name: card.getCardName()
    });
}

export function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        const newFormValidator = new FormValidator(inputFormsInfo, formElement);
        const formName = formElement.getAttribute('name');
        formValidators[formName] = newFormValidator;
        newFormValidator.enableValidation();
    });
}

export function handleSubmitFormProfile(evt, inputValues) {
    evt.preventDefault();
    user.setUserInfo({
        name: `${inputValues[modalTitleInputID]}`,
        description: `${inputValues[modalDescriptionInputID]}`
    });
    editProfilePopup.close();
}

export function handleSubmitFormAddCard(evt, inputValues) {
    evt.preventDefault();
    const addedCard = createCard({
        name: `${inputValues[modalPlaceInputID]}`,
        link: `${inputValues[modalPlacePicUrlInputID]}`,
        alt: `${inputValues[modalPlaceInputID]}`
    });
    cardsSection.prependItem(addedCard);    
    addCardPopup.close();
    formValidators['add-card-form'].disableSubmitButton();
    addCardForm.reset();
}