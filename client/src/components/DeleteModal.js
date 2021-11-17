import React from "react";
import axios from "axios";
import "../styles/DeleteModal.css";

function DeleteModal({ setShowDeleteModal }) {
  const handleDeleteUser = () => {};

  return (
    <div className="page">
      <div className="modalback">
        <div className="modalview">
          <div className="headarea ">Delete Account</div>
          <div className="checkdelete">
            Are you sure you want to delete your account?
          </div>
          <div className="">
            <button
              className="cancel"
              onClick={() => setShowDeleteModal(false)}
            >
              CANCEL
            </button>
            <button className="delete">DELETE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
