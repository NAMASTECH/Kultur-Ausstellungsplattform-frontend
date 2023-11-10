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
  const [datesStart, setDateStart] = useState("");
  const [datesEnd, setDateEnd] = useState("");
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
    datesStart,
    datesEnd,
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
      datesStart,
      datesEnd,
      timeStart,
      timeEnd,
      venueName,
      venueType,
      venues: [
        {
          city,
          street,
          houseNumber,
          additionalAddressInfo,
          zipCode,
        },
      ],
    };

    //path erstellen
    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/event`,
        userData,
        {
          withCredentials: true,
        }
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
      eventTitle !== "" &&
      artist !== "" &&
      eventType !== "" &&
      img !== "" &&
      eventCategory !== "" &&
      description !== "" &&
      homepage !== "" &&
      datesStart !== "" &&
      datesEnd !== "" &&
      timeStart !== "" &&
      timeEnd !== "" &&
      venueName !== "" &&
      city !== "" &&
      street !== "" &&
      houseNumber !== "" &&
      additionalAddressInfo !== "" &&
      zipCode !== "" &&
      venueType !== "";
    console.log(isValid);
    setConfirmBtnActive(isValid);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Add New Event</h2>
      <label>Event Title</label>
      <input type="text" value={eventTitle} onChange={handleEventTitleChange} />
      <label>Event Category</label>
      <input
        type="text"
        value={eventCategory}
        onChange={handleEventCategoryChange}
      />
      <label>Artist</label>
      <input type="text" value={artist} onChange={handleArtistChange} />
      <label>venueType</label>
      <input type="text" value={venueType} onChange={handleVenueTypeChange} />

      <label>Event Type</label>
      <input type="text" value={eventType} onChange={handleEventTypeChange} />
      <label>img</label>
      <input type="text" value={img} onChange={handleImgChange} />
      <label>Description</label>

      <textarea
        size="sm"
        name="Size"
        placeholder="Geben Sie ein Beschreibung"
        rows="25"
        cols="50"
        maxLength="2000"
        value={description}
        onChange={handleDescriptionChange}
      >
        <p>Write something here </p>
      </textarea>
      <label>Homepage</label>
      <input type="text" value={homepage} onChange={handleHomepageChange} />

      <label>Start Date</label>
      <input type="date" value={datesStart} onChange={handleDateStartChange} />

      <label>End Date</label>
      <input type="date" value={datesEnd} onChange={handleDateEndChange} />

      <label>Start Time</label>
      <input type="time" value={timeStart} onChange={handleTimeStartChange} />

      <label>End Time</label>
      <input type="time" value={timeEnd} onChange={handleTimeEndChange} />

      <label>Venue Name</label>
      <input type="text" value={venueName} onChange={handleVenueNameChange} />

      <label>City</label>
      <input type="text" value={city} onChange={handleCityChange} />

      <label>Street</label>
      <input type="text" value={street} onChange={handleStreetChange} />

      <label>House Number</label>
      <input
        type="text"
        value={houseNumber}
        onChange={handleHouseNumberChange}
      />

      <label>additional Address Information</label>
      <input
        type="text"
        value={additionalAddressInfo}
        onChange={handleAdditionalAddressInfoChange}
      />

      <label>ZIP-Code</label>
      <input type="text" value={zipCode} onChange={handleZipCodeChange} />

      <button type="submit" disabled={!isConfirmBtnActive}>
        Sign Up
      </button>
    </form>
  );
}
