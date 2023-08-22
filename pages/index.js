import React, { useState } from "react";
import ReactDOM from "react-dom";

import "../styles/Home.module.css";

function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "username",
      password: "password"
    },
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    // const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    // if (userData) {
    //   if (userData.password !== pass.value) {
    //     // Invalid password
    //     setErrorMessages({ name: "pass", message: errors.pass });
    //   } else {
    //     // setIsSubmitted(true);
        
    //   }
    // } else {
    //   // Username not found
    //   setErrorMessages({ name: "uname", message: errors.uname });
    // }
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({
        userData: {
          username: uname.value,
          password: pass.value
        },
      }),
      headers: {
        "content-type": "application/json",
      },
    }).then((res)=>{
      res.json().then((loggedInUser)=>{
        console.log(loggedInUser.result);
      })
      setIsSubmitted(true)
    }).catch((e) => console.log(e));
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          margin: "10px"
        }}>
          <label>Username </label>
          <input style={{height: "25px",
  border: '1px solid rgba(0, 0, 0, 0.2)'}} id="username" type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          margin: "10px"
        }}>
          <label>Password </label>
          <input style={{height: "25px",
  border: '1px solid rgba(0, 0, 0, 0.2)'}}  id="password" type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div style={{
          display: "flex",
          justifyContent: "center",
                  }}>
          <input style={{
            marginTop: "10px",
            cursor: "pointer",
            fontSize: "15px",
            background: "#01d28e",
            border: '1px solid #01d28e',
            color: "#fff",
            padding: '10px 20px',
          }} type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div style={{
      fontFamily: "sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "20px",
    height: "100vh",
    fontFamily: "Cambria, Cochin, Georgia, Times, serif",
    backgroundColor: "#f8f9fd"
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: "2rem",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
      }}>
        <div style={{
          fontSize: "25px",
          marginBottom: "20px"
        }}>Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default App;