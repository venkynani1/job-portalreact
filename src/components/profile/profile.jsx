import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../reusedcomponents/navbar"; // ✅ Add your existing Navbar here
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./profile.css";

function ProfilePage() {
  const [id, setId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [highestQualification, setHighestQualification] = useState("");
  const [certifications, setCertifications] = useState("");
  const [profileImagePath, setProfileImagePath] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const token = localStorage.getItem("token");

  const fetchProfile = async () => {

   
    try {
      const response = await axios.get("http://localhost:8081/api/instructor/getProfile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      setId(data.id);
      setFirstName(data.firstName ?? "");
      setLastName(data.lastName ?? "");
      setEmail(data.email ?? "");
      setMobileNumber(data.mobileNumber ?? "");
      setHighestQualification(data.highestQualification ?? "");
      setCertifications(data.certifications ?? "");
      setProfileImagePath(data.profileImagePath ?? "");
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const profile = {
        firstName,
        lastName,
        email,
        mobileNumber,
        highestQualification,
        certifications,
        profileImagePath,
      };

      await axios.put(`http://localhost:8081/api/instructor/update/${id}`, profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const uploadImage = async () => {
    if (!token) {
      alert("No authentication token found. Please log in again.");
      return;
    }

    if (!profileImage) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", profileImage);

    try {
      console.log("Uploading image for ID:", id);

      const response = await axios.post(
        `http://localhost:8081/api/instructor/image/upload/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Image uploaded successfully.");
      fetchProfile(); // refresh image
      setProfileImage(null);
    } catch (error) {
      console.error("Upload failed:", error);
      if (error.response) {
        alert(`Error ${error.response.status}: ${error.response.data.message || "Upload failed"}`);
      } else {
        alert("Network or server error during upload.");
      }
    }
  };

  return (
    <>
      <Navbar /> {/* ✅ Navbar appears on top of profile page */}

      <div className="container mt-5">
        <h2 className="text-center mb-4 text-primary">Instructor Profile</h2>
        <div className="card shadow-lg p-4 mb-5 rounded">
          <div className="text-center mb-4">
            {!profileImagePath ? (
              <>
                <i className="bi bi-person-circle profile-icon"></i>
                <p className="text-muted">No profile image</p>
              </>
            ) : (
              <img
                src={`http://localhost:8081/api/instructor/uploads/${profileImagePath}`}
                alt="Profile"
                className="rounded-circle profile-img"
              />
            )}
          </div>

          <div className="mb-3">
            <label className="fw-semibold text-info">First Name:</label>
            <input
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="fw-semibold text-info">Last Name:</label>
            <input
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="fw-semibold text-info">Email:</label>
            <input
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="fw-semibold text-info">Mobile Number:</label>
            <input
              className="form-control"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="fw-semibold text-info">Highest Qualification:</label>
            <input
              className="form-control"
              value={highestQualification}
              onChange={(e) => setHighestQualification(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="fw-semibold text-info">Certifications:</label>
            <textarea
              className="form-control"
              value={certifications}
              onChange={(e) => setCertifications(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="fw-semibold text-info">Upload New Profile Image:</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
            {profileImage && (
              <div className="mt-2">
                <p className="text-muted">Preview:</p>
                <img
                  src={URL.createObjectURL(profileImage)}
                  alt="Preview"
                  className="rounded-circle preview-img"
                />
              </div>
            )}
          </div>

          <div className="d-flex gap-3 justify-content-end">
            <button className="btn btn-primary btn-lg" onClick={updateProfile}>
              Save / Update Profile
            </button>
            <button className="btn btn-outline-secondary btn-lg" onClick={uploadImage}>
              Upload Image
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
