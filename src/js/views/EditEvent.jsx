// EditEvent.jsx
import axios from 'axios';
import { useState, useEffect } from 'react';
import "./EditEvent.scss"

export default function EditEvent({ eventId }) {
    // State for form inputs
    const [event, setEventData] = useState({
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
        setEventData({ ...event, [name]: value });
    };

    const handleSaveChanges = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`/api/event/${eventId}`, event, {
                withCredentials: true
            });
            // Handle the response, for example, show a success message
            console.log('Event updated successfully:', response.data);
        } catch (error) {
            // Handle the error, for example, show an error message
            console.error('Error updating event:', error.response.data);
        }
    };

    const handleDeleteEvent = async () => {
        if (window.confirm('Are you sure you want to delete this event?')) {
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
        setEventData({ ...event, venues: updatedVenues });
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
        setEventData({ ...event, artists: updatedArtists });
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

    const formattedEventHomepage = formatURL(event.homepage);
    const formattedImgUrl = formatURL(event.img);

    return (

        <section className="event-details-container__section" >

            <h1>Edit Event Komponent</h1>
            <div className="img-container">
                <img className="event-image" src={formattedImgUrl} />
            </div>

            <article className="event-details__article" >
                <form id="editEvent_form" onSubmit={handleSaveChanges}>

                    <div className="event-details-content" >

                        {/* <label>Name vom Veranstaltungsort</label>
                        <div>
                            {event.venues.map((venue) => {
                                return (
                                    <>
                                        <p id="venue" >
                                            {venue.venueName}
                                        </p>
                                        <input key={venue._id} name="venueName" type="text" value={venue.venueName} onChange={(e) => handleVenueChange(index, 'venueName', e.target.value)} />
                                    </>
                                )
                            })}
                        </div> */}

                        {/* <p id="date-start" >
                            <span className="font-weight-bold">Von:</span>
                            {`${event.dateStart.split("T")[0]} - ${event.dateEnd.split("T")[0]} | ${event.timeStart} - ${event.timeEnd}`}
                        </p> */}

                        <div id="date-inputs-and-time-inputs">
                            {/* <div>
                                <label>Startdatum </label>
                            </div> */}
                            <input name="dateStart" type="date" required value={event.dateStart} onChange={handleInputChange} />

                            <span> - </span>
                            {/* <div>
                                <label>Enddatum </label>
                            </div> */}
                            <input name="dateEnd" type="date" required value={event.dateEnd} onChange={handleInputChange} />


                            <span> | </span>


                            {/* <div>
                                <label>Startzeit </label>
                            </div> */}
                            <input name="timeStart" type="time" required value={event.timeStart} onChange={handleInputChange} />

                            <span> - </span>

                            {/* <div>
                                <label>Endzeit </label>
                            </div> */}
                            <input name="timeEnd" type="time" required value={event.timeEnd} onChange={handleInputChange} />
                        </div>


                        {/* <h2 id="event-title" >
                            <span className="font-weight-bold">Event Title:</span>
                            {event.eventTitle}
                        </h2> */}

                        <input name="eventTitle" type="text" required placeholder="Eventname" value={event.eventTitle} onChange={handleInputChange} />

                        {/* <span className="font-weight-bold">
                            Beschreibung:
                        </span>
                        <p id="event-description">
                            {event.description}
                        </p> */}
                        <label>Beschreibung der Veranstaltung</label>
                        <textarea
                            size="sm"
                            required
                            name="Size"
                            placeholder="Geben Sie eine Beschreibung für diese Veranstaltung an"
                            rows="25"
                            cols="50"
                            maxLength="2000"
                            value={event.description}
                            onChange={handleInputChange}
                        />

                        {/* <input name="description" type="text" required value={event.description} onChange={handleInputChange} /> */}


                        {/* TO DO: check where to display eventCategory and eventType*/}

                        {/* <p id="event-type" >
                                <span className="font-weight-bold">Event Typ:</span>
                                {event.eventType}
                        </p> */}

                        {/* <p id="event-category">
                                <span className="font-weight-bold">Kategorie:</span>
                                {event.eventCategory}
                        </p> */}
                        <input name="eventType" type="text" required placeholder="Veranstaltungstyp" value={event.eventType} onChange={handleInputChange} />
                        <label>TO DO: Als Dropdown</label>
                        <input name="eventCategory" type="text" required placeholder="Kategorie" value={event.eventCategory} onChange={handleInputChange} />



                        <div id="event-details-content-footer">
                            {event.venues.map((venue, index) => {
                                return (
                                    <div key={venue._id} id="venue-info" >


                                        {/* TO DO: check where VenueName should be edited */}

                                        {/* <p id="venue-name" >
                                            <span className="font-weight-bold">Ort:</span>
                                            {venue.venueName}
                                        </p> */}

                                        {/* <input name="venueName-footer" type="text" value={venue.venueName} onChange={handleInputChange} /> */}

                                        {/* <p id="venue-type" >
                                            <span className="font-weight-bold">Typ von Veranstaltungsort:</span>
                                            {venue.venueType}
                                        </p> */}



                                        <div id="venue-address-container">

                                            <p>Adresse</p>
                                            <input name="venueName" type="text" placeholder="Veranstaltungsort" value={venue.venueName} onChange={(e) => handleVenueChange(index, 'venueName', e.target.value)} />
                                            <input name="venueType" type="text" placeholder="Veranstaltungsorttyp" required value={venue.venueType} onChange={(e) => handleVenueChange(index, 'venueType', e.target.value)} />

                                            {/* <span className="font-weight-bold">Adresse:</span> */}

                                            {/* {(venue.street && venue.houseNumber) && `${venue.street} ${venue.houseNumber}`}
                                            <br></br>
                                            {venue.zipCode} {venue.city}
                                            {
                                                venue.additionalAddressInfo && (
                                                    <p id="additional-address-info">
                                                        <span className="font-weight-bold">
                                                                Adresszusatz:
                                                            </span>
                                                        {venue.additionalAddressInfo}
                                                    </p>
                                                )
                                            } */}

                                            <div>
                                                <input name="street" type="text" placeholder="Straße" required value={venue.street} onChange={(e) => handleVenueChange(index, 'street', e.target.value)} />
                                                <input name="houseNumber" type="text" placeholder="Hausnummer" required value={venue.houseNumber} onChange={(e) => handleVenueChange(index, 'houseNumber', e.target.value)} />
                                            </div>

                                            <div>
                                                <input name="zipCode" type="text" placeholder="Postleitzahl" required value={venue.zipCode} onChange={(e) => handleVenueChange(index, 'zipCode', e.target.value)} />

                                                <input name="city" type="text" placeholder="Stadt" required value={venue.city} onChange={(e) => handleVenueChange(index, 'city', e.target.value)} />

                                            </div>

                                            <div>
                                                <input name="additionalAddressInfo" type="text" placeholder="Adresszusatz" value={venue.additionalAddressInfo} onChange={(e) => handleVenueChange(index, 'additionalAddressInfo', e.target.value)} />
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
                            <input name="homepage" type="text" placeholder="Event Homepage" value={event.homepage} onChange={handleInputChange} />
                        </div>

                        <p className="font-weight-bold font-size-big">
                            <span className="font-weight-bold">Artist(s):</span>
                            {/* {event.artist} */}
                        </p>

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

                    <button type="submit" >speichern</button>
                    <button onClick={handleDeleteEvent}>löschen</button>
                </form>
            </article>
        </section >
    );
}


