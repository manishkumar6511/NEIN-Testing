import './App.css';
import Header from './Header/Header';
import MiniDrawer from './Slider-Menu/muiSlider';
import { ToastProvider } from './Components/centralized_components/Toast';




import { BrowserRouter, Routes, Route, Link,Navigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import ProtectedRoute from './PrivateRoute/PrivateComponent';
import UserContext from './Context/UserContext';
import Login from './Login';



function App() {
  const { userDetails } = useContext(UserContext);
  
  return (
    <div className="App">
 
  {/* <Testing /> */}

     <BrowserRouter>
     <div>
        {/* {isAuthenticated && <Header />}
        {isAuthenticated && <MiniDrawer />} */}
        

<ToastProvider>
    
    
  {userDetails?.isAuthenticated && <Header />}
  {userDetails?.isAuthenticated && <MiniDrawer />}
          
  {/* <Header />
  <MiniDrawer /> */}
          
          <div>
          <Routes>
              <Route path="/login"  element={userDetails?.isAuthenticated  ? <Navigate to="/" /> : <Login  />}/>
            
            
              <Route 
                path="/*" 
                element={
                  <ProtectedRoute>

                  
                  </ProtectedRoute>
                } 
              />
            
            
            </Routes>
            
          </div>
        </ToastProvider>
      </div>
    </BrowserRouter> 
  



 

  
    

    </div>
  );
}

export default App;