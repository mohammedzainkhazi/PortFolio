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
import { Link } from "react-router-dom";

export default function NavBar(props) {
  const [openNavbar, setOpenNavbar] = useState(false);
  

  return (
    <Navbar color="blueGray" className="m-3 rounded-lg">
        <NavbarContainer>
            <div className="flex lg:flex-row flex-col lg:items-center justify-between w-full">
            <NavbarWrapper>
                <NavbarBrand ><H5 color="light">RootZain 👑</H5></NavbarBrand>
                <NavbarToggler
                    color="white"
                    onClick={() => setOpenNavbar(!openNavbar)}
                    ripple="light"
                />
            </NavbarWrapper>

            <div>
            <NavbarCollapse open={openNavbar}>
                <div className="flex lg:flex-row flex-col w-full">
                    <Link to={'/home'}>
                    <NavLink ripple="light" onClick={() => setOpenNavbar(!openNavbar)}>
                        <Icon name="home" size="xl" />
                        Home
                    </NavLink>
                    </Link>
                    <Link to={'/projects'}>
                    <NavLink ripple="light" onClick={() => setOpenNavbar(!openNavbar)}>
                        <Icon name="code" size="xl" />
                        Projects
                    </NavLink>
                    </Link>
                    <Link to={'/education'}>
                    <NavLink ripple="light" onClick={() => setOpenNavbar(!openNavbar)}>
                        <Icon name="book" size="xl" />
                        Education
                    </NavLink>
                    </Link>
                    <Link to={'/resume'}>
                    <NavLink ripple="light" onClick={() => setOpenNavbar(!openNavbar)}>
                        <Icon name="note" size="xl" />
                        Resume
                    </NavLink>
                    </Link>
                    <Link to={'/contact'}>
                    <NavLink ripple="light" onClick={() => setOpenNavbar(!openNavbar)}>
                        <Icon name="call" size="xl" />
                        Contact
                    </NavLink>
                    </Link>
                </div>
            </NavbarCollapse>
            </div>
            <div className={`${!openNavbar && 'lg:block hidden'}`}>
            {/* <NavbarWrapper >
                <NavbarBrand ><H5 color="light">RootZain 👑</H5></NavbarBrand>
            </NavbarWrapper> */}
            <a download={'Mohammed Zain Khazi Resume.pdf'} href={props.resume} className="flex flex-row gap-2 items-center bg-white text-black rounded-full px-4 py-2 focus:outline-none ring-none opacity-[0.9] hover:opacity-[1]">Resume <Icon name="download"/> </a>
            </div>
            </div>
        </NavbarContainer>
    </Navbar>
  );
}