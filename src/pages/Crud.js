import './App.css';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';


import { Growl } from 'primereact/growl';

import React, { Component } from 'react';
import { UserService } from '../service/UserService';

import { AuthorizationService } from '../service/AuthorizationService';
import { Select, Input, MenuItem } from '@material-ui/core';
import { UtecService } from 'src/service/UtecService';

const authservice = new AuthorizationService();
const utecservice = new UtecService()

export default class Crud extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      direcciones: [],
      persona: {
        id: null,
        nombre: null,
        email: null,
        direccion: "",
        rol: null
      },
      selectedPersona: {

      }
    };
    this.visible = false
    this.items = [
      {
        label: 'Nuevo',
        icon: 'pi pi-fw pi-plus',
        command: () => { this.showSaveDialog(); }
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-fw pi-trash',
        command: () => { this.delete(); }
      }
    ];
    this.personaService = new UserService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
  }

  componentDidMount() {
    this.personaService.getAll().then(data => this.setState({ personas: data }))
    authservice.checkifsysadminuser().then((data) => this.setState({ sysadmin: data }));
    authservice.checkifadmindiruser().then((data) => this.setState({ adminuser: data }));
    utecservice.requestUtec('directions').then((data) => this.setState({ direcciones: data }));
  }

  save() {
    if (!this.visible){
      this.state.persona.direccion = "-"
      this.state.persona.rol ="DIR_USER"
    }
    this.personaService.save(this.state.persona, this.state.persona.rol, this.state.persona.direccion).then(() => {
      this.setState({
        visible: false,
        persona: {
          id: "",
          nombre: "",
          email: "",
          direccion: "",
          rol: ""
        }
      });
      this.growl.show({ severity: 'success', summary: 'Atención!', detail: 'Se guardó el registro correctamente.' });
      this.personaService.getAll().then(data => this.setState({ personas: data }))
    })
  }

  delete() {
    if (window.confirm("¿Realmente desea eliminar el registro?")) {
      this.personaService.delete(this.state.selectedPersona.id).then(() => {
        this.growl.show({ severity: 'success', summary: 'Atención!', detail: 'Se eliminó el registro correctamente.' });
        this.personaService.getAll().then(response => this.setState({ personas: response }))
      });
    }
  }
  render() {
    return (
      <div style={{ width: '80%', margin: '0 auto', marginTop: '20px' }}>
        <Menubar model={this.items} />
        <br />
        <Panel header="Usuarios">
          <DataTable value={this.state.personas} paginator={true} rows="4" selectionMode="single" selection={this.state.selectedPersona} onSelectionChange={e => this.setState({ selectedPersona: e.value })}>
            <Column field="id" header="ID"></Column>
            <Column field="nombre" header="Nombre"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="rol" header="Rol"></Column>
          </DataTable>
        </Panel>
        <Dialog header="Crear persona" visible={this.state.visible} style={{ width: '400px' }} footer={this.footer} modal={true} onHide={() => this.setState({ visible: false })}>
          <form id="persona-form">
            <span className="p-float-label">
              <InputText value={this.state.persona.email} style={{ width: '100%' }} id="email" onChange={(e) => {
                let val = e.target.value;
                this.setState(prevState => {
                  let persona = Object.assign({}, prevState.persona);
                  persona.email = val
                  return { persona };
                })
              }
              } />
              <label htmlFor="email">Correo Utec</label>
            </span>
            <br />
            {
              this.state.sysadmin ? (<div>

                <span className="p-float-label">Rol
                  <Select
                    name="name"
                    value="aaa"
                    onChange={(e) => {
                      let val = e.target.value;
                      this.setState(prevState => {
                        let persona = Object.assign({}, prevState.persona);
                        persona.rol = val
                        return { persona };
                      });
                      let if_ = true
                      if (val == "SYS_ADMIN" || val == "DIR_DGA") if_ = false
                      this.visible = if_

                    }
                    }
                    input={<Input id="name" />}
                  >
                    <MenuItem value="SYS_ADMIN">Administrador de Sistema</MenuItem>
                    <MenuItem value="DIR_ADMIN">Administrador de Dirección</MenuItem>
                    <MenuItem value="DIR_DGA">Director General Académico</MenuItem>
                    <MenuItem value="DIR_USER">Usuario de Dirección</MenuItem>
                  </Select>
                </span>
                <br />

              </div>
              ) : ''
            }
            {
              this.visible ? <div>
                <span className="p-float-label">
                  <Select
                    onChange={(e) => {
                      let val = e.target.value;
                      this.setState(prevState => {
                        let persona = Object.assign({}, prevState.persona);
                        persona.direccion = val
                        return { persona };
                      })
                    }
                    } >
                    {this.state.direcciones.map(val =>
                      <MenuItem value={val.id_direccion}>{val.nombre_direccion}</MenuItem>
                    )
                    }
                  </Select>
                  <label htmlFor="direccion">Dirección</label>
                </span>
              </div> : ''
            }
          </form>
        </Dialog>
        <Growl ref={(el) => this.growl = el} />
      </div>
    );
  }

  showSaveDialog() {
    this.setState({
      visible: true,
      persona: {
        id: "",
        nombre: "",
        email: "",
        direccion: "",
        rol: ""
      }
    });
    document.getElementById('persona-form').reset();
  }

  showEditDialog() {
    this.setState({
      visible: true,
      persona: {
        id: this.state.selectedPersona.id,
        nombre: this.state.selectedPersona.nombre,
        email: this.state.selectedPersona.email,
        direccion: this.state.selectedPersona.direccion,
        rol: this.state.selectedPersona.rol
      }
    })
  }

}
