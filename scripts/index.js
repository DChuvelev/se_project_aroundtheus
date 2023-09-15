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
var modalOpened = null;

const escapeListener = (evt) => {
    if (evt.key === "Escape") {
        closeModalBox(modalOpened);
    }
}

const addEscapeListener = () => {
    document.addEventListener("keydown", escapeListener);
};

const removeEscapeListener = () => {
    document.removeEventListener("keydown", escapeListener);
};

function openModalBox(box) {
    resetValidation(box);
    box.classList.add("modal_opened");
    modalOpened = box;
    addEscapeListener();    
}

function closeModalBox(box) {
    box.classList.remove("modal_opened");
    removeEscapeListener();
    modalOpened = null;    
}

function closeClosestModal(evt) {
    closeModalBox(evt.target.closest(".modal"));
}

function submitFormProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = modalTitleInput.value;
    profileDescription.textContent = modalDescriptionInput.value;
    closeClosestModal(evt);
}

function likeCard(evt) {
    evt.target.classList.toggle("card__button-heart_active");
}

function deleteCard(evt) {
    evt.target.closest(".card").remove();
}

function submitFormAddCard(evt) {
    evt.preventDefault();
    const newCard = {name: `${modalPlaceInput.value}`, link: `${modalPlacePicUrlInput.value}`, alt: `${modalPlaceInput.value}`};
    const addedCard = getCardElement(newCard)
    cards.prepend(addedCard);    
    closeClosestModal(evt);
    addCardForm.reset();
}

function getCardElement(cardData) {
    const resultCard = cardTemplate.querySelector(".card").cloneNode(true);
    resultCard.querySelector(".card__caption").textContent = cardData.name;
    const resultCardImage = resultCard.querySelector(".card__image");
    resultCardImage.src = cardData.link;
    resultCardImage.alt = cardData.alt;

    const cardLikeBtn = resultCard.querySelector(".card__button-heart");
    cardLikeBtn.addEventListener("click", likeCard);

    const cardDeleteBtn = resultCard.querySelector(".card__button-delete");
    cardDeleteBtn.addEventListener("click", deleteCard);

    resultCardImage.addEventListener("click", () => {
        openModalBox(imageModalBox);
        modalPicture.src = cardData.link;
        modalPicture.alt = cardData.alt;
        modalPictureCaption.textContent = cardData.name;
    });

    return resultCard;
}

editProfileBtn.addEventListener("click", () => {
    modalTitleInput.value = profileTitle.textContent;
    modalDescriptionInput.value = profileDescription.textContent;
    openModalBox(editProfileModalBox);
});

addCardBtn.addEventListener("click", () => {
    openModalBox(addCardModalBox);
});

modalCloseBtns.forEach((btn) => {btn.addEventListener("click", closeClosestModal)});

allModals.forEach((modal) => {
    modal.addEventListener("click", (evt) => {
        if (evt.target === evt.currentTarget) {
            closeClosestModal(evt);
        }
    });
});

editProfileForm.addEventListener("submit", submitFormProfile);
addCardForm.addEventListener("submit", submitFormAddCard);

cardsArray.forEach((card) => {
    const addedCard = getCardElement(card)
    cards.append(addedCard);
});