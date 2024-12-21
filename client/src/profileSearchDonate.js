import { Link } from 'react-router-dom';
import './App.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const useFetch =()=>{
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const FetchProfile = async () => {
            try{
                const token = localStorage.getItem('token'); // Retrieve token from localStorage
    
                if (!token) {
                    setError('You are not logged in.');
                    navigate('/login');
                    setIsLoading(false);
                    return;
                }
                setIsLoading(false)
            }
            catch(err){
                console.error(err);
                setIsLoading(false);
                setError(err.message || 'Something went wrong.');
            }
        };
        FetchProfile();
    }, []);

    return {error,isLoading};

}    
   



const DonateBlood = ({profileData,formData})=>{
        const navigate = useNavigate();
        const API_URL = process.env.REACT_APP_API_URL;
        
        const handleDonateBlood= async(event)=>{
            event.preventDefault();
        if(!formData.latitude || !formData.longitude){
            alert("Please set your current location")
            return;
        }
        const response= await fetch(`${API_URL}/list2`, {
            method: 'POST',
            headers: {
                 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id':profileData.id,
                'bloodGroup': profileData.bloodGroup,
                'latitude':formData.latitude,
                'longitude':formData.longitude
            } )  })
        if(!response.ok){
            console.log("Couldn't fetch donation center list")
        }
        const data = await response.json();
        navigate("/list2", { state: { results: data } });

        }
        
        return(
         <div className="DonateBlood">
            <h4> Be a Donor</h4>
            <button type="submit" onClick={handleDonateBlood}>Donate Blood</button>
         </div>

        );
};
   
const SearchDonor =({formData, setFormData})=>{

    
    const navigate = useNavigate();
    
    const API_URL = process.env.REACT_APP_API_URL;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value, // Dynamically update the field based on the input's name attribute
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if(!formData.latitude && !formData.longitude)
        {
            alert("Please input your location")
            return;
        }

        console.log(formData)
        const response1 = await fetch(`${API_URL}/list`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), // Directly send the formData object
        });

        if (!response1.ok) {
            throw new Error("Failed to fetch data");
        }
        const data1 = await response1.json();
        
        const response2= await fetch(`${API_URL}/list2`, {
            method: 'POST',
            headers: {
                 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'latitude':formData.latitude,
                'longitude':formData.longitude
            } )  })
        if(!response2.ok){
            console.log("Couldn't fetch donation center list")
        }
        const data2 = await response2.json();
       
        navigate("/list1", { state: 
            { results1: data1 ,
              results2: data2
            } });
        console.log(data1)
        console.log(data2)
        
    }

    return(
        <div className="searchDonor">
            <h4> Search Donor</h4>
                <form className="searchDonor" onSubmit={handleSubmit} >
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
                    <button type="submit">Search</button>
                </form>
        </div>

    );



}
   
export {DonateBlood,SearchDonor, useFetch} ;
    
