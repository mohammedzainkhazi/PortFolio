import React, { useState } from "react";
import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import Nav from "@material-tailwind/react/Nav";
import NavLink from "@material-tailwind/react/NavLink";
import Icon from "@material-tailwind/react/Icon";
import H5 from "@material-tailwind/react/Heading5";

export default function Main() {
  const [openNavbar, setOpenNavbar] = useState(false);

  return (
    <Navbar color="blueGray" className="m-3 rounded-lg">
        <NavbarContainer>
            <NavbarWrapper>
                <NavbarBrand ><H5 color="light">RootZain 👑</H5></NavbarBrand>
                <NavbarToggler
                    color="white"
                    onClick={() => setOpenNavbar(!openNavbar)}
                    ripple="light"
                />
            </NavbarWrapper>

            <NavbarCollapse open={openNavbar}>
                <Nav>
                    <NavLink href="#Home"ripple="light">
                        <Icon name="home" size="xl" />
                        Home
                    </NavLink>
                    <NavLink href="#Projects" ripple="light">
                        <Icon name="code" size="xl" />
                        Projects
                    </NavLink>
                    <NavLink href="#Education" ripple="light">
                        <Icon name="book" size="xl" />
                        Education
                    </NavLink>
                    <NavLink href="#Contact" ripple="light">
                        <Icon name="call" size="xl" />
                        Contact
                    </NavLink>
                </Nav>
            </NavbarCollapse>
        </NavbarContainer>
    </Navbar>
  );
}