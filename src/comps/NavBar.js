import { useState } from "react";
import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import NavLink from "@material-tailwind/react/NavLink";
import H5 from "@material-tailwind/react/Heading5";
import { Link, useLocation } from "react-router-dom";
import { AcademicCapIcon, BeakerIcon, BookOpenIcon, CodeIcon, DocumentIcon, PhoneIcon, SparklesIcon } from '@heroicons/react/solid';



export default function NavBar(props) {
    const [openNavbar, setOpenNavbar] = useState(false);

    const icons = [<BeakerIcon height={24} width={24} />, <CodeIcon height={24} width={24} />, <BookOpenIcon height={24} width={24} />, <AcademicCapIcon height={24} width={24} />, <DocumentIcon height={24} width={24} />, <PhoneIcon height={24} width={24} />];

    const route = useLocation().pathname.replace('/', '');
    console.log(route);


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
                                {
                                    ['home', 'projects', 'skills', 'education', 'resume', 'contact'].map((nav, i) => (
                                        <Link to={nav} key={i}>
                                            <NavLink ripple="light" style={{ backgroundColor: nav === route ? 'white' : '', color: nav === route ? 'black' : '' }} onClick={() => setOpenNavbar(!openNavbar)}>
                                                {icons[i]}
                                                {nav.toUpperCase()}
                                            </NavLink>
                                        </Link>
                                    ))
                                }
                                {/* <Link to={'/resume'} className="hidden lg:block">
                                    <NavLink ripple="light" style={{ backgroundColor: 'resume' === route ? 'white' : '', color: 'resume' === route ? 'black' : '' }} onClick={() => setOpenNavbar(!openNavbar)}>
                                        <Icon name="note" size="xl" />
                                        Resume
                                    </NavLink>
                                </Link> */}
                            </div>
                        </NavbarCollapse>
                    </div>
                    <div className={`${!openNavbar && 'lg:block hidden'}`}>
                        <Link to={'/aichat'}>
                            <p className="flex flex-row gap-2 items-center bg-white text-black rounded-full px-4 py-2 focus:outline-none ring-none opacity-[0.9] cursor-pointer hover:opacity-[1]"><SparklesIcon color="gold" height={24} width={24} />Talk to Me</p>
                        </Link>
                    </div>
                </div>
            </NavbarContainer>
        </Navbar>
    );
}