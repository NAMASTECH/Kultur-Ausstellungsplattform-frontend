// Hier kommen alle wichtigen Imports rein. Z.B. die eingebauten Hooks von react
import { useEffect, useState, useContext } from "react";

// Imports von benoetigten Paketen
import axios from "axios";

import { EventContext } from "../../context/EventContext.jsx";
import SelectComponent from "../../components/SelectComponent.jsx";
import ArtistInputs from "../../components/ArtistInputs/ArtistInputs.jsx";
import "./AddEventForm.scss";
import { useNavigate } from "react-router-dom";



export default function AddEventForm() {
  // Eckdaten
const navigate = useNavigate();
  // EventContext konsumieren
  const { eventCategories, eventTypes, venueTypes } = useContext(EventContext);

  const [eventTitle, setEventTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [eventType, setEventType] = useState(eventTypes[0]);
  const [eventCategory, setEventCategory] = useState(eventCategories[0]);
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

  const [venueType, setVenueType] = useState(venueTypes[0]);
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");

  const [additionalAddressInfo, setAdditionalAddressInfo] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [isConfirmBtnActive, setConfirmBtnActive] = useState(false);

  const [artists, setArtists] = useState([
    {
      artistName: "",
      artistType: "",
      artistDescription: "",
      artistHomepage: "",
      artistImg: "",
    },
  ]);

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
      navigate('/mydata');
    } catch (error) {
      console.error("Axios error:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error", error.message);
      }
      console.error(error.config);
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

  // console.log(artists);

  return (
    <>
      <h2>Add New Event</h2>
      <p>{`Page ${PageNo} of 3`}</p>
      <form id="addEvent-form" onSubmit={handleSubmit}>
        <div
          className="page_add_form"
          style={{ display: PageNo == 1 ? "block" : "none" }}
        >
          <label>Name der Veranstaltung</label>
          <input
            type="text"
            required
            value={eventTitle}
            onChange={handleEventTitleChange}
          />
          <SelectComponent
            title="Kategorie"
            selected={eventCategory}
            values={eventCategories}
            onChange={handleEventCategoryChange}
          />
          <SelectComponent
            title="Typ von Veranstaltung"
            selected={eventType}
            values={eventTypes}
            onChange={handleEventTypeChange}
          />
          <label>Homepage der Veranstaltung</label>
          <input
            type="text"
            required
            value={homepage}
            onChange={handleHomepageChange}
          />
          <div className="date">
            <label>
              Startdatum
              <input
                type="date"
                required
                value={dateStart}
                onChange={handleDateStartChange}
              />
            </label>

            <label>
              Enddatum
              <input
                type="date"
                required
                value={dateEnd}
                onChange={handleDateEndChange}
              />
            </label>
          </div>
          <div className="time">
            <label>
              Start Time
              <input
                type="time"
                name="timeStart"
                required
                value={timeStart}
                onChange={handleTimeStartChange}
              />
            </label>

            <label>
              End Time
              <input
                type="time"
                name="timeEnd"
                required
                value={timeEnd}
                onChange={handleTimeEndChange}
              />
            </label>
          </div>
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
        <div
          className="page_add_form"
          style={{ display: PageNo == 2 ? "block" : "none" }}
        >
          {" "}
          {/* Page 2 */}
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
          <button type="button" onClick={addArtistInput}>
            + hinzufügen
          </button>
        </div>
        <div
          className="page_add_form"
          style={{ display: PageNo == 3 ? "block" : "none" }}
        >
          {" "}
          {/* Page 3 */}
          <label>Venue Name</label>
          <input
            type="text"
            required
            value={venueName}
            onChange={handleVenueNameChange}
          />
          <SelectComponent
            title="Venue Type"
            selected={venueType}
            values={venueTypes}
            onChange={handleVenueTypeChange}
          />
          <label>City</label>
          <input
            type="text"
            required
            value={city}
            onChange={handleCityChange}
          />
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
          <input
            type="text"
            required
            value={zipCode}
            onChange={handleZipCodeChange}
          />
        </div>
        <div className="form_button">
          <button
            type="button"
            onClick={handlePageChange}
            style={{ display: PageNo == 1 ? "none" : "block" }}
            value={`minus`}
          >
            Zurück
          </button>
          <button
            type="button"
            onClick={handlePageChange}
            style={{ display: PageNo == 3 ? "none" : "block" }}
            value={`plus`}
          >
            Weiter
          </button>
          <button
            type="submit"
            /* disabled={!isConfirmBtnActive} */ style={{
              display: PageNo == 3 ? "block" : "none",
            }}
          >
            {" "}
            Speichen
          </button>
        </div>
      </form>
    </>
  );
}
