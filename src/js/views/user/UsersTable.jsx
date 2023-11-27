import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import PaginationComponent from "../../components/PaginationComponent";

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
    }, [ page ]);

    useEffect(() => {
        setTotalPages(Math.ceil(all / limit));
    }, [all, limit]);


    const userRows = data.map(data => {
        return (
            <tr key={data._id}>
                <td>{data.eventTitle}</td>
                <td>{data.dateStart.split("T")[0]}</td>
                <td>{data.dateEnd.split("T")[0]}</td>
                <td>{data.venues.map(at => <span key={at._id}>{at.venueName}</span>)}</td>
                <td className="button"><button className="disable">Deaktivieren</button></td>
                <td className="button"><button className="update">Bearbeiten <br /><span>Bearbeitet {data.updatedAt.split("T")[0]}</span></button></td>
            </tr>
        );
    });

    return (
        <>
            <h2 className="title">All Events</h2>
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
                : <h3>No Users found!</h3>

            }

            {(data.length > 0) && (
                <PaginationComponent totalPages={totalPages} currentPage={page} onPageChange={setPage} />   
            )}
        </>
    );
}