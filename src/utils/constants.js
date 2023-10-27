
export const cardsArray = [
    {
        name:   "Yosemite Valley",
        link:   "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    },
    {
        name:   "Lake Louise",
        link:   "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    },
    {
        name:   "Bald Mountains",
        link:   "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    },
    {
        name:   "Latemar",
        link:   "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    },
    {
        name:   "Vanoise National Park",
        link:   "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    },
    {
        name:   "Lago di Braies",
        link:   "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    }
];

export const editProfilePopupSelector = "#edit-profile-modal";
export const confirmDeletePopupSelector = "#confirm-delete-modal";
export const confirmDeleteButtonSelector = document.querySelector(".modal__confirm-delete-btn");
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
export const profileAvatarSelector = ".profile__image";

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

export const resetCardsBtn = document.querySelector(".header__reset-btn");
export const getCardsBtn = document.querySelector(".header__get-btn");

const token = {
    "user": {
        "name": "Jacques Cousteau",
        "about": "Sailor, researcher",
        "avatar": "https://practicum-content.s3.us-west-1.amazonaws.com/frontend-developer/common/avatar.jpg",
        "_id": "7df61b875a56a7805df20a6b"
    },
    "token":"16b2631d-863b-4a4a-821d-14e3c93f8b71"
};

export const basicRequestInfo = {
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
      authorization: "16b2631d-863b-4a4a-821d-14e3c93f8b71",
      "Content-Type": "application/json"
    }
};