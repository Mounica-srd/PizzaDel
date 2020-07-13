import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

 import Navbar from "./components/navbar.component"
 import WorkList from "./components/worklist.component";
 import Inventory from "./components/inventory.component"; 

 /**
 * Example usage of {@link APP} component.
 * @extends React.Component
 * @constructor
 * @param {object} props - optional params
 */

function App() {
  return (
    <Router>
    <div className="container">
      <Navbar />
        <br/>
        <Route path="/" exact component={WorkList} />
        <Route path="/create" component={Inventory} /> 
    </div>
    </Router>
  );
 }

export default App; 