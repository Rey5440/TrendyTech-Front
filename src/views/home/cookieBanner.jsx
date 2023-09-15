import React from "react";
import Cookies from "js-cookie";

const CookieBanner = ({ cookies, message, options }) => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
  };

  const handleReject = () => {
    setAccepted(false);
  };

  return (
    <div className="cookie-banner">
      <h2>{message}</h2>

      {!accepted && (
        <div className="cookie-actions">
          <button onClick={handleAccept}>{options.acceptLabel}</button>
          <button onClick={handleReject}>{options.rejectLabel}</button>
        </div>
      )}
    </div>
  );
};

export default CookieBanner;
