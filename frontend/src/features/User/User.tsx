import { useGlobalState } from "../../App"
import loginRequest from "./services/axios.config";
import { useState, useEffect } from "react"
import Logout from "./Logout";
import Login from "./Login";
export default function User() {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [tel, setTel] = useState<string>('');
    const { userOpen } = useGlobalState()

    useEffect(() => {
        const fetchData = async () => {
            const response = await loginRequest.checkAuth()
            setTel(response.user.tel)
            setIsAuth(response.isAuthenticated)
        }
        fetchData()

    }, [userOpen])

    return (
        <>
            {userOpen ? (isAuth ? <Logout setIsAuth={setIsAuth} tel={tel} /> : <Login />) : null}
        </>
    );
}