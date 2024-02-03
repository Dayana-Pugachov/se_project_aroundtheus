export default class UserInfo {
  constructor({
    profileNameSelector,
    profileDescriptionSelector,
    profileAvatarSelector,
  }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(
      profileDescriptionSelector
    );
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    };
  }

  setUserInfo(name, description, avatar) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = description;
    this._profileAvatar.src = avatar;
  }
}
