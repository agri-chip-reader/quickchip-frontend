import axios from 'axios';
import { backendBaseUrl } from 'src/utils/const';


//https://api.cs.mrg.com.pe/api-sec01-group04/
export class AuthService {
    baseUrl = backendBaseUrl + "token/generate-token"
    login(persona) {
      console.log(persona.email)

      return axios.post(this.baseUrl, persona, {
        headers: {
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
      }).then((res) => res.data).catch((res) => localStorage.clear());
    }
}
