import React from "react";
import { socialLinks, socialLinksText } from "../config";

export default function SocialLinks() {
  if (!socialLinks || socialLinks.length === 0) return null;

  return (
    <div className="social-links">
      <h3>{socialLinksText}</h3>
      <ul>
        {socialLinks.map((link, i) => (
          <li key={i} style={{ "--brand-color": link.color }}>
            <a href={link.to}>
              <ion-icon name={link.icon} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
