// Hier kommen alle wichtigen Imports rein. Z.B. die eingebauten Hooks von react
import { useEffect, useState, useContext } from "react";

// Imports von benoetigten Paketen
import axios from "axios";

import { EventContext } from "../../context/EventContext.jsx";
import SelectComponent from "../../components/SelectComponent.jsx";
import ArtistInputs from "../../components/ArtistInputs/ArtistInputs.jsx";
import "./AddEventForm.scss";

export default function AddEventForm() {
  // Eckdaten
  const [eventTitle, setEventTitle] = useState("");
  const [artistName, setArtistName] = useState("");
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

  const [artists, setArtists] = useState([{
    artistName: '',
    artistType: '',
    artistDescription: '',
    artistHomepage: '',
    artistImg: '',
  }]);

  const [PageNo, setPageNo] = useState(1);
  
  // Sideeffect zum Pruefen, ob alle Felder valide sind und man den Confirmbutton aktivieren sollte
  useEffect(() => {
    validateForm();
  }, [
    eventTitle,
    // artistName,
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
    artists, // artist Array
  ]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const userData = {
      eventTitle,
      // artistName,
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
      venueType,
      city,
      street,
      houseNumber,
      additionalAddressInfo,
      zipCode,
      artists,
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
    } catch (error) {
      console.error(error);
    }
  };

  const handleArtistChange = (index, updatedArtist) => {
    const newArtists = [...artists];
    newArtists[index] = updatedArtist;
    setArtists(newArtists);
  };

  const addArtistInput = () => {
    const newArtist = {
      artistName: "",
      artistType: "",
      artistDescription: "",
      artistHomepage: "",
      artistImg: "",
    };

    setArtists([...artists, newArtist]); // Neues leeres artist Objekt hinzufügen
  };

  const removeArtistInput = (index) => {
    const newArtists = [...artists];
    newArtists.splice(index, 1);
    setArtists(newArtists);
  };

  const handleEventTitleChange = (evt) => {
    setEventTitle(evt.target.value);
  };
  const handleArtistNameChange = (evt) => {
    setArtistName(evt.target.value);
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

  const handlePageChange = (evt) => {
    evt.preventDefault();
    if (evt.target.value == "plus") {
      setPageNo(PageNo + 1);
    } else {
      setPageNo(PageNo - 1);
    }
  };



  // Hilfsfunktion zum Validieren der Felder und Aktivieren des Confirmbuttons
  const validateForm = () => {
    // Check that there is at least one artist entry
    const isAtLeastOneArtist = artists.length > 0;

    const areArtistsValid = artists.every(
      (artist) => artist.artistName.trim() !== ""
    );

    // Pruefe, ob alle Felder befuellt
    const isValid =
      eventTitle !== "" &&
      artistName !== "" &&
      eventType !== "" &&
      img !== "" &&
      eventCategory !== "" &&
      description !== "" &&
      homepage !== "" &&
      dateStart !== "" &&
      dateEnd !== "" &&
      timeStart !== "" &&
      timeEnd !== "" &&
      venueName !== "" &&
      city !== "" &&
      street !== "" &&
      houseNumber !== "" &&
      additionalAddressInfo !== "" &&
      zipCode !== "" &&
      venueType !== "" &&
      isAtLeastOneArtist &&
      areArtistsValid;
    setConfirmBtnActive(isValid);
  };

  // EventContext konsumieren
  const { eventTypes, venueTypes, eventCategories } = useContext(EventContext);

  // console.log(artists);

  return (
    <form id="addEvent-form" onSubmit={handleSubmit}>
      <h2>Add New Event</h2>
      <p>{`Page ${PageNo} of 3`}</p>
      <div style={{ display: PageNo == 1 ? 'block' : 'none'}}>
      <label>Name der Veranstaltung</label>
      <input type="text" required value={eventTitle} onChange={handleEventTitleChange} />
      <SelectComponent title="Kategorie" value={eventCategory} values={eventCategories} onChange={handleEventCategoryChange} />
      <SelectComponent title="Typ von Veranstaltung" value={eventType} values={eventTypes} onChange={handleEventTypeChange} />
      <label>Homepage der Veranstaltung</label>
      <input
        type="text"
        required
        value={homepage}
        onChange={handleHomepageChange}
      />

      <label>Startdatum</label>
      <input
        type="date"
        required
        value={dateStart}
        onChange={handleDateStartChange}
      />

      <label>Enddatum</label>
      <input
        type="date"
        required
        value={dateEnd}
        onChange={handleDateEndChange}
      />

      <label>Start Time</label>
      <input
        type="time"
        required
        value={timeStart}
        onChange={handleTimeStartChange}
      />

      <label>End Time</label>
      <input
        type="time"
        required
        value={timeEnd}
        onChange={handleTimeEndChange}
      />

      <label>Bild vom Event</label>

      <input type="text" required value={img} onChange={handleImgChange} />

      <label>Description</label>
      <textarea
        size="sm"
        required
        name="Size"
        placeholder="Geben Sie eine Beschreibung für diese Veranstaltung an"
        rows="25"
        cols="50"
        maxLength="2000"
        value={description}
        onChange={handleDescriptionChange}
      >
        <p>Write something here </p>
      </textarea>
</div>
<div style={{ display: PageNo == 2 ? 'block' : 'none'}}>
      {artists.map((artist, index) => (
        <div key={index}>
          <ArtistInputs
            artist={artist}
            index={index}
            onArtistChange={handleArtistChange}
          />

          {index > 0 && (
            <button type="button" onClick={() => removeArtistInput(index)}>
              entfernen
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={addArtistInput}>+ hinzufügen</button>
</div>
<div style={{ display: PageNo == 3 ? 'block' : 'none'}}>
      <label>Venue Name</label>
      <input
        type="text"
        required
        value={venueName}
        onChange={handleVenueNameChange}
      />

      {/* <label>Venue Type</label> */}
      {/* <input type="text" value={venueType} onChange={handleVenueTypeChange} /> */}
      <SelectComponent
        title="Venue Type"
        value={venueType}
        values={venueTypes}
        onChange={handleVenueTypeChange}
      />

      <label>City</label>
      <input type="text" required value={city} onChange={handleCityChange} />

      <label>Street</label>
      <input
        type="text"
        required
        value={street}
        onChange={handleStreetChange}
      />

      <label>House Number</label>
      <input
        type="text"
        required
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
      <input type="text" required value={zipCode} onChange={handleZipCodeChange} />
</div>
      <button type="button" onClick={handlePageChange} style={{ display: PageNo == 3 ? 'none' : 'block'}} value={`plus`} >Next</button>
      <button type="button" onClick={handlePageChange} style={{ display: PageNo == 1 ? 'none' : 'block'}} value={`minus`}>Back</button>
      <button type="submit" disabled={!isConfirmBtnActive} style={{ display: PageNo == 3 ? 'block' : 'none'}}> Hinzufügen / Vorschau ansehen </button>
    </form>
  );
}
