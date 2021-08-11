import axios from 'axios';

import { UtecService } from "src/service/UtecService";
import React, { Component } from 'react';
import { AuthorizationService } from "src/service/AuthorizationService";
import { AiService } from "src/service/AiService";
import Loader from "react-loader-spinner";
import { Select, MenuItem } from '@material-ui/core';
import Prediction from "./Prediction";
import { Button } from 'primereact/button';
import { backendBaseUrl } from "src/utils/const";

export default class DashboardContent extends Component {

    constructor() {
        super();
        this.state = {
            name: 'React',
            urls: null
        }
        this.utecservice = new UtecService();
        this.aiservice = new AiService();
        this.authservice = new AuthorizationService();
    }

    loader(text) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: '30px' }}>
                <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={60}
                    width={60}
                />
                <h3>{text}</h3>
            </div>
        )
    }

    allImagesLoaded() {
        return this.state.urls != null
    }

    componentDidMount() {
        axios.get(backendBaseUrl+"view/all",{
            headers: {
              'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
          }).then((res) => this.setState({urls: res.data}))
    }
    render() {
        return (
            <div style={{ width: '80%', margin: '0 auto', marginTop: '20px' }}>
                { 
                    this.allImagesLoaded()?
                        this.state.urls.map(url => <div><img src={url}/></div>):
                        this.loader("Cargando imágenes") 
                }
            </div>
        )
    }
}