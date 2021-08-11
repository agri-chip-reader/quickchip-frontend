class Auth {
  constructor() {
    this.authenticated = false;
    this.token = '';
  }

  settoken(token) {
    this.token = token;
  }

  login(cb) {
    this.authenticated = true;
    cb();
  }

  logout(cb) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
