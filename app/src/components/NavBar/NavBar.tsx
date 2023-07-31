import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./NavBar.module.css";
import { useAuth } from "../../context/AuthContext";
import Header from "../Header/Header";
import { Role } from "../../types/user";

const NavBar = () => {
  const navigate = useNavigate();
  const { logOut, user } = useAuth();

  const handleLogOut = () => {
    logOut();
    navigate('/login')
  };

  return (
    <header className={styles.navBar}>
      <Header title="Flowers" variant="h1"/>
      <nav>
        <Link className={styles.navLink} to="/dashboard">Home</Link>
        { user.role === Role.ADMIN && <Link className={styles.navLink} to="/manage-customers">Manage</Link> }
        <Button label="log out" primary size="small" onClick={handleLogOut} />
      </nav>
    </header>
  );
};

export default NavBar;
