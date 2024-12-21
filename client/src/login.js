import { Link} from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 

function Login() {
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    const API_URL = process.env.REACT_APP_API_URL;
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value, 
        }));
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        if (!formData.email || !formData.password) {
          setMessage('Please fill out all fields.');
          return;
        }
         
        const response = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
          const token = data.token;
          localStorage.setItem('token', token);
          navigate('/profile');
          console.log(response);
      } else {
          alert('Invalid credentials');
      }

    };

    return (

      <div>
      <header>
        <a href ="/" className="logo" > Home </a>
      </header>
        <div class="login-container">
        <h2>Login</h2>
        <form className="login" onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}required/>
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>
        <button type="submit">Login</button>
        <h5>No account? Please signup!</h5>
        <Link to='/register'><button type="submit">Sign Up</button></Link>
        </form>
        </div>
      </div>
    );
  }
  
  export default Login;