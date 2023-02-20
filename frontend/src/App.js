import './App.css';
import { Component } from 'react';
import { UsuarioService } from './service/UsuarioServie';
import { format } from 'date-fns'

export class App extends Component{
  constructor(){
    super();
    this.state = {
      id:null,
      usuario: {
        username: null,
        password:null,
        birthdate: null,
        tlf: null
      }
    }
    this.usuarioService = new UsuarioService()
    this.insert = this.insert.bind(this)
    this.eliminar = this.eliminar.bind(this)
  }

  componentDidMount(){
    this.usuarioService.getAll().then(({data}) => {
      this.setState({usuarios:data})})
  
  }

  insert(){
    this.usuarioService.insert(this.state.usuario).then(() => {
      window.location.reload(false)
    })
  }

  eliminar(id){
    this.usuarioService.eliminarUsuario(id).then(() => {
      window.location.reload(false)
    })
  }
  
  render(){
    return (
      <div style={{padding:'5%'}}>
        <h2>Lista de usuarios</h2>
        <table border='1' style={{width:'100%'}}>
          <tbody>
            <tr>
              <th style={{border: '1px solid #ddd',padding: '8px'}}>ID</th>
              <th style={{border: '1px solid #ddd',padding: '8px'}}>Username</th>
              <th style={{border: '1px solid #ddd',padding: '8px'}}>Birthdate</th>
              <th style={{border: '1px solid #ddd',padding: '8px'}}>Telefono</th>
              <th style={{border: '1px solid #ddd',padding: '8px'}}>Eliminar</th>
            </tr>
            {this.state.usuarios?.map(usuario =>
            <tr>
              <td style={{border: '1px solid #ddd',padding: '8px'}}>{usuario.id}</td>
              <td style={{border: '1px solid #ddd',padding: '8px'}}>{usuario.username}</td>
              <td style={{border: '1px solid #ddd',padding: '8px'}}>{format(new Date(usuario.birthdate),'dd/MM/yyyy')}</td>
              <td style={{border: '1px solid #ddd',padding: '8px'}}>{usuario.tlf}</td>
              <td style={{border: '1px solid #ddd',padding: '8px'}}><button style={{width:'100%', color:'red'}} onClick={() => {
                this.eliminar(usuario.id)
              }}>Eliminar</button></td>
            </tr>
          )}
          </tbody>
        </table>
        <br></br>
        <br></br>         
        <h2>Añadir usuario</h2>      
        <br></br> 
        <form onSubmit={this.insert} style={{width:'30%'}}>
          <label>
            Username:
            <input type="text" style={{width:'100%', padding: '8px 13px',margin: '7px 0'}} value={this.state.usuario.username} onChange={(e) => {
            let val = e.target.value;
            this.setState(prevState =>{
            let usuario = Object.assign({}, prevState.usuario);
            usuario.username = val

            return {usuario};
          })}
          } />
          </label>
          <br></br> 
          <br></br> 
          <label>
            Password:
            <input type="text" style={{width:'100%', padding: '8px 13px',margin: '7px 0'}} value={this.state.usuario.password} onChange={(e) => {
            let val = e.target.value;
            this.setState(prevState =>{
            let usuario = Object.assign({}, prevState.usuario);
            usuario.password = val

            return {usuario};
          })}
          } />
          </label>
          <br></br> 
          <br></br> 
          <label>
            Birthdate:
            <input type="date" style={{width:'100%', padding: '8px 13px',margin: '7px 0'}} value={this.state.usuario.birthdate} onChange={(e) => {
            let val = e.target.value;
            this.setState(prevState =>{
            let usuario = Object.assign({}, prevState.usuario);
            usuario.birthdate = val

            return {usuario};
          })}
          } />
          </label>
          <br></br> 
          <br></br> 
          <label>
            Teléfono:
            <input type="number" style={{width:'100%', padding: '8px 13px',margin: '7px 0'}} value={this.state.usuario.tlf} onChange={(e) => {
            let val = e.target.value;
            this.setState(prevState =>{
            let usuario = Object.assign({}, prevState.usuario);
            usuario.tlf = val

            return {usuario};
          })}
          } />
          </label>
          <br></br> 
          <br></br> 
          <input type="submit" value="Crear" style={{width:'30%', 'background-color': '#4CAF50',color: 'white',padding: '14px 20px', margin: '8px 0', border: 'none','border-radius': '4px', cursor: 'pointer'}}/>
      </form>

      </div>
    );
  }

}


export default App;
