export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        console.log(this._baseUrl, this._headers);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: "GET"
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error loading cards from server. Error number: ${res.status}`);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: "GET"
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error getting user info from server. Error number: ${res.status}`);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    setUserInfo({name, description}) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({
                name,
                about: description
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error setting user info from server. Error number: ${res.status}`);
            }
        }).then(res => {
            console.log("User info updated.");
            return res;
        })
    }

    setUserAvatar(avatarUrl) {
        console.log(avatarUrl);
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({
                avatar: avatarUrl
            })
        })
        .then(res => {
            // console.log(res);
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error updataing user avatar. Error number: ${res.status}. Possibly you typed in wrong URL.`);
            }
        }).then(res => {
            console.log("User avatar updated successfully");
            return res;
        })
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            headers: this._headers,
            method: "DELETE"
        }).then(res => {
            if (res.ok) {
                console.log(`Card with ID: ${cardId} successfully deleted from server`);
                return res.json();
            } else {
                return Promise.reject(`Error deleteng card from server. Error number: ${res.status}`);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    deleteAllCards() {
        const promises = [];
        this.getInitialCards().then(res => {
            res.forEach(item  => {
                promises.push(this.deleteCard(item._id));
            })
        })
        return Promise.all(promises);
    }

    writeCard(cardInfo) {
        console.log(cardInfo);
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify(cardInfo)
        })
        .then(res => {
            // console.log(res);
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error posting card to server. Error number: ${res.status}. Possibly you typed in wrong URL.`);
            }
        }).then(res => {
            console.log(`Card with ID: ${res._id} successfully posted to server`);
            return res;
        })
    }

    writeCards(cardsArray) {
        const promises = [];
        cardsArray.forEach(card => {
            promises.push(this.writeCard(card));
        });
        return Promise.all(promises).then(() => `Successfully posted ${promises.length} cards.`);
    }

    setCardLike(cardId, isLiked) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            headers: this._headers,
            method: `${isLiked ? "PUT" : "DELETE"}`,
        })
        .then(res => {
            console.log(res);
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Error writing like. Error number: ${res.status}`);
            }
        }).then(() => {
            console.log("Like set with success");
        }).catch(err => {
            console.log(err);
        })    
    }
}