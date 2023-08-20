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

const editBtn = document.querySelector(".profile__edit-button");
const modalCloseBtn = document.querySelector(".modal__close-btn");
const modalSubmitBtn = document.querySelector(".modal__submit-btn");
const modalBox = document.querySelector(".modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const modalTitleInput = document.querySelector(".modal__input_profile-name");
const modalDescriptionInput = document.querySelector(".modal__input_profile-description");
const cardTemplate = document.querySelector("#card").content;
const modalForm = document.querySelector(".modal__form");
const cards = document.querySelector(".elements__cards");
const zero = 0;


function openModalBox() {
    modalBox.classList.add("modal_opened");    
    modalTitleInput.value = profileTitle.textContent;
    modalDescriptionInput.value = profileDescription.textContent;
}
function closeModalBox() {
    modalBox.classList.remove("modal_opened");
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

editBtn.addEventListener("click", openModalBox);
modalCloseBtn.addEventListener("click", closeModalBox);
modalForm.addEventListener("submit", submitFormProfile);

for (i = zero; i < initialCards.length; i++) {
    cards.append(getCardElement(initialCards[i]));
}