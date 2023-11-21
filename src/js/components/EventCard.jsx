import { useNavigate } from "react-router-dom";
import "./EventCard.scss";
export default function EventCard({
  event: {
    _id,
    eventTitle,
    artist,
    eventType,
    eventCategory,
    img,
    description,
    homepage,
    dateStart,
    dateEnd,
    timeStart,
    timeEnd,
    venueName,
    venueType,
    venues,
  },
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/event/${_id}`);
  };

  return (
    <div key={_id} onClick={handleClick} className="gallery-card">
      <div className="gallery-card-image-container">
        <p className="eventType">{eventType}</p>

        <img className="gallery-card-image " src={img} alt="image" />
      </div>
      <div className="card-content">
        <div className="dateStart">
          {" "}
          <b>Von:</b> {`${dateStart.split("T")[0]} ${timeStart}`}
        </div>
        <div className="dateEnd">
          {" "}
          <b>Bis:</b> {`${dateEnd.split("T")[0]} ${timeEnd}`}
        </div>
        <div className="artists">{artist} </div>
        <div className="eventTitle">{eventTitle}</div>

        <div className="eventCategory">
          {" "}
          <b>Kategorie:</b> {eventCategory}
        </div>
        <a href={homepage}>Homepage</a>

        {venues.map((venue) => {
          return (
            <div key={venue._id} className="venue-info">
              <div className="venueName">
                {" "}
                <b>Ort:</b> {venue.venueName}
              </div>
              <div className="venueType">
                {" "}
                <b>Typ von Veranstaltungsort:</b> {venue.venueType}
              </div>
              <div className="venue-address">
                <b>Adresse:</b>{" "}
                {venue.street &&
                  venue.houseNumber &&
                  `${venue.street} ${venue.houseNumber},`}{" "}
                {venue.zipCode} {venue.city}
              </div>
              <div className="venue-additionalAddressInfo">
                {venue.additionalAddressInfo}
              </div>
            </div>
          );
        })}

        {/* <p className="description" style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '14em',
                    maxHeight: '100px'
                }}> <b>Beschreibung:</b> {description}</p> */}
      </div>
    </div>
  );
}
