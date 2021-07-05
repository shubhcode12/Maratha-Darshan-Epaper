import React, { useState } from "react";
import dynamic from "next/dynamic";
import firebase from "../../utils/firebase";

const NewPaper = dynamic(() => import("./NewPaper"), { ssr: false, loading: () => <div className="loader" /> });
const ContactRequests = dynamic(() => import("./ContactRequests"), { ssr: false, loading: () => <div className="loader" /> });
const Subscribers = dynamic(() => import("./Subscribers"), { ssr: false, loading: () => <div className="loader" /> });
const DeleteNewspaper = dynamic(() => import("./DeleteNewspaper"), { ssr: false, loading: () => <div className="loader" /> });

function Panel() {
  const [nav, setNav] = useState("new-paper");

  return (
    <div className="admin">
      <div className="admin-nav">
        <div className="admin-nav-item" data-active={nav === "new-paper"} onClick={() => setNav("new-paper")}>
          New paper
        </div>
        <div className="admin-nav-item" data-active={nav === "delete-paper"} onClick={() => setNav("delete-paper")}>
          Delete paper
        </div>
        <div className="admin-nav-item" data-active={nav === "subscribers"} onClick={() => setNav("subscribers")}>
          Subscribers
        </div>
        <div className="admin-nav-item" data-active={nav === "contact-requests"} onClick={() => setNav("contact-requests")}>
          Contact Requests
        </div>
        <div className="admin-nav-item" onClick={() => firebase.auth().signOut()}>
          Logout
        </div>
      </div>
      <div className="admin-content">
        {nav === "new-paper" && <NewPaper />}
        {nav === "subscribers" && <Subscribers />}
        {nav === "contact-requests" && <ContactRequests />}
        {nav === "delete-paper" && <DeleteNewspaper />}
      </div>
    </div>
  );
}

export default Panel;
