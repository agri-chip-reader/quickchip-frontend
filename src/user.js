class Client {
  constructor() {
    this.data = {
      'role': ''
    };
  }

  getRole(){
    return this.data.role;
  }
}
  
export default new Client();
  