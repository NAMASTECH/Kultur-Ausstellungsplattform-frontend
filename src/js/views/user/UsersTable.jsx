import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import PaginationComponent from "../../components/PaginationComponent";

export default function UsersTable() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20); 
    const [all, setAll] = useState(0); 
    const [totalPages, setTotalPages] = useState(1);

    const { userData } = useAuthStore();
    console.log(page);
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


    const userRows = users.map(user => {
        return (
            <tr key={user._id}>
                <td>{user.eventTitle}</td>
                <td>{user.dateStart.split("T")[0]}</td>
                <td>{user.dateEnd.split("T")[0]}</td>
                <td>{user.createdAt.split("T")[0]}</td>
                <td>{user.updatedAt.split("T")[0]}</td>
                <td><button>disable</button></td>
                <td><button>update</button></td>
            </tr>
        );
    });

    return (
        <>
            <h2>All Users</h2>
            {
                (users.length > 0)
                ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Event title</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                                <th>Disable</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userRows}
                        </tbody>
                    </table>
                    
                )
                : <h3>No Users found!</h3>

            }

            {(users.length > 0) && (
                <PaginationComponent totalPages={totalPages} currentPage={page} onPageChange={setPage} />   
            )}
        </>
    );
}