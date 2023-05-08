import { Link } from 'react-router-dom'
import { BiLogIn } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
const Header = () => {
    const location = useLocation();
    const { auth,setAuth } = useContext(AuthContext);
    const handleLogOut = () => {
        setAuth({});
        sessionStorage.removeItem('user');
    }
    
    return (
      <header className="header">
            <img src={require("../../images/devrev-library.png")} alt="header" />
            {location.pathname === "/" && <>
                {!auth.username ? (
                    <Link
                        className="login-link"
                        style={{ color: "white", fontSize: "1.2rem" }}
                        to="/login"
                    >
                        <BiLogIn style={{ margin: "-0.2rem 0.3rem" }} />
                        Login
                    </Link>
                ) : (
                    <>
                        <span style={{ fontSize: "1.2rem", alignSelf: "flex-end" }}>
                            <FaUserAlt style={{ margin: "0 0.3rem" }} />
                            {auth.username} <span onClick={() => handleLogOut()} style={{ marginLeft: "1rem", textDecoration: "underline", cursor: "pointer" }}>LogOut</span>
                        </span>
                    </>
          
                )}  </>}
      </header>
    );
}
export default Header