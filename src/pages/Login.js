import { Helmet } from 'react-helmet';
import { Formik } from 'formik';
import { GoogleLogin } from 'react-google-login';
import { AuthorizationService } from '../service/AuthorizationService';
import { baseUrl } from 'src/utils/const';
import {
  Box,
  Container,
  Grid,
  Typography
} from '@material-ui/core';

import { AuthService } from '../service/AuthService';


import { UtecService } from "src/service/UtecService";
import React, { Component } from 'react';
import { AiService } from "src/service/AiService";
import { Navigate } from "react-router-dom";
import loadingComponent from 'src/utils/loading';


const authservice = new AuthService();

const authFailure = (response) => {
  console.log(response)
}

function generateUserToLogIn(email, googleId, name) {
  return ({
    email: email,
    password: googleId,
    nombre: name
  })
}

function storeUserInfoLogged(email, image, name) {
  localStorage.setItem('email', email)
  localStorage.setItem('image', image)
  localStorage.setItem('name', name)
}

function storeTokenAndUtils(token, direccion, rol) {
  localStorage.setItem('token', token);
  localStorage.setItem('direccion', direccion);
  localStorage.setItem('rol', rol);
}


class Login extends Component {
  constructor() {
    super();
    this.state = {
      logged: null,
      success: null,
      loading: true
    }

    this.utecservice = new UtecService();
    this.aiservice = new AiService();
    this.authservice = new AuthorizationService();
  }


  handleResponse(response){ 
    this.setState({ logged: response })
    this.setState({ loading: false }) 
  }

  componentDidMount() {
    this.authservice.checkiflogged().then((response) => this.handleResponse(response));
  }
  responseGoogle = (response) => {
    console.log("response.profileObj.email: ", response.profileObj.email)
    console.log("response.googleId: ", response.googleId)
    console.log("response.profileObj.name: ", response.profileObj.name)

    let user = generateUserToLogIn(response.profileObj.email, response.googleId, response.profileObj.name)
    //storeUserInfoLogged(response.profileObj.email, response.profileObj.imageUrl, response.profileObj.givenName)

    localStorage.setItem('email', response.profileObj.email)
    localStorage.setItem('image', response.profileObj.imageUrl)
    localStorage.setItem('name',  response.profileObj.givenName)

    authservice.login(user).then((data) => {
      if (!data) {
        localStorage.clear()
        return;
      }
      // storeTokenAndUtils(data.result.token, data.result.direccion, data.result.rol)

      localStorage.setItem('token', data.result.token);
      localStorage.setItem('direccion',  data.result.direccio);
      localStorage.setItem('rol', data.result.rol);
      console.log("success")
      this.setState({success: true})
    });
  };
  getLoading() {
    console.log(this.state.loading)
    return this.state.loading;
  }
  deleteToken(){
    localStorage.clear();
  }

  loginRedirect() {
    return (this.state.logged? 
    <> 
      <Navigate to={baseUrl+"/app/dashboard"}/>
    </>
      :
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Box
        sx={{
          backgroundImage: 'url("https://intranet.utec.edu.pe/sites/default/files/styles/large/public/field/image/background.jpg")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          justifyContent: 'center',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Container maxWidth="sm">
          <Formik>
            {({
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sistema de predicción de vacantes
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <GoogleLogin
                      clientId="1010900668270-me1t0hagc41d7pg18lhek2rp9b82lm87.apps.googleusercontent.com"
                      buttonText="Sign in with Google"
                      onSuccess={this.responseGoogle}
                      onFailure={authFailure}
                      cookiePolicy="single_host_origin"
                    />
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>)
  }

  showpage() {
    return this.getLoading() ? loadingComponent("Verificando autenticación") :  this.loginRedirect();
  }
  
  render(){
    return (
      <>
        {
          this.showpage()
        }
        {
          this.state.success? <Navigate to={baseUrl+"/app/dashboard"}/>: ''
        }
      </>
    )
  }
}

export default Login;