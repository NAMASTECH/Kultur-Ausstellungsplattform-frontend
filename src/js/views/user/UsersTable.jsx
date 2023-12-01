import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";
import PaginationComponent from "../../components/PaginationComponent";
import "./MyEvents.scss"

export default function UsersTable() {
    const [data, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [all, setAll] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const { userData } = useAuthStore();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/events/organizer/${userData.organizerId}`, {
            withCredentials: true,
            params: {
                page,
                limit,
            }
        })
            .then(resp => {
                setUsers(resp.data.events);
                setAll(resp.data.totalCount);
            })
            .catch(err => {
                console.error(err);
            });
    }, [page]);

    useEffect(() => {
        setTotalPages(Math.ceil(all / limit));
    }, [all, limit]);

    const navigate = useNavigate();

    const handleEditClick = (eventId) => {
        navigate(`/event/edit/${eventId}`);
    };

    const handleStateEvent = async (e) => {
        const id = e.target.value.split("T")[0];

        const message = e.target.value.split("T")[1] == 'true' ? 'Deaktivieren' : 'Aktivire';
        if (window.confirm(`Sind Sie sicher, dass sie dieses Event ${message} möchten?`)) {
            try {
                const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/events/deactivate/${id}`, {
                    withCredentials: true
                });
                // Handle the response, for example, redirect to another page or update the state
                console.log('Event updated!', response.data);
            } catch (error) {
                // Handle the error, for example, show an error message
                console.error('Error deleting event:', error.response.data);
            }
        }
    };


    const userRows = data.map(data => {
        return (
            <tr key={data._id} className={!data.isActive ? 'isCanceled' : ''}>
                <td>{data.eventTitle}</td>
                <td>{data.dateStart.split("T")[0]}</td>
                <td>{data.dateEnd.split("T")[0]}</td>
                <td>{data.venues.map(at => <span key={at._id}>{at.venueName}</span>)}</td>
                <td className="button"><button className="disable" value={data._id + "T" + data.isActive} onClick={handleStateEvent} >{!data.isActive ? 'Aktivire' : 'Deaktivieren'}</button></td>
                <td className="button"><button className="update" onClick={() => handleEditClick(data._id)}>Bearbeiten <br /><span>Bearbeitet {data.updatedAt.split("T")[0]}</span></button></td>
            </tr>
        );
    });

    return (
        <div id="myEvents">

            {
                (data.length > 0)
                    ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Event title</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Venue Name</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {userRows}
                            </tbody>
                        </table>

                    )
                    : <h3 id="login_message">Sie haben noch keine Events erstellt.</h3>

            }

            {(data.length > 0) && (
                <PaginationComponent totalPages={totalPages} currentPage={page} onPageChange={setPage} />
            )}
        </div>
    );
}