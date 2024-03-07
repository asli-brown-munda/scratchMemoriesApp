import BootstrapContainer from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BootstrapNavbar from "react-bootstrap/Navbar";

const Navbar = function ({ routes }) {
  return (
    <>
      <BootstrapNavbar bg="#0D47A1" data-bs-theme="dark" shadow="1px">
        <BootstrapContainer className="text-center">
          <Nav className="mx-auto">
            {routes.map((route) => {
              if (route.showOnHomeScreen !== false) {
                return (
                  <Nav.Link
                    href={route.route}
                    fontWeight="regular"
                    className="me-3"
                  >
                    {route.name}
                  </Nav.Link>
                );
              } else {
                return null;
              }
            })}
          </Nav>
        </BootstrapContainer>
      </BootstrapNavbar>
    </>
  );
};

export default Navbar;
