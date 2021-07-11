import React, { useState, useEffect } from "react";
import TextInput from "./TextInput";
import firebase from "../utils/firebase";
import config from "../config";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [visits, setVisits] = useState(null);

  useEffect(() => {
    if (config.uniqueViewCounter) {
      if (document.cookie.indexOf("viewed=1") === -1) {
        fetch(`https://api.countapi.xyz/hit/${config.firebaseConfig.storageBucket}/hits`)
          .then((res) => res.json())
          .then((resp) => {
            setVisits(resp.value);
            document.cookie = "viewed=1";
          });
      } else {
        fetch(`https://api.countapi.xyz/get/${config.firebaseConfig.storageBucket}/hits`)
          .then((res) => res.json())
          .then((resp) => {
            setVisits(resp.value);
          });
      }
    } else {
      fetch(`https://api.countapi.xyz/hit/${config.firebaseConfig.storageBucket}/hits`)
        .then((res) => res.json())
        .then((resp) => {
          setVisits(resp.value);
          document.cookie = "viewed=1";
        });
    }
  }, []);

  const subscribeToNewsletter = async (ev) => {
    if (ev) ev.preventDefault();
    setLoading(true);
    try {
      const key = firebase.database().ref("/subscribers").push().key;
      await firebase.database().ref(`/subscribers/${key}`).set({ addedOn: Date.now(), email: email.trim() });
      setMessage("Subscribed successfully!");
    } catch (e) {
      setMessage("An error occured");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="counter">
        <h4>Views counter</h4>
        <p>{visits || "Loading"}</p>
      </div>
      {/* <img src="/aadvaith.png" className="credits-aadvaith" /> */}
      <footer>
        <div className="footer-content" style={config.showNewsletter ? undefined : { textAlign: "center" }}>
          <div className="col">
            <h2 className="footer-title">{config.title}</h2>
            <img className="footer-logo" src={config.logo} alt="logo" />
          </div>
          {config.showNewsletter && (
            <div className="col" style={{ flex: 1, maxWidth: "500px" }}>
              <h3>Subscribe to our newsletter</h3>
              <form onSubmit={subscribeToNewsletter}>
                <div className="form-horiz">
                  <TextInput label="Your email" id="footer-email" name="footer-email" value={email} onChangeValue={setEmail} />
                  <button
                    className={`form-group btn${loading ? " loading" : ""}`}
                    disabled={loading}
                    style={{ maxWidth: "125px" }}
                    type="submit"
                  >
                    Subscribe
                  </button>
                </div>
                {message && <div>{message}</div>}
              </form>
            </div>
          )}
        </div>
        <div className="credits">Powered by: Aadvaith Consultancy (Phone: 9145164646)</div>
      </footer>
    </>
  );
}
