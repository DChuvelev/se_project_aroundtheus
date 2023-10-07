import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

import {
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
    modalTitleInputID,
    modalDescriptionInputID,
    imagePopupSelector,
    modalPictureSelector,
    modalPictureCaptionSelector,
    formValidators
} from "../utils/constants.js"

import {
    createCard,
    enableValidation,
    handleSubmitFormAddCard,
    handleSubmitFormProfile,
} from "../utils/utils.js"

// ------------- Init Cards Part ---------------

export const cardsSection = new Section({ items: cardsArray, renderer: (cardInfo) => {
    const newCardElement = createCard(cardInfo);
    cardsSection.appendItem(newCardElement);    
}}, cardsSectionSelector);

cardsSection.renderItems();

// ------------- User Part ---------------

export const user = new UserInfo({
    userNameSelector: profileTitleSelector, 
    userDescriptionSelector: profileDescriptionSelector
});

// ------------- Edit Profile Part ---------------

export const editProfilePopup = new PopupWithForm({
    popupSelector: editProfilePopupSelector, 
    popupOpenedClass, 
    closeButtonSelector
}, formSelector, handleSubmitFormProfile);

editProfilePopup.setEventListeners();

editProfileBtn.addEventListener("click", () => {
    editProfilePopup.setInputValue(modalTitleInputID, user.getUserInfo().name);
    editProfilePopup.setInputValue(modalDescriptionInputID, user.getUserInfo().description);
    formValidators['edit-profile-form'].resetValidation();
    formValidators['edit-profile-form'].disableSubmitButton();
    editProfilePopup.open();
});

// ------------- Add CardPart ---------------

export const addCardPopup = new PopupWithForm({
    popupSelector: addCardPopupSelector, 
    popupOpenedClass, 
    closeButtonSelector
}, formSelector, handleSubmitFormAddCard);
addCardPopup.setEventListeners();

addCardBtn.addEventListener("click", () => {
    addCardPopup.open();
});

// ------------- Image Popup Part ---------------

export const imagePopup = new PopupWithImage({
    popupSelector: imagePopupSelector, 
    popupOpenedClass, 
    closeButtonSelector
}, modalPictureSelector, modalPictureCaptionSelector);

imagePopup.setEventListeners();

// ------------- Validation Part ---------------

enableValidation(inputFormsInfo);
