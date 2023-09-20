import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { useSelector } from "react-redux";

export const NavigationBar = ({ /* user, */ onLoggedOut }) => {

  // redux
  const movies = useSelector((state) => state.movies.movies); 
  const user = useSelector((state) => state.user.user);
  
  const navLinkStyle = { color: "#09066f" };
  const brandStyle = { color: "#09066f", fontWeight: "bold" };
  const navbarStyle = {
    backgroundImage: 'linear-gradient(70deg, #e0cee7 0%, #CC8FE9 100%)',
    boxShadow: '0px 2px 10px rgba(9, 6, 111, 0.4)',
    border: 'none'    
  };


  return (
    <Navbar expand="lg" style={navbarStyle} className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" style={brandStyle}>
          myFlix <span style={{ fontSize: '0.7em' }}>App</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler">
          <span className="navbar-toggler-icon"></span> 
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" style={navLinkStyle}>
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login" style={navLinkStyle}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" style={navLinkStyle}>
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/" style={navLinkStyle}>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" style={navLinkStyle}>
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut} style={navLinkStyle}>
                  Logout
                </Nav.Link>
              </>
            )}            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};