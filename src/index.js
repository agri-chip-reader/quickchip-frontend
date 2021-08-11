import ReactDOM from 'react-dom';
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from 'react-router-dom';
import App from './App';


ReactDOM.render((
  <CookiesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CookiesProvider>
), document.getElementById('root'));

