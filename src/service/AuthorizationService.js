import axios from 'axios';
import { backendBaseUrl } from 'src/utils/const';
function getFromLocalstorage(value){
  return localStorage.getItem(value);
}

function getheader(){
  return {
    headers : {
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Authorization': getFromLocalstorage("token")
    }
  }
}
//https://api.cs.mrg.com.pe/api-sec01-group04/


export class AuthorizationService {
    baseUrl = backendBaseUrl + 'authorization'
    async checkiflogged(){
      console.log("checkiflogged")    
      return axios.get(this.baseUrl + '/checkiflogged', getheader()).then((res) =>res.data).catch((e) => {return false});
    }

    async requesttobackend(option){
      return axios.get(this.baseUrl + '/validate/'+option, getheader()).then((res) =>res.data).catch((res) => alert(res));
    }
    
    async checkifuser(){
      return axios.get(this.baseUrl + '/checkifuser', getheader()).then((res) =>res.data).catch((res) => alert(e));
    }

    async checkifdiruser(){
        return axios.get(this.baseUrl + '/checkifdiruser', getheader()).then((res) =>res.data).catch((res) => alert(e));
    }

    async checkifdgauser(){
      return axios.get(this.baseUrl + '/checkifdgauser', getheader()).then((res) =>res.data).catch((res) => console.log(res.data));
    }

    async checkifadminuser(){
      console.log("checkifadminuser")
      return axios.get(this.baseUrl + '/checkifadminuser', getheader()).then((res) =>res.data).catch((res) => console.log(res.data));
    }

    async checkifadmindiruser(){
        return axios.get(this.baseUrl + '/checkifadmindiruser', getheader()).then((res) =>res.data).catch((res) => console.log(res.data));
    }
    async checkifuserbelongstodirec(){
      return axios.get(this.baseUrl + '/checkifuserbelongstodirec', getheader()).then((res) =>res.data).catch((res) => console.log(res.data));
  }
    async checkifsysadminuser(){
        return axios.get(this.baseUrl + '/checkifsysadminuser', getheader()).then((res) =>res.data).catch((res) => console.log(res.data));
    }
}
