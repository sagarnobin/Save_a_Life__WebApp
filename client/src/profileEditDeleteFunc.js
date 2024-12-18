import { Link } from 'react-router-dom';
import './App.css';
import { useState, useEffect } from 'react';




const DeleteProfile=({profileData})=>{
    const [showPopup, setShowPopup] = useState(false);

    const handleDelete = async() => {
        try {
            const response = await fetch("http://localhost:4000/delete-profile", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "userId": profileData.id, // Replace with dynamic user ID
                }), 
            });
    
            if (response.ok) {
                alert("Profile deleted successfully!");
                // Optionally, navigate to the home or login page
                window.location.href = "/login";
            } else {
                alert("Failed to delete profile. Try again!");
            }
        } catch (error) {
            console.error("Error deleting profile:", error);
            alert("An error occurred while deleting the profile.");
        }
    
        setShowPopup(false); // Close popup after API call
    };

        
    return(
            <div>
            <div class="action">
            <button class="delete-button" onClick={() => setShowPopup(true)}>Delete Profile</button>
            </div>
            {showPopup && (
                <div className="modal-overlay">
                     <div className="modal-box">
                         <span className="close" onClick={() => setShowPopup(false)}>
                        &times;
                         </span>
                    <h3>Delete Profile</h3>
                    <p>This will delete all the user information. Are you sure to proceed?</p>
                    <div className="modal-buttons">
                        <button onClick={handleDelete} className="btn-sure">
                            Sure
                        </button>
                        <button onClick={() => setShowPopup(false)} className="btn-cancel">
                            Cancel
                        </button>
                    </div>
                   </div>
               </div>
            )}
            </div>

        );


};


const EditProfile=({profileData})=>{

    const [showPopup1, setShowPopup1] = useState(false);
    const [editFormData, setEditFormData] = useState(null);

    const handleClickPopup = async() => {
        setShowPopup1(true);
        setEditFormData({
            'id' : profileData.id,
            'name': profileData.name,
            'email': profileData.email,
            'contactNo': profileData.contactNo,
            'city': profileData.city

        });
    }

    const handleEdit = (event) => {
        const { name, value } = event.target;
        setEditFormData((prevEditFormData) => ({
          ...prevEditFormData,
          [name]: value, 
        }));
      };
    
    const handleEditSubmit = async (event) => {
        event.preventDefault();
        
        const response = await fetch("http://localhost:4000/editProfile", {
         method: 'POST',
         headers: {
              'Content-Type': 'application/json',
         },
        body: JSON.stringify(editFormData), // Sending form data to server
        })
        console.log(response)
        setShowPopup1(false)
        alert("Profile Updated Successfully")
        window.location.reload();



    }

    return(
        <div>
            <div id="profile">
                <div class ="action">
                <button class="edit-button" onClick={handleClickPopup}>Edit Profile</button> 
                </div>  
                {showPopup1 && (<div className="modal-overlay">
                                    <div className="modal-box">
                                        <span className="close" onClick={() => setShowPopup1(false)}>  &times;    </span>
                                            <h3>Edit Profile</h3>  
                                            <form className="edit" onSubmit={handleEditSubmit}>                                              
                                            <input type="text" name="name" placeholder="Name" value={editFormData.name} onChange={handleEdit}/>   
                                            <input type="email" name="email" placeholder="Email" value={editFormData.email} onChange={handleEdit}/>
                                            <input type="text" name="contact" placeholder="Contact No" value={editFormData.contact} onChange={handleEdit}/>
                                            <input type="city" name="city" placeholder="city" value={editFormData.city} onChange={handleEdit}/>
                                            <div className="modal-buttons">
                                            <button className="btn-save">
                                             Save
                                            </button>
                                            <button onClick={() => setShowPopup1(false)} className="btn-cancel">
                                            Cancel
                                            </button>
                                            </div>
                                            </form>
                                    </div>
                                </div>
               )}

                </div>
        </div>
    );


};

const HandleLogout = ()=>{
    localStorage.removeItem("token");
    alert("You are logged out");
}

export {DeleteProfile,EditProfile, HandleLogout} ;