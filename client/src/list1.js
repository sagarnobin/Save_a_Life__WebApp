import { Link} from 'react-router-dom';
import './App.css';
import { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import CenterListandMap from './centerListandMap';
import { HandleLogout } from './profileEditDeleteFunc';
import { useFetch } from './profileSearchDonate';


function List1(){
    const location = useLocation();
    const { results1 = [], results2 = [] } = location.state || {};
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
                <Link to="/profile">Donate Blood</Link>
                <Link onClick={HandleLogout} to={'/'}> LogOut </Link>
            </nav>
        </header>
        <div className="List1">
        {results1.length > 0 ?

        (
        
        <div className="donorContainerList">
             <h2>List of available donor for Blood Group:{results1[0].bloodGroup}</h2>
             <h3 className="p1"> Found {results1.length} donors nearby</h3>
             <table className="donerList">
                <thead>
                    <tr>
                        <th>Sl. No</th>
                        <th>Name</th>
                        <th>Contact No</th>
                    </tr>
                </thead>
                <tbody id="table-body">
                    {results1.length > 0 ? (
                        results1.map((result, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{result.name}</td>
                                <td>{result.contactNo}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">No results found</td>
                        </tr>
                    )}
                </tbody>
             </table>
        </div>):(<h5>No user match found :/</h5>)}
        </div>
        <div>
             <CenterListandMap  results={results2}/>
       </div>
    </div>
 
    );

}

export default List1;