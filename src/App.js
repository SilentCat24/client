import React from "react";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './components/HomePage';
import SinglePost from './components/SinglePost';
  

function App() {
 
  return (
  <Router>
    
   
      <Routes>
      <Route path = '/' exact element = {<HomePage />}/>   
      {/* <Route path="/users" element={<CreatePost/>}/> */}
         <Route path ="/users" element ={<HomePage/>}/>
       <Route path="/users/:id" element={<SinglePost/>}/>
      </Routes>
 
  </Router>
  

    );
}

export default App;
