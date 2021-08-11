import axios from 'axios';
import { backendBaseUrl } from 'src/utils/const';
function getFromLocalstorage(value){
  return localStorage.getItem(value)
}


//https://api.cs.mrg.com.pe/api-sec01-group04/
function getheader(){
  return {
    headers : {
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Authorization': getFromLocalstorage("token")
    }
  }
}


export class UserService {
    
    baseUrl = backendBaseUrl+'usuarios';

    save(persona, rol, direccion) {
      console.log('in function save(persona) de UserService', persona)
      if(rol=="DIR_DGA") direccion="-"
      return axios.post(this.baseUrl + '/create/'+rol+'/'+direccion, persona,  getheader()).then((res) => res.data).catch((res) => res.data);
    }
    getAll(){
      return axios.get(this.baseUrl+'/getall', getheader()).then((res) =>res.data).catch((res) => console.log(res.data));
    }
    delete(id) {
      console.log('in function delete(id) de UserService', id)
      console.log("id",id)
      return axios.delete(this.baseUrl + '/delete/' + id, getheader()).then((res) => res.data);
    }
    
}
