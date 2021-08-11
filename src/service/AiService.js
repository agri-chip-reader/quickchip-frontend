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

export class AiService {
  baseUrl = backendBaseUrl + 'ai/';
  iarequest(mode, payloadprediccion) {
    console.log(mode)
    console.log(payloadprediccion)
    return axios.post(this.baseUrl + mode, payloadprediccion, getheader()).then((res) => res.data).catch(e => {
        console.log(e)
    });
  }

}
