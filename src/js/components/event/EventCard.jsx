
export default function EventCard( {event: { _id, eventTitle, artist, eventType, eventCategory, img, description, homepage, dateStart, dateEnd, timeStart, timeEnd, venueName, venueType, venues }}) {
    return (
        <div key={_id} className="Card" style={{ width: '15em', background: 'white', border: '1px #DDE1E6 solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex', margin: "15px", minHeight: "100%" }}>
            <img className="PlaceholderPicture" style={{ alignSelf: 'stretch', width: "100%", minHeight: "50px", background: 'linear-gradient(0deg, #DDE1E6 0%, #DDE1E6 100%)' }} src={img} />
            <div className="Content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', alignSelf: 'stretch', paddingTop: 24, paddingBottom: 16, paddingLeft: 16, paddingRight: 16, gap: 16 }}>
                <div className="artists" style={{ fontSize: 20, fontWeight: '700', }}>{artist} </div>
                <div className="eventTitle" >{eventTitle}</div>
                <div className="eventType" > <b>Event Typ:</b> {eventType}</div>
                <div className="eventCategory" > <b>Kategorie:</b> {eventCategory}</div>
                <a href={homepage}>Homepage</a>
                <div className="dateStart" > <b>Von:</b> {`${dateStart} ${timeStart}`}</div>
                <div className="dateEnd" >  <b>Bis:</b> {`${dateEnd} ${timeEnd}`}</div>
                <div className="venueName" > <b>Ort:</b> {venueName}</div>

                
                {venues.map((venue) => {
                    return (
                        <>
                            {/* <div><b>Adresse:</b> {(venue.street && venue.houseNumber) ? `${venue.street} ${venue.houseNumber},` : "" }  {venue.zipCode} {venue.city}</div> */}
                            <div><b>Adresse:</b> {(venue.street && venue.houseNumber) && `${venue.street} ${venue.houseNumber},`}  {venue.zipCode} {venue.city}</div>

                            <div>{venue.additionalAddressInfo}</div>
                        </>
                    );
                })}
                <div className="venueType" > <b>Typ von Veranstaltungsort:</b> {venueType}</div>
                <p className="description" style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '14em',
                    maxHeight: '100px'
                }}> <b>Beschreibung:</b> {description}</p>
            </div>
        </div>
    )
}
