import React from "react";


export default function Navbar({ isLoggedIn, isLogIn, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
      <div className="navbar-brand">
        BERT Based NER
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      


    </nav>
  );
}