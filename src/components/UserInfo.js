export default class UserInfo {
    constructor( {userNameSelector, userDescriptionSelector, userAvatarSelector} ) {
        this._userName = document.querySelector(userNameSelector);
        this._userDescription = document.querySelector(userDescriptionSelector);
        this._userAvatar = document.querySelector(userAvatarSelector);
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
    setUserAvatar(avatar) {
        this._userAvatar.src = avatar;
    }
}