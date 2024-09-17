import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './Context/UserContext';
import BranchChart from './Components/FreightForwading/Dashboard';
import {CssBaseline} from'@mui/material';
import {StyledEngineProvider}
from '@mui/material/styles';
import { LoaderProvider } from './PrivateRoute/LoaderContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <StyledEngineProvider injectFirst> <CssBaseline/> </StyledEngineProvider>
     <UserProvider>
     <LoaderProvider>
     <App />
     </LoaderProvider>
    </UserProvider>
  

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
