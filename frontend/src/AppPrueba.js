import './App.css';
import { Component } from 'react';
import { UsuarioService } from './service/UsuarioServie';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova/theme.css'

export class App extends Component{
  constructor(){
    super();
    this.state = {
      visible : false,
      usuario: {
        username: null,
        password:null,
        birthdate: null,
        tlf: null
      }
    };
    this.items = [
      {
        label: 'Añadir Usuario',
        command: () => {this.showModal()} 
      }
    ]
    this.usuarioService = new UsuarioService();
    this.insert = this.insert.bind(this);
    this.footer = (
      <div>
        <Button label='Guardar' onClick={this.insert}></Button>
      </div>
    );
  
  }

  componentDidMount(){
    this.usuarioService.getAll().then(({data}) => {
      this.setState({usuarios:data})})
  
  }

  insert(){
    this.usuarioService.insert(this.state.usuario).then(() => {
      this.setState({visible:false})
      window.location.reload(false)
    })
    
  }

  render(){
    return (
      <div>
        <DataTable value={this.state.usuarios}>
          <Column field='id' header='ID'></Column>
          <Column field='username' header='Username'></Column>
          <Column field='password' header='Password'></Column>
          <Column field='birthdate' header='Birthdate'></Column>
          <Column field='tlf' header='Telefono'></Column>
        </DataTable>
        <Menubar model={this.items}></Menubar>
        <Dialog header='Crear Usuario' visible = {this.state.visible} modal={true} footer={this.footer} style={{width:'60%'}} onHide={() => this.setState({visible:false})}>
          <label htmlFor="username">Username  </label>
          <InputText value = {this.state.usuario.username} id = 'username' onChange={(e) => {
            let val = e.target.value;
            this.setState(prevState =>{
              let usuario = Object.assign({}, prevState.usuario)
              usuario.username = val

              return {usuario};
          })}
          }/>
          <br></br>
          <br></br>
          <label htmlFor="password">Password  </label>
          <InputText value = {this.state.usuario.password} id = 'password' onChange={(e) => {
            let val = e.target.value;
            this.setState(prevState =>{
              let usuario = Object.assign({}, prevState.usuario);
              usuario.password = val

              return {usuario};
          })}
          }/>
          <br></br>
          <br></br>
          <label htmlFor="birthdate">Birthdate  </label>
          <InputText value = {this.state.usuario.birthdate} id = 'birthdate' onChange={(e) => {
            let val = e.target.value;
            this.setState(prevState =>{
            let usuario = Object.assign({}, prevState.usuario);
            usuario.birthdate = val

            return {usuario};
          })}
          }/>
          <br></br>
          <br></br>
          <label htmlFor="tlf">Telefono  </label>
          <InputText value = {this.state.usuario.telephone} id = 'tlf' onChange={(e) => {
            let val = e.target.value;
            this.setState(prevState =>{
            let usuario = Object.assign({}, prevState.usuario);
            usuario.tlf = val

            return {usuario};
          })}
          }/>
        </Dialog>
        
      </div>
    );
  }

  showModal(){
    this.setState({
      visible: true
    })
  }

}


export default App;
