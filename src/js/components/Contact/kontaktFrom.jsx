import { useState } from "react";
import "./kontaktFormStyle.css";
const KontaktFrom = () => {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handelSubmit = (e) => {
    e.preventDefault();
  };
  // useEffect API anfrage  senden

  // console.log("Daten gesendet", {
  //   selectedEvent,
  //   firstName,
  //   lastName,
  //   organisation,
  //   email,
  //   message,
  // });

  return (
    <div className="KontaktForm-container">
      <h2 className="kontaktForm-container-header">KONTAKT</h2>
      <p>Schreiben Sie uns eine Nachricht.</p>
      <form onSubmit={handelSubmit}>
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
        </div>

        <label htmlFor="vorname">Vorname:</label>
        <input
          type="text"
          id="vorname"
          placeholder="Ihre Vorname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="nachname">Nachname:</label>
        <input
          type="text"
          id="nachname"
          placeholder="Ihre Lastname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="organisation">organisation:</label>
        <input
          type="text"
          id="organisation"
          placeholder="Ihre Organisation"
          value={organisation}
          onChange={(e) => setOrganisation(e.target.value)}
        />

        <label htmlFor="email">E-Mail Adresse:</label>
        <input
          type="email"
          id="email"
          placeholder="Ihre E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="nachricht">Ihre Nachricht:</label>
        <textarea
          id="nachricht"
          value={message}
          placeholder=" freun wir uns auf  Ihre Nachricht "
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit">Absenden</button>
      </form>
    </div>
  );
};

export default KontaktFrom;
