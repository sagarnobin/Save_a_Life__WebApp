import { Link } from 'react-router-dom';
import './App.css';

function Homepage() {
    return (
        <div>
          <header>
          <a href =" " className="logo" > Save A Life</a>
          <nav>
            <Link to="/profile">Profile</Link>
            <Link to="/login">Login </Link>
            <Link to="/register">Register </Link>
            
          </nav>
        </header>
        <div className="container">
        <img src="/image1.jpg" alt="Image1"/>
        <p>Donate blood at your nearest center and help save lives. 
          Your donation ensures hospitals have the blood they need in emergencies.
           If you or someone you know ever needs blood, our platform connects you 
           with nearby donors, making it easy to find help when it matters most.</p>
        </div>
        </div>
    );
  }
  
  export default Homepage;