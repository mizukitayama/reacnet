import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./api-key-register.css";

const ApiKeyRegister = () => {
  const [apiKey, setApiKey] = useState("");

  const registerApiKey = () => {
    localStorage.setItem("chatGptApi", apiKey);
  };

  useEffect(() => {
    setApiKey(localStorage.getItem("chatGptApi") || "");
  }, []);
  return (
    <>
      <input
        value={apiKey}
        type="text"
        
      />
      <button onClick={registerApiKey}>Set API key</button>
      <div className="form__group field">
    <input type="input" className="form__field" placeholder="Name" />
    <label className="form__label">Name</label>
</div>
    </>
  );
};

export default ApiKeyRegister;
