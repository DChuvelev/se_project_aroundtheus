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

function openModalBox(box) {
    box.classList.add("modal_opened");
}

function closeModalBox(evt) {
    evt.target.closest(".modal").classList.remove("modal_opened");
}

function submitFormProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = modalTitleInput.value;
    profileDescription.textContent = modalDescriptionInput.value;
    closeModalBox(evt);
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
    closeModalBox(evt);
    modalPlaceInput.value = '';
    modalPlacePicUrlInput.value = '';
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

    const cardImage = resultCard.querySelector(".card__image");
    cardImage.addEventListener("click", (evt) => {
        openModalBox(imageModalBox);
        modalPicture.src = evt.target.src;
        modalPicture.alt = evt.target.alt;
        modalPictureCaption.textContent = evt.target.closest(".card").querySelector(".card__caption").textContent;
    });

    return resultCard;
}

editProfileBtn.addEventListener("click", () => {
    openModalBox(editProfileModalBox);
    modalTitleInput.value = profileTitle.textContent;
    modalDescriptionInput.value = profileDescription.textContent;
});

addCardBtn.addEventListener("click", () => {
    openModalBox(addCardModalBox);
});

modalCloseBtns.forEach((btn) => {btn.addEventListener("click", closeModalBox)});

editProfileForm.addEventListener("submit", submitFormProfile);
addCardForm.addEventListener("submit", submitFormAddCard);

cardsArray.forEach((card) => {
    const addedCard = getCardElement(card)
    cards.append(addedCard);
});