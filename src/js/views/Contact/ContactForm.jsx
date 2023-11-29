import { useState } from "react";
import "./kontaktFormStyle.scss";

const ContactForm = () => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handelSubmit = (e) => {
    e.preventDefault();
  };
  

  return (
    <div className="KontaktForm-container">
      <form onSubmit={handelSubmit}>
        <h2 className="kontaktForm-container-header">KONTAKT</h2>
        {/* <p>Schreiben Sie uns eine Nachricht.</p>
        <div>
          <label htmlFor="event">Bitte Veranstaltung auswählen:</label>
          <select
            id="event"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
          >
            <option value="">Bitte wählen</option>
            <option value="Event 1">Event 1</option>
            <option value="Event 2">Event 2</option>
            <option value="Event 3">Event 3</option>
            <option value="Event 4">Event 4</option>
          </select>
        </div> */}

        <div class="group"><input type="text" required="required" /><span class="highlight"></span><span class="bar"></span><label>Ihre Vorname</label></div>
        <div class="group"><input type="text" required="required" /><span class="highlight"></span><span class="bar"></span><label>Ihre Nachname</label></div>
        <div class="group"><input type="text" required="required" /><span class="highlight"></span><span class="bar"></span><label>Ihre Organisation</label></div>
        <div class="group"><input type="text" required="required" /><span class="highlight"></span><span class="bar"></span><label>Ihre Email</label></div>
        <div class="group"><textarea type="textarea" rows="5" required="required"></textarea><span class="highlight"></span><span class="bar"></span><label>Message</label></div>

        <button type="submit">Absenden</button>
      </form>
    </div>
  );
};

export default ContactForm;
