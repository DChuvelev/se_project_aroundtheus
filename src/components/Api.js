export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        console.log(this._baseUrl, this._headers);
    }

    _request(url, reqObj, errMsg) {
        return fetch(url, reqObj).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`${errMsg} Error number: ${res.status}`);
            }    
        })
    }

    getInitialCards() {
        return this._request(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: "GET"
        }, 'Error loading cards from server.');
    }

    getUserInfo() {
        return this._request(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: "GET"
        }, 'Error getting user info from server.');
    }

    setUserInfo({name, description}) {
        return this._request(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({
                name,
                about: description
            })
        }, 'Error setting user info from server.');
    }

    setUserAvatar(avatarUrl) {
        return this._request(`${this._baseUrl}/users/me/avatar`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({
                avatar: avatarUrl
            })
        }, 'Error updataing user avatar. Possibly you typed in wrong URL.');
    }

    deleteCard(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}`, {
            headers: this._headers,
            method: "DELETE"
        }, 'Error deleteng card from server. Try again later.');
    }

    writeCard(cardInfo) {
        return this._request(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify(cardInfo)
        }, 'Error posting card to server. Possibly you typed in wrong URL.');
    }

    setCardLike(cardId, isLiked) {
        return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
            headers: this._headers,
            method: `${isLiked ? "PUT" : "DELETE"}`,
        }, 'Error writing like.');
    }

//  The folowing 2 functions are for technical usage only - they let me reset cards on the server to 6 default cards from the original array.

    deleteAllCards() {
        const promises = [];
        this.getInitialCards().then(res => {
            res.forEach(item  => {
                promises.push(this.deleteCard(item._id));
            })
        })
        return Promise.all(promises);
    }    
    writeCards(cardsArray) {
        const promises = [];
        cardsArray.forEach(card => {
            promises.push(this.writeCard(card));
        });
        return Promise.all(promises).then(() => `Successfully posted ${promises.length} cards.`);
    }
}