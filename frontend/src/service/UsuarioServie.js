import axios from 'axios';

export class UsuarioService{

    baseUrl="http://localhost:8080/usuarios/";

    getAll(){
        return axios.get(this.baseUrl);
    }

    insert(usuario){
        return axios.post(this.baseUrl,usuario);
    }

    eliminarUsuario(id){
        return axios.delete(this.baseUrl+id)
    }
}