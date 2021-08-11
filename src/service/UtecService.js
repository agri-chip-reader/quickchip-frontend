import axios from 'axios';
import { backendBaseUrl } from 'src/utils/const';

function getFromLocalstorage(value) {
  return localStorage.getItem(value);
}

function getheader() {
  return {
    headers: {
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Authorization': getFromLocalstorage("token")
    }
  }
}

//https://api.cs.mrg.com.pe/api-sec01-group04/

export class UtecService {
  baseUrl =  backendBaseUrl+'testc/';
  async requestUtec(mode, info=false) {
    let url = this.baseUrl + mode ;
    url = mode == 'directions'? url : url + "/"+ info;
    
    return axios.get(url , getheader()).then((res) => res.data).catch( (e) => {throw(e)});
  }
}
