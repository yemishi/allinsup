import { useGlobalState } from "../../App"

import { useState, useEffect } from "react"
import Logout from "./Logout";
import Login from "./Login";
export default function User() {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [tel, setTel] = useState<string>('');
    const { state } = useGlobalState()

    useEffect(() => {
        const fetchData = async () => {
            const telStorage = localStorage.getItem("tel") as string

            if (telStorage) {
                setTel(telStorage)
                setIsAuth(true)
            } else setIsAuth(false)
        }
        fetchData()

    }, [state.userOpen])

    return (
        <>
            {state.userOpen ? (isAuth ? <Logout setIsAuth={setIsAuth} tel={tel} /> : <Login />) : null}
        </>
    );
}