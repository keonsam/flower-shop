import { ReactNode, useEffect } from "react";
import { Role } from "../../types/user"
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

type Props = {
    element: ReactNode;
    role?: Role;
}

export default function ProtectedRoute({ element, role = Role.USER}: Props) {

    const { isLogIn, user } = useAuth();

    const navigate = useNavigate();


    useEffect(() => {
    if (!isLogIn()) {
        navigate("/login");
        return;
    }

    if (user.role !== role) {
        navigate("/dashboard");
        return;
    }
    }, [isLogIn, user.role, role, navigate])

    return element;
}
