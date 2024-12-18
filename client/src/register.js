import { Link } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

  

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        bloodGroup: '',
        lastDonate:'',
        city:'',
        latitude:'',
        longitude:'',
        password: '',
      });
    
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value, 
        }));
      };


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!formData.name || !formData.email || !formData.contact || !formData.bloodGroup || !formData.password || !formData.lastDonate ||
          ! formData.city || !formData.latitude || !formData.longitude)
       {
          setMessage('Please fill out all fields.');
          return;
        }
      
        if (!/^\d{11}$/.test(formData.contact)) {
          setMessage('Contact number must be 11 digits.');
          return;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
          setMessage(
            'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a digit, and a special character (e.g., @, #, $, %, ^, &, *).'
          );
          return;
        }
        const data = await fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Sending form data to server
          })
        const response = await data.json();
        if (data.ok) {
          setMessage('Registration successful!');
          navigate('/login');
          console.log('Form Data Submitted:', formData);
        } else {
            setMessage(response.error);
        }
     
      };

   const getLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }));
                    console.log("Coordinates updated:", position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    setError("Unable to retrieve location. Please allow location access.");
                    console.error(error);
                }
            );
        } else {
            setError("Geolocation is not supported by your browser.");
        }
    }

    return (

      <div>
         <header>
          <a href ="/" className="logo" > Home </a>
          <nav>
              <Link to="/login">Login </Link>
          </nav>
         </header>


        <div class="register-container">
        <h2>Sign Up</h2>
        <form className="Register" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required/>   
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
        <input type="text" name="contact" placeholder="Contact No" value={formData.contact} onChange={handleChange}  required/>
        <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
            <option value="" disabled selected>Select your Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
        </select>
        <select name="lastDonate" value={formData.lastDonate} onChange={handleChange} required>
            <option value="" disabled selected>Select your last blood donation time</option>
            <option value="15">Less than 1 month ago</option>
            <option value="45">Less than 2 months ago</option>
            <option value="75">Less than 3 months ago</option>
            <option value="90">More than 3 months ago / Never</option>
        </select>
        <input type="text" name="city" placeholder="Enter your City"  value={formData.city} onChange={handleChange}required/>
        <button id ="setLoc" type="button" onClick={getLocation}>Set Location Coordinates</button>
        {formData.latitude && formData.longitude && (
                <h5>
                Latitude: {formData.latitude}, Longitude: {formData.longitude}
                </h5>
                )}

        <input type="password" name="password" placeholder="Set Password" value={formData.password} onChange={handleChange} required/>
        {message && <small style={{ color: 'red',textAlign: 'center' }}>{message}</small>}
        <button type="submit">Sign Up</button>
        </form>
        </div>
      </div>
    );
  }
  
  export default Register;