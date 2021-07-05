import React from "react";
import config from "../config";

export default function About() {
  return (
    <div className="about">
      <h1>About Us</h1>
      <div className="about-company">
        <img src={config.aboutPage.logo} alt="newspaper logo" />
        <h2>{config.aboutPage.title}</h2>
      </div>
      <div className="about-text">
        {config.aboutPage.description.map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
      <div className="about-contact">
        <ul>
          {config.aboutPage.contactnos.map((no, i) => (
            <li key={i}>
              <ion-icon name="call" />
              {no}
            </li>
          ))}
          {config.aboutPage.emails.map((email, i) => (
            <li key={i}>
              <ion-icon name="mail" />
              {email}
            </li>
          ))}
        </ul>
        <div className="about-address" dangerouslySetInnerHTML={{ __html: config.aboutPage.address.replace("\n", "<br />") }} />
      </div>
    </div>
  );
}
