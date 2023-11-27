
import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SelectComponent from '../SelectComponent.jsx';
import { EventContext } from '../../context/EventContext.jsx';
import ReactDatePicker from 'react-datepicker';
import './filtet.scss';
import '../datePiker/react-datepicker.css';

const Filter = ({ open, setOpen, setSearch_btn, setEventType, setVenueType, eventType, venueType, dateStart, setDateStart, dateEnd, setDateEnd }) => {
    const { eventTypes, venueTypes, eventCategories } = useContext(EventContext);
    const [eventCategory, setEventCategory] = useState("");

    const onChange = (dates) => {
        const [start, end] = dates;
        setDateStart(start);
        setDateEnd(end);
    };

    const handleEventCategoryChange = (evt) => {
        setEventCategory(evt.target.value);
    };

    const handleEventTypeChange = (evt) => {
        setEventType(evt.target.value);
    };

    const handleVenueTypeChange = (evt) => {
        setVenueType(evt.target.value);
    };
    const handleClose = () => setOpen(false);
    const handleSubmit = () => {
        setSearch_btn(true);
        handleClose();
    }

    const handleClear = () => {
        setSearch_btn(true);
        setEventType("All");
        setVenueType("All");
        setDateStart("");
        setDateEnd("");
        handleClose();
    }


    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box>
                <ReactDatePicker
                    selected={dateStart ? dateStart : new Date()}
                    dateFormat="dd/MM/yyyy"
                    onChange={onChange}
                    startDate={dateStart}
                    endDate={dateEnd}
                    selectsRange
                    inline
                />
                {/* <SelectComponent title="Event-Kategorie" value={eventCategory} values={eventCategories} onChange={handleEventCategoryChange} /> */}
                <SelectComponent
                    title="Event Type"
                    values={eventTypes}
                    onChange={handleEventTypeChange}
                    selected={eventType}
                />
                <SelectComponent
                    title="Venue Type"
                    values={venueTypes}
                    onChange={handleVenueTypeChange}
                    selected={venueType}
                />
                <div className='modal_buttons'>
                    <button onClick={handleClear}>clear</button>
                    <button onClick={handleSubmit}>Suchen</button>
                </div>
            </Box>
        </Modal>
    )
};

export default Filter;