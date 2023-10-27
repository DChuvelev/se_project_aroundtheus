import "../pages/index.css";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithSubmitButton from "../components/PopupWithSubmitButton.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";

import {
    cardTemplate,
    inputFormsInfo,
    cardsArray,
    cardsSectionSelector,
    editProfileBtn,
    editProfileAvatarBtn,
    editProfilePopupSelector,
    editProfileAvatarPopupSelector,
    confirmDeletePopupSelector,
    addCardBtn,
    addCardPopupSelector,
    popupOpenedClass,
    closeButtonSelector,
    formSelector,
    profileTitleSelector,
    profileDescriptionSelector,
    profileAvatarSelector,
    modalTitleInputName,
    modalDescriptionInputName,
    modalProfileUrlInputName,
    modalPlaceInputName,
    modalPlacePicUrlInputName,
    imagePopupSelector,
    modalPictureSelector,
    modalPictureCaptionSelector,
    formValidators,
    basicRequestInfo,
    resetCardsBtn,
    saveProfileInfoBtn,
    saveProfileAvatarBtn,
    saveNewCardBtn
} from "../utils/constants.js"


// ------------- Init Cards Part ---------------

function createCard(cardInfo) {
    const newCard = new Card(cardInfo, cardTemplate, handleImageClick, openConfirmDeletePopup, apiDeleteCard, apiLikeCard);
    return newCard.getCardElement();
}

function handleImageClick(card) {
    imagePopup.open({
        link: card.getCardLink(),
        altInfo: card.getCardAltInfo(),
        name: card.getCardName()
    });
}

// ------------- User Part ---------------

const user = new UserInfo({
    userNameSelector: profileTitleSelector, 
    userDescriptionSelector: profileDescriptionSelector,
    userAvatarSelector: profileAvatarSelector
});

// ------------- Edit Profile Info Part ---------------

function handleSubmitFormProfile(evt, inputValues) {
    saveProfileInfoBtn.textContent = 'Saving...';
    evt.preventDefault();

    const newUserInfo = {
        name: `${inputValues[modalTitleInputName]}`,
        description: `${inputValues[modalDescriptionInputName]}`
    }
    user.setUserInfo(newUserInfo);
    api.setUserInfo(newUserInfo).then((res) => {
        user.setUserInfo(newUserInfo);
    }).catch(err => {
        alert(err);
    }).finally (() => {
        editProfilePopup.close();
    })
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
    saveProfileInfoBtn.textContent = 'Save';
    editProfilePopup.open();
});

// ------------- Edit Profile Avatar Part ---------------

function handleSubmitFormProfileAvatar(evt, inputValues) {
    saveProfileAvatarBtn.textContent = 'Saving...';
    evt.preventDefault();    
    api.setUserAvatar(inputValues[modalProfileUrlInputName]).then(res => {
        console.log(res);
        user.setUserAvatar(inputValues[modalProfileUrlInputName]);
    }).catch (err => {
        alert(err);
    }).finally(() => {
        editProfileAvatarPopup.close();
    });
}

const editProfileAvatarPopup = new PopupWithForm({
    popupSelector: editProfileAvatarPopupSelector, 
    popupOpenedClass, 
    closeButtonSelector
}, formSelector, handleSubmitFormProfileAvatar);

editProfileAvatarPopup.setEventListeners();

editProfileAvatarBtn.addEventListener("click", () => {
    const data = {};
    data[modalProfileUrlInputName] = user.getUserAvatar();
    editProfileAvatarPopup.setInputValues(data);

    formValidators['edit-profile-url-form'].resetValidation();
    formValidators['edit-profile-url-form'].disableSubmitButton();
    saveProfileAvatarBtn.textContent = 'Save';
    editProfileAvatarPopup.open();
});

// ------------- Api Part ---------------

function resetCards() {
    console.log("Cards delete");
    api.deleteAllCards().then(() => {
        api.writeCards(cardsArray);
    });
}

function apiDeleteCard(id) {
    api.deleteCard(id).then(res => {
        console.log(res);
    });
}

function apiLikeCard(id, isLiked) {
    console.log(api.setCardLike(id, isLiked));
}

resetCardsBtn.addEventListener("click", resetCards);

const api = new Api(basicRequestInfo);
const getInitialCardsPromise = api.getInitialCards();
const getUserInfoPromise = api.getUserInfo();
const promises = [getInitialCardsPromise, getUserInfoPromise];
let cardsSection;

Promise.all(promises).then(results => {
    console.log(results);

    //-------------------- Fill cards section with recieved cards ---------------------
    cardsSection = new Section({ items: results[0], renderer: (cardInfo) => {
        const newCardElement = createCard(cardInfo);
        cardsSection.appendItem(newCardElement);    
    }}, cardsSectionSelector);
    cardsSection.renderItems();

    //-------------------- Fill user info with recieved data ---------------------
    user.setUserInfo({name: results[1].name, description: results[1].about});
    user.setUserAvatar(results[1].avatar);
}).catch(err => {
    allert(err);
})



// ------------- Add Card Part ---------------

function handleSubmitFormAddCard(evt, inputValues) {
    saveNewCardBtn.textContent = 'Saving...';
    evt.preventDefault();
    api.writeCard({
        name: inputValues[modalPlaceInputName],
        link: inputValues[modalPlacePicUrlInputName]
    }).then(res => {
        console.log(res);
        const addedCard = createCard(res);
        cardsSection.prependItem(addedCard);
    }).catch(err => {
        alert(err);
    });
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
    saveNewCardBtn.textContent = 'Save';
    addCardPopup.open();
});

// ------------- Delete Card Part ---------------
function handleConfirmDelete(evt, cardToDelete) {
    evt.preventDefault();
    cardToDelete.deleteCard();
    confirmDeletePopup.close();
}

const confirmDeletePopup = new PopupWithSubmitButton({
    popupSelector: confirmDeletePopupSelector,
    popupOpenedClass, 
    closeButtonSelector
}, formSelector, handleConfirmDelete);

confirmDeletePopup.setEventListeners();

function openConfirmDeletePopup(card) {
    confirmDeletePopup.open(card);
}

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