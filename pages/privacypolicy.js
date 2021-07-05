import React from "react";
import config from "../config";

export default function Privacypolicy() {
  return (
    <div className="privacy-policy">
      <h2>Privacy policy</h2>
      {config.privacyPolicy.map((item, i) => (
        <div className="pp-section" key={i}>
          {item.title && <h3>{item.title}</h3>}
          <p>{item.para}</p>
        </div>
      ))}
    </div>
  );
}
