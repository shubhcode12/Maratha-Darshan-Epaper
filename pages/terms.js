import React from "react";
import config from "../config";

export default function Terms() {
  return (
    <div className="privacy-policy">
      <h2>Terms & conditions</h2>
      {config.terms.map((item, i) => (
        <div className="pp-section" key={i}>
          {item.title && <h3>{item.title}</h3>}
          <p>{item.para}</p>
        </div>
      ))}
    </div>
  );
}
