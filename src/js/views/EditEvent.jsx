// EditEvent.jsx
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import { useAuthStore } from "../hooks/useAuthStore"
import SelectComponent from '../components/SelectComponent';
import "./EditEvent.scss"

export default function EditEvent() {

    const { eventId } = useParams();
    const { userData } = useAuthStore();
    // State for form inputs
    const [eventType, setEventType] = useState("All");
    const [venueType, setVenueType] = useState("All");
    const [organizerName, setOrganizerName] = useState(userData.username);

    const [event, setEvent] = useState({
        _id: "",
        eventTitle: "",
        artist: "",
        eventCategory: "",
        eventType: "",
        img: "",
        description: "",
        homepage: "",
        dateStart: "",
        dateEnd: "",
        timeStart: "",
        timeEnd: "",
        organizerId: "",
        venues: [{
            venueName: "",
        }],
        artists: [],
        createdAt: "",
        updatedAt: ""
    });




    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`/api/event/${eventId}`);
                setEvent(response.data);
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };
        fetchEventDetails();
    }, [eventId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEvent({ ...event, [name]: value });
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        try {
            const updatedEvent = {
                ...event,
                eventType,
                venueType,
                // Any other fields you want to include
            };

            const response = await axios.put(`/api/event/${eventId}`, updatedEvent, {
                // TO DO: header mit richtiger Konfiguration
                // headers: {
                //     'Authorization': `Bearer ${userData.token}` 
                // },
                withCredentials: true
            });
            console.log('Event updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating event:', error.response.data);
        }
    };

    const handleDeleteEvent = async () => {
        if (window.confirm('Sind Sie sicher, dass sie dieses Event löschen möchten?')) {
            try {
                const response = await axios.delete(`/api/event/${eventId}`, {
                    withCredentials: true
                });
                // Handle the response, for example, redirect to another page or update the state
                console.log('Event deleted successfully:', response.data);
            } catch (error) {
                // Handle the error, for example, show an error message
                console.error('Error deleting event:', error.response.data);
            }
        }
    };

    const handleVenueChange = (index, field, value) => {
        // Create a new array of venues
        const updatedVenues = event.venues.map((venue, i) => {
            if (i === index) {
                // Update the specific venue object
                return { ...venue, [field]: value };
            }
            return venue;
        });

        // Update the event state with the new venues array
        setEvent(prevEvent => ({ ...prevEvent, venues: updatedVenues }));
    };

    const handleArtistChange = (index, field, value) => {
        const updatedArtists = event.artists.map((artist, i) => {
            if (i === index) {
                // Update the specific artist object
                return { ...artist, [field]: value };
            }
            return artist;
        });

        // Update the event state with the new artists array
        setEvent(prevEvent => ({ ...prevEvent, artists: updatedArtists }));
    };

    // Function to ensure the URL starts with http:// or https://
    const formatURL = (url) => {
        if (!url) return '';

        // Check if URL already starts with http:// or https://
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }

        // Prepend https:// if it's missing
        return `https://${url}`;
    };

    const handleEventTypeChange = (evt) => {
        setEventType(evt.target.value);
    };

    const handleVenueTypeChange = (evt) => {
        setVenueType(evt.target.value);
    };

    const handleOrganizerNameChange = (evt) => {
        setOrganizerName(evt.target.value);
    };

    const formattedEventHomepage = formatURL(event.homepage);
    const formattedImgUrl = formatURL(event.img);

    // EventContext konsumieren
    const { eventTypes, venueTypes } = useContext(EventContext);

    return (

        <section className="event-details-container__section" >
            <h2>Event bearbeiten</h2>

            <div className="event-details-container">

                <div className="img-container">
                    <img className="event-image" alt="Es wurde noch kein Bild für diese Veranstaltung hinterlegt" src={formattedImgUrl} />
                </div>

                <article className="event-details__article" >
                    <form id="editEvent_form" onSubmit={handleSaveChanges}>

                        <div className="event-details-content" >

                            <label htmlFor="organizerName">Veranstalter -
                            <input name="organizerName" type="text" placeholder="Veranstalter" value={organizerName} onChange={handleOrganizerNameChange} />
                            </label>


                            {event.venues.map((venue, index) => {
                                return (
                                    <div key={venue._id}>
                                        <label htmlFor="venueName">Veranstaltungsort -
                                        <input name="venueName" type="text" placeholder="Veranstaltungsort" value={venue.venueName} onChange={(e) => handleVenueChange(index, 'venueName', e.target.value)} />
                                        </label>
                                    </div>
                                )
                            })}

                            <div className="date-and-time-container">

                                <div className="dates-container">
                                    <label htmlFor="dateStart">Datum -
                                    <input className="date-start_input" name="dateStart" type="date" required value={event.dateStart.split("T")[0]} onChange={handleInputChange} /></label>

                                    <pre> - </pre>

                                    <input className="date-end_input" name="dateEnd" type="date" required value={event.dateEnd.split("T")[0]} onChange={handleInputChange} />
                                </div>

                                <pre>  | </pre>
                                <label htmlFor="">Open Houers</label>
                                <input name="timeStart" type="time" required value={event.timeStart} onChange={handleInputChange} />

                                <pre> - </pre>

                                <input name="timeEnd" type="time" required value={event.timeEnd} onChange={handleInputChange} />
                            </div>

                            <div className="event-title-container">
                                {/* <h2>Eventname</h2> */}
                                <label htmlFor="eventTitle">Title -
                                <input id="eventName_input" name="eventTitle" type="text" required placeholder="Eventname" value={event.eventTitle} onChange={handleInputChange} /></label>
                            </div>
                            <label htmlFor="description">Description</label>
                            <textarea
                                className="eventDescription_textarea"
                                size="sm"
                                required
                                name="description"
                                placeholder="Geben Sie eine Beschreibung für diese Veranstaltung an"
                                rows="5"
                                // cols="5"
                                maxLength="2000"
                                value={event.description}
                                onChange={handleInputChange}
                            />

                            <SelectComponent
                                title="Event-Typ"
                                values={eventTypes}
                                onChange={handleEventTypeChange}
                                selected={event.eventType}
                            />

                            <SelectComponent
                                title="Typ von Veranstaltungsort"
                                values={venueTypes}
                                onChange={handleVenueTypeChange}
                                selected={event.venues[0].venueType}
                            />

                            {event.venues.map((venue, index) => {
                                return (
                                    <div id="event-details-content-footer">
                                        <div key={venue._id} id="venue-info" >

                                            <div id="venue-address-container">

                                                <p>Adresse</p>
                                                <label htmlFor="venueName"> Name -
                                                <input name="venueName" type="text" placeholder="Veranstaltungsort" value={venue.venueName} onChange={(e) => handleVenueChange(index, 'venueName', e.target.value)} /></label>
                                                <label htmlFor="venueType"> Type -
                                                <input name="venueType" type="text" placeholder="Veranstaltungsorttyp" required value={venue.venueType} onChange={(e) => handleVenueChange(index, 'venueType', e.target.value)} /></label>

                                                <div>
                                                    <label htmlFor="street">Street - 
                                                    <input name="street" type="text" placeholder="Straße" required value={venue.street} onChange={(e) => handleVenueChange(index, 'street', e.target.value)} /></label>
                                                    <label htmlFor="houseNumber">Number -
                                                    <input name="houseNumber" type="text" placeholder="Hausnummer" required value={venue.houseNumber} onChange={(e) => handleVenueChange(index, 'houseNumber', e.target.value)} /></label>
                                                </div>

                                                <div>
                                                    <label htmlFor="zipCode">ZipCode -
                                                    <input name="zipCode" type="text" placeholder="Postleitzahl" required value={venue.zipCode} onChange={(e) => handleVenueChange(index, 'zipCode', e.target.value)} /></label>
                                                    <label htmlFor="city">city -
                                                    <input name="city" type="text" placeholder="Stadt" required value={venue.city} onChange={(e) => handleVenueChange(index, 'city', e.target.value)} /></label>

                                                </div>

                                                <div>
                                                    <label htmlFor="additionalAddressInfo">Additional Address Info - 
                                                    <input name="additionalAddressInfo" type="text" placeholder="Adresszusatz" value={venue.additionalAddressInfo} onChange={(e) => handleVenueChange(index, 'additionalAddressInfo', e.target.value)} />
                                                    </label>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                );
                            })}

                            {/* <div id="event-homepage">
                                    <span className="font-weight-bold">Event-Homepage:</span>
                                    <a href={formattedEventHomepage} target="_self" rel="noopener noreferrer">
                                        {event.homepage}
                                        Event Homepage
                                    </a>
                                </div> */}
                            <label htmlFor="homepage">Homepage -
                            <input name="homepage" type="text" placeholder="Event Homepage" value={event.homepage} onChange={handleInputChange} /></label>


                            <p className="font-weight-bold font-size-big">
                                <span className="font-weight-bold">Artist(s):</span>
                                {/* {event.artist} */}
                            </p>
                            <div>
                                {event.artists.map((artist, index) => {

                                    const formattedArtistImgUrl = formatURL(artist.artistImg)

                                    return (
                                        <div key={artist._id} id="artist-info-container">
                                            <p id="artist-name" >
                                                <span className="font-weight-bold">Artist Name: </span>
                                                {artist.artistName}
                                            </p>
                                            <p id="artist-type" >
                                                <span className="font-weight-bold">Artist Type: </span>
                                                {artist.artistType}
                                            </p>
                                            <p id="artist-homepage" >
                                                <span className="font-weight-bold">Artist Homepage: </span>
                                                {artist.artistHomepage}
                                            </p>
                                            <p id="artist-description" >
                                                <span className="font-weight-bold">Artist Description: </span>
                                                {artist.artistDescription}
                                            </p>

                                            <p>Artist image</p>
                                            <img src={formattedArtistImgUrl} id="artist-img" width="200em" />
                                        </div>
                                    );
                                })}
                            </div>

                        </div>

                        <button type="submit" >Speichern</button>
                        <button onClick={handleDeleteEvent}>Löschen</button>
                    </form>
                </article>
            </div>

        </section >
    );
}