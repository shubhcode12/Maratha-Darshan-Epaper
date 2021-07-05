import React, { useState } from "react";
import TextInput from "../components/TextInput";
import firebase from "../utils/firebase";
import { CSSTransition } from "react-transition-group";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const submit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (!email || !name || !message) {
        throw new Error("Email, name and message are required.");
      }
      const key = firebase.database().ref("/contact-requests").push().key;
      await firebase.database().ref(`/contact-requests/${key}`).set({ timestamp: Date.now(), name, email, phone, message });
      setSuccess(true);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="contact">
      <h1>Contact us</h1>
      <form onSubmit={submit}>
        <TextInput label="Your Name" id="name" name="name" value={name} onChangeValue={setName} required />
        <div className="form-horiz">
          <TextInput label="Email id" id="email" name="email" type="email" value={email} onChangeValue={setEmail} required />
          <TextInput label="Phone no" id="phone" name="phone" type="phone" value={phone} onChangeValue={setPhone} />
        </div>
        <textarea
          className="input-text__input"
          rows={5}
          placeholder="Your message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {error && <div style={{ color: "red", marginBottom: "16px" }}>{error}</div>}
        <button className={`btn${loading ? " loading" : ""}`} disabled={loading} type="submit">
          Submit
        </button>
        <div className="success-noti-container">
          <CSSTransition in={success} timeout={5000} classNames="success-noti">
            <div className="success-noti">
              <div className="success-noti-content">
                <ion-icon name="checkmark-circle" />
                <span>Successfully submitted!</span>
              </div>
            </div>
          </CSSTransition>
        </div>
      </form>
    </div>
  );
}

export default Contact;
