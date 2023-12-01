import React, { useState } from 'react';

import "./ArtistInputs.scss"

const ArtistInputs = ({ artist, index, onArtistChange }) => {

    // console.log(artist)

    const handleChange = (e) => {
        const updatedArtist = { ...artist, [e.target.name]: e.target.value };
        onArtistChange(index, updatedArtist);
    };

    return (
        // <div id="artist-inputs">
        //     <div>
        <input
            name="artistName"
            required
            value={artist.artistName}
            onChange={handleChange}
            placeholder="Artist Name"
        />
        // <input
        //     name="artistType"
        //     value={artist.artistType}
        //     onChange={handleChange}
        //     placeholder="Artist Type"
        // />
        // <input
        //     name="artistHomepage"
        //     value={artist.artistHomepage}
        //     onChange={handleChange}
        //     placeholder="Artist Homepage"
        // />
        // <input
        //     name="artistImg"
        //     value={artist.artistImg}
        //     onChange={handleChange}
        //     placeholder="Artist Image"
        // />
        //     </div>
        //     <div>
        //         <textarea
        //             size="sm"
        //             placeholder="Artist Description"
        //             // rows="5"
        //             // cols="20"
        //             maxLength="2000"
        //             name="artistDescription"
        //             value={artist.artistDescription}
        //             onChange={handleChange}
        //         />
        //     </div>
        // </div>
    );
};

export default ArtistInputs;
