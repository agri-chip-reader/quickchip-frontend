import React, { Component } from 'react';
import { AuthService } from 'src/service/AuthService';
import { AuthorizationService } from 'src/service/AuthorizationService';
import loadingComponent from 'src/utils/loading';

class ViewsGuard extends Component {

    constructor({ option, component, componentDeny }) {
        super();
        this.state = {
            allowed: null,
            loading: true,
        }
        this.option = option;
        this.component = component;
        this.componentDeny = componentDeny
        this.authservice = new AuthService()
        this.authorizationService = new AuthorizationService()
    }
    handleResponse(response){ 
        console.log("response", response)
        this.setState({ allowed: response })
        this.setState({ loading: false }) 
    }

    handleViewOption(){
        switch(this.option){
            case 1:
                this.authorizationService.checkiflogged().then((response) => this.handleResponse(response));
                break;
            case 2:
                console.log("2")
                this.authorizationService.checkifadminuser().then((response) => this.handleResponse(response));
                break;
            default:
                return
        }
    }
    redirect(){
        console.log(this.state.allowed)
        if(this.state.allowed) return this.component
        return this.componentDeny
    }
    componentDidMount(){
        console.log(this.option)
        this.handleViewOption()
    }
    
    render() {
        return (
            this.state.loading? loadingComponent('Cargando elementos...'): this.redirect()
      )
    }

}

export default function ({ option, component, componentDeny }) {

    return <ViewsGuard option={option} component={component} componentDeny={componentDeny} />;
}
