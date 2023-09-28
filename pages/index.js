import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";


const cardsArray = [
    {
        name:   "Yosemite Valley",
        link:   "./images/yosemite.jpg",
        alt:    "Yosemite Valley at sunrise"
    },
    {
        name:   "Lake Louise",
        link:   "./images/lake-louise.jpg",
        alt:    "Lake Louise"
    },
    {
        name:   "Bald Mountains",
        link:   "./images/bald-mountains.jpg",
        alt:    "Bald Mountains"
    },
    {
        name:   "Latemar",
        link:   "./images/latemar.jpg",
        alt:    "Latemar"
    },
    {
        name:   "Vanoise National Park",
        link:   "./images/vanoise.jpg",
        alt:    "Vanoise National park"
    },
    {
        name:   "Lago di Braies",
        link:   "./images/lago.jpg",
        alt:    "Lago di Braies"
    }
];

const editProfileBtn = document.querySelector(".profile__edit-button");
const addCardBtn = document.querySelector(".profile__add-card-button");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardTemplate = document.querySelector("#card").content;
const cards = document.querySelector(".elements__cards");

const editProfileForm = document.forms['edit-profile-form'];
const addCardForm = document.forms['add-card-form'];
const modalCloseBtns = document.querySelectorAll(".modal__close-btn");

const editProfileModalBox = document.querySelector("#edit-profile-modal");
const modalTitleInput = document.querySelector(".modal__input_profile-name");
const modalDescriptionInput = document.querySelector(".modal__input_profile-description");

const addCardModalBox = document.querySelector("#add-card-modal");
const modalPlaceInput = document.querySelector(".modal__input_place-name");
const modalPlacePicUrlInput = document.querySelector(".modal__input_place-pic-url");

const imageModalBox = document.querySelector("#show-pic-modal");
const modalPicture = imageModalBox.querySelector(".modal__picture");
const modalPictureCaption = imageModalBox.querySelector(".modal__picture-caption");

const allModals = Array.from(document.querySelectorAll(".modal"));
let modalOpened = null;

const inputFormsInfo = {
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit-btn",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"                      
}

const handleEscape = (evt) => {
    if (evt.key === "Escape") {
        closeModalBox();
    }
}

const addEscapeListener = () => {
    document.addEventListener("keydown", handleEscape);
};

const removeEscapeListener = () => {
    document.removeEventListener("keydown", handleEscape);
};

function openModalBox(box) {
    box.classList.add("modal_opened");
    modalOpened = box;
    addEscapeListener();    
}

function closeModalBox() {
    modalOpened.classList.remove("modal_opened");
    removeEscapeListener();
    modalOpened = null;    
}

function submitFormProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = modalTitleInput.value;
    profileDescription.textContent = modalDescriptionInput.value;
    closeModalBox();
}

function submitFormAddCard(evt) {
    evt.preventDefault();
    const newCard = new Card({name: `${modalPlaceInput.value}`, link: `${modalPlacePicUrlInput.value}`, alt: `${modalPlaceInput.value}`}, cardTemplate, handleImageClick);
    const addedCard = newCard.getCardElement();
    cards.prepend(addedCard);    
    closeModalBox();
    addCardForm.reset();
}

editProfileBtn.addEventListener("click", () => {
    modalTitleInput.value = profileTitle.textContent;
    modalDescriptionInput.value = profileDescription.textContent;
    editProfileFormValidator.resetValidation();
    if (profileTitle.textContent === modalTitleInput.value && profileDescription.textContent === modalDescriptionInput.value) {
        editProfileFormValidator.disableSubmitButton();
    }
    openModalBox(editProfileModalBox);
});

addCardBtn.addEventListener("click", () => {
    addCardFormValidator.resetValidation();
    openModalBox(addCardModalBox);
});

modalCloseBtns.forEach((btn) => {btn.addEventListener("click", closeModalBox)});

allModals.forEach((modal) => {
    modal.addEventListener("mousedown", (evt) => {
        if (evt.target === evt.currentTarget) {
            closeModalBox();
        }
    });
});

editProfileForm.addEventListener("submit", submitFormProfile);
addCardForm.addEventListener("submit", submitFormAddCard);

const handleImageClick = function(card) {
    console.log(card);
    openModalBox(imageModalBox);
    modalPicture.src = card.getCardLink();
    modalPicture.alt = card.getCardAltInfo();
    modalPictureCaption.textContent = card.getCardName();
}

cardsArray.forEach((cardInfo) => {
    const newCard = new Card(cardInfo, cardTemplate, handleImageClick);
    const newCardElement = newCard.getCardElement();
    cards.append(newCardElement);
});

const addCardFormValidator = new FormValidator(inputFormsInfo, addCardForm);
const editProfileFormValidator = new FormValidator(inputFormsInfo, editProfileForm);
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
