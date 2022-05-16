import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Button } from "react-bootstrap";

function Profile() {
  // take user from reducer
  const user = useSelector((state) => state.authReducer.user);
  const [upload, setUpload] = useState(null);
  // upload picture function
  const UploadPic = async () => {
    const data = new FormData();
    data.append("myPic", upload);
    const config = {
      headers: {
        authorized: localStorage.getItem("token"),
      },
    };
    try {
      await axios.put("/api/profile/upload", data, config);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className='row py-5 px-4 userprofile'>
        <div className='col-xl-4 col-md-6 col-sm-10 mx-auto'>
          <div className='bg-white shadow rounded overflow-hidden'>
            <div className='px-4 pt-0 pb-4 profilecover'>
              <div className='media align-items-end profile-header'>
                <div className='profile mr-3'>
                  <div className='media-body mb-5 text-white'>
                    {/* User Name & LastName*/}
                    <h1 className='mt-0 mb-0' id='profilefirstname'>
                      {user && user.name}
                    </h1>
                    <h2 className='mt-0 mb-0' id='profilelastname'>
                      {user && user.lastname}
                    </h2>
                  </div>
                  {/* Profile picture */}
                  <img
                    src={
                      user && user.postTitle
                        ? `uploads/${user.postTitle}`
                        : "https://icon-library.com/images/unknown-person-icon/unknown-person-icon-4.jpg"
                    }
                    alt='Profile Picture'
                    // width={130}
                    className='rounded mb-2 img-thumbnail profilepic'
                  />
                  {/* Choose a profile Picture */}
                  <label className='uploadingforProfile'>
                    {" "}
                    Choose picture
                    <input
                      type='file'
                      size='60'
                      onChange={(e) => setUpload(e.target.files[0])}
                    />
                  </label>
                  {/* OnClick upload picture */}
                  <Button
                    variant='outline-success'
                    className='uploadpicbtn'
                    onClick={UploadPic}
                  >
                    Upload
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
