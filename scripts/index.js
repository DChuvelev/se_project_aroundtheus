const initialCards = [
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

const modalForm = document.querySelector(".modal__form");
const modalTitleInput = document.querySelector(".modal__input_profile-name");
const modalDescriptionInput = document.querySelector(".modal__input_profile-description");
const modalCloseBtns = document.querySelectorAll(".modal__close-btn");
const modalSubmitBtn = document.querySelector(".modal__submit-btn");
const editProfileModalBox = document.querySelector(".modal__container__edit-profile");
const addCardModalBox = document.querySelector(".modal__container__add-card");


function openEditProfileModalBox() {
    editProfileModalBox.parentElement.classList.add("modal_opened");    //Darken background
    editProfileModalBox.classList.add("modal__container_opened");   //Open box
    modalTitleInput.value = profileTitle.textContent;
    modalDescriptionInput.value = profileDescription.textContent;
}
function openAddCardModalBox() {
    addCardModalBox.parentElement.classList.add("modal_opened");    //Darken background
    addCardModalBox.classList.add("modal__container_opened");   //Open box
    // modalTitleInput.value = profileTitle.textContent;
    // modalDescriptionInput.value = profileDescription.textContent;
}

function closeModalBox(evt) {
    evt.target.parentElement.classList.remove("modal__container_opened");   //Close box
    evt.target.parentElement.parentElement.classList.remove("modal_opened");   //Remove dark background
}
function submitFormProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = modalTitleInput.value;
    profileDescription.textContent = modalDescriptionInput.value;
    closeModalBox();
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
modalCloseBtns.forEach((btn) => {addEventListener("click", closeModalBox)});
modalForm.addEventListener("submit", submitFormProfile);

initialCards.forEach ((card) => {
    cards.append(getCardElement(card));
});