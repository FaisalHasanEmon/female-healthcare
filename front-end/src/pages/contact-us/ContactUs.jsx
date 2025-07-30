import React from "react";
import { Form } from "react-router-dom";

const ContactUs = () => {
  const handleContactUs = async (e) => {
    e.preventDefault();
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const message = e.target.message.value;
    const contactMessage = { fullName, email, message };

    // const res = fetch("")
  };
  return (
    <div className="container mx-auto px-5">
      <form onSubmit={(e) => handleContactUs(e)}>
        <input
          className="w-500px h-100px border border-red"
          type="text"
          name="fullName"
          required
        />{" "}
        <br></br>
        <input
          className="w-500px h-100px border border-red"
          type="email"
          name="email"
          required
        />{" "}
        <br></br>
        <input
          className="w-500px h-100px border border-red"
          type="text"
          name="message"
          required
        />{" "}
        <br></br>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactUs;
