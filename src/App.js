import "./App.css";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

function App() {
  const [user, setUser] = useState({});

  function handleCallBack(response) {
    // console.log("encoded jwt token: " + response.credential);
    // console.log(response);
    var decoded_j = jwt_decode(response.credential);
    setUser(decoded_j);
    document.getElementById("signInDiv").hidden = true;
    // console.log(decoded_j)
  }

  var val = process.env.CLIENT;
  console.log(val);
  console.log(process.env.REACT_APP_TITLE);
  console.log(process.env.CLIENT);

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "ENTER_YOUR_CLIENT_ID_HERE",
      callback: handleCallBack,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);

  function signOut() {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }
  return (
    <div>
      <h1>Hello there</h1>
      <div id="signInDiv"></div>

      {user && (
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      )}

      {Object.keys(user).length != 0 && (
        <button
          title="SignOut"
          onClick={(e) => {
            signOut(e);
          }}
        >
          Sign Out
        </button>
      )}
    </div>
  );
}

export default App;
