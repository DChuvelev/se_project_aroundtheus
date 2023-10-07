const YosemiteImage = new URL("../images/yosemite.jpg", import.meta.url);
const LouiseImage = new URL("../images/lake-louise.jpg", import.meta.url);
const BaldImage = new URL("../images/bald-mountains.jpg", import.meta.url);
const LatemarImage = new URL("../images/latemar.jpg", import.meta.url);
const VanoiseImage = new URL("../images/vanoise.jpg", import.meta.url);
const BraiesImage = new URL("../images/lago.jpg", import.meta.url);

export const cardsArray = [
    {
        name:   "Yosemite Valley",
        link:   YosemiteImage,
        alt:    "Yosemite Valley at sunrise"
    },
    {
        name:   "Lake Louise",
        link:   LouiseImage,
        alt:    "Lake Louise"
    },
    {
        name:   "Bald Mountains",
        link:   BaldImage,
        alt:    "Bald Mountains"
    },
    {
        name:   "Latemar",
        link:   LatemarImage,
        alt:    "Latemar"
    },
    {
        name:   "Vanoise National Park",
        link:   VanoiseImage,
        alt:    "Vanoise National park"
    },
    {
        name:   "Lago di Braies",
        link:   BraiesImage,
        alt:    "Lago di Braies"
    }
];

export const editProfilePopupSelector = "#edit-profile-modal";
export const addCardPopupSelector = "#add-card-modal";
export const imagePopupSelector = "#show-pic-modal";
export const modalPictureSelector = ".modal__picture";
export const modalPictureCaptionSelector = ".modal__picture-caption";

export const formValidators = {};

export const inputFormsInfo = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit-btn",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"                      
}

export const popupOpenedClass = "modal_opened";
export const formSelector = ".modal__form";

export const profileTitleSelector = ".profile__title";
export const profileDescriptionSelector = ".profile__description";

export const modalTitleInputName = document.querySelector(".modal__input_profile-name").name;
export const modalDescriptionInputName = document.querySelector(".modal__input_profile-description").name;
export const modalPlaceInputName = document.querySelector(".modal__input_place-name").name;
export const modalPlacePicUrlInputName = document.querySelector(".modal__input_place-pic-url").name;

export const addCardForm = document.forms['add-card-form'];
export const editProfileBtn = document.querySelector(".profile__edit-button");
export const addCardBtn = document.querySelector(".profile__add-card-button");

export const cardTemplate = document.querySelector("#card").content;
export const cardsSectionSelector = ".elements__cards";
export const closeButtonSelector = ".modal__close-btn";
