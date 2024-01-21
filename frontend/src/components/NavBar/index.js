import BootstrapContainer from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BootstrapNavbar from "react-bootstrap/Navbar";

const Navbar = function ({ routes }) {
  return (
    <>
      <BootstrapNavbar bg="#0D47A1" data-bs-theme="dark" shadow="1px">
        <BootstrapContainer>
          <Nav className="me-auto">
            {routes.map((route) => {
              if (route.showOnHomeScreen !== false) {
                return (
                  <>
                    <Nav.Link href={route.route} fontWeight="regular">
                      {route.name}
                    </Nav.Link>
                  </>
                );
              } else {
                return <></>;
              }
            })}
          </Nav>
        </BootstrapContainer>
      </BootstrapNavbar>
    </>
  );
};

export default Navbar;
