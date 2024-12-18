import { Link} from 'react-router-dom';
import "./App.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useEffect } from "react";
import { HandleLogout } from './profileEditDeleteFunc';
import { useFetch } from './profileSearchDonate';

import CenterListandMap from "./centerListandMap";



function List2(){

    const location = useLocation();
    const results = location.state?.results || []; 
    const useFetchVal = useFetch();

    if (useFetchVal.isLoading) {
    return <div><p>Loading...</p></div>;
    }

    if (useFetchVal.error) {
    return <div><p>{useFetchVal.error}</p></div>;
    }



    return(

    <div>
        <header>
            <a href ="/" className="logo" > Home </a>
            <nav>
                <Link to="/profile">Profile</Link>
                <Link to="/profile">Find Donor</Link>
                <Link onClick={HandleLogout} to={'/'}> LogOut </Link>
            </nav>
        </header>
        <div>
        <CenterListandMap  results={results}/>
        </div>
    </div>

    );

}

export default List2;