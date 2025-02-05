import useLocalStorage from "../../hooks/useLocalStorage";
import axios from "axios";
import { setUser } from "../../app/userSlice";

export const initializeAuth = async (navigate, dispatch) => {
    const { user, session } = useLocalStorage();

    if (!user || !session) {
        if (window.location.pathname === "/login") {
            navigate("/login")
        }
        else {
            navigate("/home");
        }
        return;
    }
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/getUser`, {
            params: { user }
        });

        if (response.data.success === false) {
            navigate("/login");
        } else {
            const { user, name, email, company, session, sq, turnover, businessGrowth, finePaid,finePaidByGroup, personalityInfo, answered, connected, } = response.data;
            dispatch(setUser({
                user,
                name,
                email, 
                company, 
                session, 
                finePaidByGroup,
                sq, 
                turnover, 
                businessGrowth, 
                finePaid, 
                personalityInfo, 
                answered,
                connectionRequested: connected
            }));
        }
    } catch (error) {
        console.error("Error initializing authentication:", error);
        navigate("/login");
    }
};