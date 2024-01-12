import { useGlobalState } from "../../App";
import Login from "./Login";

export default function User() {

    const { state } = useGlobalState();

    return (
        <>
            {state.userOpen && < Login />}
        </>
    );
}
