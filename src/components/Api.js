//const config = {}; //i don't really see that as a necessity at this point

export default class Api {
  constructor() {
    this._baseUrl = "https://around-api.en.tripleten-services.com/v1";
    this._headers = {
      authorization: "5bd639c7-c1c3-496d-947f-3773995c6d1b",
      "Content-Type": "application/json",
    };
  }

  _checkResponse(res) {
    //gets called in each method in .then
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  loadUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(this._baseUrl, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // other methods for working with the API
}

//is this supposed to be in index.js?
/*const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5bd639c7-c1c3-496d-947f-3773995c6d1b",
    "Content-Type": "application/json",
  },
});*/

//I got it why they want me to use options in Api constructor - check it later
