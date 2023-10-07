import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";

import {
    cardTemplate,
    addCardForm,
    inputFormsInfo,
    cardsArray,
    cardsSectionSelector,
    editProfileBtn,
    editProfilePopupSelector,
    addCardBtn,
    addCardPopupSelector,
    popupOpenedClass,
    closeButtonSelector,
    formSelector,
    profileTitleSelector,
    profileDescriptionSelector,
    modalTitleInputName,
    modalDescriptionInputName,
    modalPlaceInputName,
    modalPlacePicUrlInputName,
    imagePopupSelector,
    modalPictureSelector,
    modalPictureCaptionSelector,
    formValidators
} from "../utils/constants.js"

// ------------- Init Cards Part ---------------

function createCard(cardInfo) {
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

const cardsSection = new Section({ items: cardsArray, renderer: (cardInfo) => {
    const newCardElement = createCard(cardInfo);
    cardsSection.appendItem(newCardElement);    
}}, cardsSectionSelector);

cardsSection.renderItems();

// ------------- User Part ---------------

const user = new UserInfo({
    userNameSelector: profileTitleSelector, 
    userDescriptionSelector: profileDescriptionSelector
});

// ------------- Edit Profile Part ---------------

function handleSubmitFormProfile(evt, inputValues) {
    evt.preventDefault();
    user.setUserInfo({
        name: `${inputValues[modalTitleInputName]}`,
        description: `${inputValues[modalDescriptionInputName]}`
    });
    editProfilePopup.close();
}

const editProfilePopup = new PopupWithForm({
    popupSelector: editProfilePopupSelector, 
    popupOpenedClass, 
    closeButtonSelector
}, formSelector, handleSubmitFormProfile);

editProfilePopup.setEventListeners();

editProfileBtn.addEventListener("click", () => {
    const data = {};
    const { name, description } = user.getUserInfo();
    data[modalTitleInputName] = name;
    data[modalDescriptionInputName] = description;
    editProfilePopup.setInputValues(data);
    formValidators['edit-profile-form'].resetValidation();
    formValidators['edit-profile-form'].disableSubmitButton();
    editProfilePopup.open();
});

// ------------- Add CardPart ---------------

function handleSubmitFormAddCard(evt, inputValues) {
    evt.preventDefault();
    const addedCard = createCard({
        name: `${inputValues[modalPlaceInputName]}`,
        link: `${inputValues[modalPlacePicUrlInputName]}`,
        alt: `${inputValues[modalPlaceInputName]}`
    });
    cardsSection.prependItem(addedCard);    
    addCardPopup.close();
}

const addCardPopup = new PopupWithForm({
    popupSelector: addCardPopupSelector, 
    popupOpenedClass, 
    closeButtonSelector
}, formSelector, handleSubmitFormAddCard);
addCardPopup.setEventListeners();

addCardBtn.addEventListener("click", () => {
    formValidators['add-card-form'].disableSubmitButton();
    addCardPopup.open();
});

// ------------- Image Popup Part ---------------

const imagePopup = new PopupWithImage({
    popupSelector: imagePopupSelector, 
    popupOpenedClass, 
    closeButtonSelector
}, modalPictureSelector, modalPictureCaptionSelector);

imagePopup.setEventListeners();

// ------------- Validation Part ---------------

function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        const newFormValidator = new FormValidator(inputFormsInfo, formElement);
        const formName = formElement.getAttribute('name');
        formValidators[formName] = newFormValidator;
        newFormValidator.enableValidation();
    });
}

enableValidation(inputFormsInfo);