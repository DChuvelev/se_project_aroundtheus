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
let cardTemplate = document.querySelector("#card").content;


function modalOpen() {
    modalBox.classList.add("modal_opened");    
    modalTitleInput.value = profileTitle.textContent;
    modalDescriptionInput.value = profileDescription.textContent;
}
function modalClose() {
    modalBox.classList.remove("modal_opened");
}
function modalSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = modalTitleInput.value;
    profileDescription.textContent = modalDescriptionInput.value;
    modalClose();
}
function getCardElement(cardData) {
    console.log(cardData);
    let resultCard = cardTemplate.querySelector(".card").cloneNode(true);
    resultCard.querySelector(".card__caption").textContent = cardData.name;
    resultCard.querySelector(".card__image").src = cardData.link;
    resultCard.querySelector(".card__image").alt = cardData.alt;
    return resultCard;
}

editBtn.addEventListener("click", modalOpen);
modalCloseBtn.addEventListener("click", modalClose);
modalSubmitBtn.addEventListener("click", modalSubmit);

for (i = 0; i < initialCards.length; i++) {
    document.querySelector(".elements__cards").append(getCardElement(initialCards[i]));
}