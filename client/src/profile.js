import { Link } from 'react-router-dom';
import './App.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InteractiveMap from './interactiveMap';
import {DeleteProfile, EditProfile, HandleLogout} from './profileEditDeleteFunc';
import  {DonateBlood, SearchDonor } from './profileSearchDonate';



function Profile(){

    const [profileData, setProfileData] = useState({
        id : '',
        name: '',
        email: '',
        contactNo: '',
        bloodGroup: '',
        city: '',
        lastDonationDate: ''
    } );
    const [donationStatus, setDonationStatus] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const API_URL = process.env.REACT_APP_API_URL;
   
    const [formData, setFormData] = useState({
        bloodGroup: "",
        latitude:"",
        longitude:"",
    });
   
    const [error1, setError1] = useState('');
   
    const navigate = useNavigate();

    const calculateDonationStatus = (lastDonationDate) => {
        if (!lastDonationDate) return 'Unavailable'; 
        const lastDate = new Date(lastDonationDate);
        const today = new Date();
        const timeDiff = today - lastDate;
        const diffInDays = timeDiff / (1000 * 3600 * 24); 
        if(diffInDays >= 90){
            return 'Available'
        }
        else{
            const daysRemaining = 90 - diffInDays;
            return `Unavailable - ${Math.ceil(daysRemaining)} days remaining`;
        }
    };
    

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
                const response = await fetch(`${API_URL}/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Attach token in Authorization header
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                const data = await response.json(); // Parse the JSON response
                setProfileData(data);
                const status = calculateDonationStatus(data.lastDonationDate);
                setDonationStatus(status);
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
    
    if (isLoading) {
        return <div><p>Loading...</p></div>;
    }

    if (error) {
        return <div><p>{error}</p></div>;
    }

    

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
                    setError1("Unable to retrieve location. Please allow location access.");
                    console.error(error);
                }
            );
        } else {
            setError1("Geolocation is not supported by your browser.");
        }
    }


     return(
        <div>
            <header className="profilePage">
                <h3>Welcome, {profileData.name} <br>
                </br>Your blood group is {profileData.bloodGroup}</h3>
                <nav>
                    <Link to="/"> Home </Link>
                    <Link onClick={HandleLogout} to={'/'}> LogOut </Link>
                </nav>
            </header>
        <div class="quadrants">
            <div class="profileContainer" id="box1">
                 <h4> Profile </h4>
                 <ul>
                        <li>Name:   {profileData.name} </li>
                        <li>Email:  {profileData.email}</li>
                        <li>Contact No:   {profileData.contactNo}</li>
                        <li>Blood Group:   {profileData.bloodGroup}</li>
                        <li>City:   {profileData.city}</li>
                        <li>Donation Status: {donationStatus}</li>
                 </ul>
                
                <div class="action">
                <EditProfile profileData={profileData} /> 
                <DeleteProfile  profileData={profileData}/> 
                </div>
            </div>

            <div class="profileContainer" id="box2">
            <h4> Please, set your location to search for donor or to donate blood</h4>
            <h5> Drag the marker to adjust your location </h5>
            <button type ="button" onClick={getLocation}>Set my Location</button>

            {formData.latitude && formData.longitude &&(
                <div>
                 <InteractiveMap formData={formData} setFormData={setFormData}/>
                </div>
                )
           }
            </div>
            <div class="profileContainer" id="box3">
                <SearchDonor formData ={formData} setFormData={setFormData}/>
            </div>
            <div class="profileContainer" id="box4">
                <DonateBlood profileData= {profileData} formData={formData} />
            </div>
            </div> 
        </div>
    )
}

export default Profile;

