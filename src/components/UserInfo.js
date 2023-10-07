export default class UserInfo {
    constructor( {userNameSelector, userDescriptionSelector} ) {
        this._userName = document.querySelector(userNameSelector);
        this._userDescription = document.querySelector(userDescriptionSelector);
    }
    getUserInfo() {
        const userInfo = {};
        userInfo.name = this._userName.textContent;
        userInfo.description = this._userDescription.textContent;
        return userInfo;
    }
    setUserInfo({ name, description }) {
        this._userName.textContent = name;
        this._userDescription.textContent = description;
    }
}