import React, { useState } from "react";

const Footer = () => {
  const [bgStyle] = useState({ backgroundColor: "#f5f5f5" });

  return (
    <footer style={bgStyle} className="mt-auto py-3 text-center">
      <strong> &copy; 2020 </strong>
      <a
        className="badge badge-dark"
        rel="noopener"
        href="https://github.com/nachiket-trivedi"
        aria-label="My GitHub"
      >
        Nachiket Trivedi
      </a>
    </footer>
  );
};

export default Footer;
