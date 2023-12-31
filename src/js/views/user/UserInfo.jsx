import { useState } from "react";
import axios from "axios";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";

export default function UserInfo() {
    const [userInfo, setUserInfo] = useState(null);
    const { userId } = useParams();
    const { clearUserData } = useAuthStore();


    const handleGetInfoBtnClick = async evt => {
        try {
            const resp = await api.get(`/users/${userId}`, {
                withCredentials: true
            });
            console.log(resp.data);

            setUserInfo(resp.data);

        } catch (error) {
            console.error(error);

            // Unauthorized (Token nicht da oder abgelaufen)
            if (error.response.status === 401) {
                try {
                    await api.get(`/auth/logout`, {
                        withCredentials: true
                    });
                    clearUserData();

                } catch (error) {
                    console.error(error);
                }
            }
        }
    };

    return (
        <div>
            <button
                onClick={handleGetInfoBtnClick}
            >Request user info</button>
            <pre>
                {
                    userInfo && JSON.stringify(userInfo)
                }
            </pre>
        </div>
    );
};