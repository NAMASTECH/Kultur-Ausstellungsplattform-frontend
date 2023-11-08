// Hier kommen alle wichtigen Imports rein. Z.B. die eingebauten Hooks von react
import { useEffect, useState } from "react";

// Imports von benoetigten Paketen
import axios from "axios";

export default function AddEventForm() {
  // Eckdaten
  const [eventTitle, setEventTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [homepage, setHomepage] = useState("");
  // Wann?
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  // Wo?
  // Name vom Veranstaltungsort
  const [venueName, setVenueName] = useState("");

  const [venueType, setVenueType] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");

  const [additionalAddressInfo, setAdditionalAddressInfo] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [isConfirmBtnActive, setConfirmBtnActive] = useState(false);

  // Sideeffect zum Pruefen, ob alle Felder valide sind und man den Confirmbutton aktivieren sollte
  useEffect(() => {
    validateForm();
  }, [
    eventTitle,
    artist,
    eventType,
    img,
    eventCategory,
    description,
    homepage,
    dateStart,
    dateEnd,
    timeStart,
    timeEnd,
    venueName,
    city,
    street,
    houseNumber,
    additionalAddressInfo,
    zipCode,
    venueType,
  ]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const userData = {
      eventTitle,
      artist,
      eventType,
      img,
      eventCategory,
      description,
      homepage,
      dateStart,
      dateEnd,
      timeStart,
      timeEnd,
      venueName,
      city,
      street,
      houseNumber,
      additionalAddressInfo,
      zipCode,
      venueType,
    };

    console.log(userData);
    //path erstellen
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/event`,
        userData
      );
      console.log(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEventTitleChange = (evt) => {
    setEventTitle(evt.target.value);
  };
  const handleArtistChange = (evt) => {
    setArtist(evt.target.value);
  };
  const handleImgChange = (evt) => {
    setImg(evt.target.value);
  };
  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  };
  const handleEventTypeChange = (evt) => {
    setEventType(evt.target.value);
  };
  const handleEventCategoryChange = (evt) => {
    setEventCategory(evt.target.value);
  };
  //------------------------------------
  const handleHomepageChange = (evt) => {
    setHomepage(evt.target.value);
  };
  const handleDateStartChange = (evt) => {
    setDateStart(evt.target.value);
  };

  const handleDateEndChange = (evt) => {
    setDateEnd(evt.target.value);
  };
  const handleTimeStartChange = (evt) => {
    setTimeStart(evt.target.value);
  };
  const handleTimeEndChange = (evt) => {
    setTimeEnd(evt.target.value);
  };
  const handleVenueNameChange = (evt) => {
    setVenueName(evt.target.value);
  };
  const handleVenueTypeChange = (evt) => {
    setVenueType(evt.target.value);
  };
  const handleCityChange = (evt) => {
    setCity(evt.target.value);
  };
  const handleStreetChange = (evt) => {
    setStreet(evt.target.value);
  };
  const handleHouseNumberChange = (evt) => {
    setHouseNumber(evt.target.value);
  };
  const handleAdditionalAddressInfoChange = (evt) => {
    setAdditionalAddressInfo(evt.target.value);
  };
  const handleZipCodeChange = (evt) => {
    setZipCode(evt.target.value);
  };

  // Hilfsfunktion zum Validieren der Felder und Aktivieren des Confirmbuttons
  const validateForm = () => {
    // Pruefe, ob alle Felder befuellt
    const isValid =
      eventTitle &&
      artist &&
      eventType &&
      img &&
      eventCategory &&
      description &&
      homepage &&
      dateStart &&
      dateEnd &&
      timeStart &&
      timeEnd &&
      venueName &&
      city &&
      street &&
      houseNumber &&
      additionalAddressInfo &&
      zipCode &&
      venueType;

    setConfirmBtnActive(isValid);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Add New Event</h2>
      <label>
        Event Title
        <input
          type="text"
          value={eventTitle}
          onChange={handleEventTitleChange}
        />
      </label>
      <label>
        Artist
        <input type="text" value={artist} onChange={handleArtistChange} />
      </label>
      <label>
        E-Mail
        <input type="text" value={eventType} onChange={handleEventTypeChange} />
      </label>
      <label>
        img
        <input type="text" value={img} onChange={handleImgChange} />
      </label>

      <label>
        Description
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
        />
      </label>

      <label>
        Homepage
        <input type="text" value={homepage} onChange={handleHomepageChange} />
      </label>
      <label>
        Start Date
        <input type="date" value={dateStart} onChange={handleDateStartChange} />
      </label>
      <label>
        End Date
        <input type="date" value={dateEnd} onChange={handleDateEndChange} />
      </label>
      <label>
        Start Time
        <input type="time" value={timeStart} onChange={handleTimeStartChange} />
      </label>
      <label>
        End Time
        <input type="time" value={timeEnd} onChange={handleTimeEndChange} />
      </label>
      <label>
        Venue Name
        <input type="text" value={venueName} onChange={handleVenueNameChange} />
      </label>
      <label>
        City
        <input type="text" value={city} onChange={handleCityChange} />
      </label>
      <label>
        Street
        <input type="text" value={street} onChange={handleStreetChange} />
      </label>
      <label>
        House Number
        <input
          type="text"
          value={houseNumber}
          onChange={handleHouseNumberChange}
        />
      </label>
      <label>
        additional Address Information
        <input
          type="text"
          value={additionalAddressInfo}
          onChange={handleAdditionalAddressInfoChange}
        />
      </label>
      <label>
        ZIP-Code
        <input type="text" value={zipCode} onChange={handleZipCodeChange} />
      </label>
      <button type="submit" disabled={!isConfirmBtnActive}>
        Sign Up
      </button>
    </form>
  );
}
