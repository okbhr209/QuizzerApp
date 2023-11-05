// import './App.css';
// import Header from "./components/Header.js";
import Login from "./components/Login.js" ;
import Register from './components/Register.js';
import Home from './components/Home'; 

// import 'bootstrap/dist/css/bootstrap.min.css' ;
// import Quiz from './Quiz' ; 
// import { render } from "react-dom";
// import {BrowserRouter ,Switch,Route} from 'react-router-dom';
//  import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
// import { Switch } from "react-router-dom/cjs/react-router-dom.min.js";
// import { Route } from "react-router-dom/cjs/react-router-dom.min.js";
// import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.js";
// import { Route } from "react-router-dom/cjs/react-router-dom.js";
// import { BrowserRouter } from 'react-router-dom';
//  import  Route from
// import {Route}
// import Home from './components/Home';
// import { Routes, Route } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom';

function App() {
  return (
    <div className="App">

    <BrowserRouter>
    <Switch>

    <Route exact path='/Login'>
        <Login/>
        </Route>

    <Route exact path='/Register'>
      <Register/>
    </Route>

    <Route exact path='/Home'>
      <Home/>
    </Route>

    </Switch>
   
     
    </BrowserRouter>
      
    </div>



    
  );
}

export default App;
