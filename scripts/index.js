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
const zero = 0;

const modalBackground = document.querySelector(".modal");

const modalForms = document.querySelectorAll(".modal__form");
const modalCloseBtns = document.querySelectorAll(".modal__close-btn");

const editProfileModalBox = document.querySelector(".modal__container_edit-profile");
const modalTitleInput = document.querySelector(".modal__input_profile-name");
const modalDescriptionInput = document.querySelector(".modal__input_profile-description");

const addCardModalBox = document.querySelector(".modal__container_add-card");
const modalPlaceInput = document.querySelector(".modal__input_place-name");
const modalPlacePicUrlInput = document.querySelector(".modal__input_place-pic-url");

const imageModalBox = document.querySelector(".modal__container_picture");
const modalPicture = imageModalBox.querySelector(".modal__picture");
const modalPictureCaption = imageModalBox.querySelector(".modal__picture-caption");

function openEditProfileModalBox() {
    modalBackground.classList.add("modal_opened");    //Darken background
    editProfileModalBox.classList.add("modal__container_opened");   //Open box
    modalTitleInput.value = profileTitle.textContent;
    modalDescriptionInput.value = profileDescription.textContent;
}

function openAddCardModalBox() {
    modalPlaceInput.value = '';
    modalPlacePicUrlInput.value = '';
    modalBackground.classList.add("modal_opened");    //Darken background
    addCardModalBox.classList.add("modal__container_opened");   //Open box
}

function openImageModalBox(evt) {
    modalBackground.classList.add("modal_opened");    //Darken background
    imageModalBox.classList.add("modal__container_opened");   //Open box
    modalPicture.src = evt.target.src;
    modalPicture.alt = evt.target.alt;
    modalPictureCaption.textContent = evt.target.closest(".card").querySelector(".card__caption").textContent;
}

function closeModalBox(evt) {
    evt.target.closest(".modal__container").classList.remove("modal__container_opened");   //Close box
    modalBackground.classList.remove("modal_opened");   //Remove dark background
}

function submitFormProfile() {
    profileTitle.textContent = modalTitleInput.value;
    profileDescription.textContent = modalDescriptionInput.value;
}

function likeCard(evt) {
    evt.target.classList.toggle("card__button-heart_active");
}

function deleteCard(evt) {
    evt.target.closest(".card").remove();
}

function addCardToPage(card) {
    addedCard = getCardElement(card)
    cards.append(addedCard);

    const cardLikeBtn = addedCard.querySelector(".card__button-heart");
    cardLikeBtn.addEventListener("click", likeCard);

    const cardDeleteBtn = addedCard.querySelector(".card__button-delete");
    cardDeleteBtn.addEventListener("click", deleteCard);

    const cardImage = addedCard.querySelector(".card__image");
    cardImage.addEventListener("click", openImageModalBox);
}

function submitFormAddCard() {
    const newCard = {name: `${modalPlaceInput.value}`, link: `${modalPlacePicUrlInput.value}`, alt: `${modalPlaceInput.value}`};
    addCardToPage(newCard);
}

function submitForm(evt) {
    evt.preventDefault();
    switch (evt.target.parentElement.classList[1]) {
        case 'modal__container_edit-profile': 
            submitFormProfile();
            break;
        case 'modal__container_add-card': 
            submitFormAddCard();
            break;
    }
    closeModalBox(evt);
}

function getCardElement(cardData) {
    const resultCard = cardTemplate.querySelector(".card").cloneNode(true);
    resultCard.querySelector(".card__caption").textContent = cardData.name;
    const resultCardImage = resultCard.querySelector(".card__image");
    resultCardImage.src = cardData.link;
    resultCardImage.alt = cardData.alt;
    return resultCard;
}

editProfileBtn.addEventListener("click", openEditProfileModalBox);
addCardBtn.addEventListener("click", openAddCardModalBox);
modalCloseBtns.forEach((btn) => {btn.addEventListener("click", closeModalBox)});
modalForms.forEach((form) => {form.addEventListener("submit", submitForm)});
cardsArray.forEach ((card) => {addCardToPage(card);});