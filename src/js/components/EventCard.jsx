import { useNavigate } from "react-router-dom";
import "./EventCard.scss";
export default function EventCard({
  event: {
    _id,
    eventTitle,
    artists,
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
    organizer,
    isActive,
  },
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/event/${_id}`);
  };

  const formatArtistNames = (artists) => {
    if (artists.length > 3) {
      return "mehrere Künstler";
    }
    return artists.map(artist => artist.artistName.toUpperCase()).join(', ');
  };

  return (
    <div key={_id} onClick={isActive ? handleClick : () => {}} className={!isActive ? 'isCanceled gallery-card': 'gallery-card'}>
      <div className="gallery-card-image-container">
        {/* <p className="eventType">{venues[0].venueType}</p> */}
        <p className="eventType">{eventType}</p>
        <img className="gallery-card-image" src={img} alt="image" />
      </div>
      <div className="card-content">
        <div className="dateStart">
          {`${dateStart.split("T")[0]} - ${dateEnd.split("T")[0]}`}
        </div>
        {/* <div className="artists">{artists[0].artistName.toUpperCase()} </div> */}
        <div className="artists">
          {formatArtistNames(artists)}
        </div>
        <div className="eventTitle">{eventTitle}</div>
        <div className="organizer">{organizer[0] && organizer[0].organization}</div>
      </div>
    </div>
  );
}
