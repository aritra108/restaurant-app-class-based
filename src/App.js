import React from 'react';
import logo from './logo.svg';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './components/MenuComponent'; // Importing the custom Menu component
import './App.css';

function App() {
  return (
    <div>

      <Navbar dark color = "primary">
        <div className = "container">
          <NavbarBrand href = "/">Ristorante Con Fusion</NavbarBrand>
        </div>
      </Navbar>

      {/* Our custom menu component */}
      <Menu />


    </div>
  );
}

export default App;
