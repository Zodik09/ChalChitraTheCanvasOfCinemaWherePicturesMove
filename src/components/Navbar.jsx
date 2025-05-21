import { NavLink } from "react-router-dom";

import {
  IoHomeOutline,
  IoHomeSharp,
  IoTvOutline,
  IoTvSharp,
} from "react-icons/io5";
import { BiCameraMovie, BiSolidCameraMovie } from "react-icons/bi";
import { MdSportsBasketball, MdOutlineSportsBasketball } from "react-icons/md";
import { RiSearch2Line, RiSearch2Fill } from "react-icons/ri";

const Navbar = () => {
  let navs = [
    {
      src: "/",
      name: "Home",
      nonSelected: <IoHomeOutline size={20} color="#808080" />,
      selected: <IoHomeSharp size={20} color="#ffffff" />,
    },
    {
      src: "/tvShows",
      name: "TV Shows",
      nonSelected: <IoTvOutline size={20} color="#808080" />,
      selected: <IoTvSharp size={20} color="#ffffff" />,
    },
    {
      src: "/movies",
      name: "Movies",
      nonSelected: <BiCameraMovie size={20} color="#808080" />,
      selected: <BiSolidCameraMovie size={20} color="#ffffff" />,
    },
    {
      src: "/sports",
      name: "Sports",
      nonSelected: <MdOutlineSportsBasketball size={20} color="#808080" />,
      selected: <MdSportsBasketball size={20} color="#ffffff" />,
    },
    {
      src: "/search",
      name: "Search",
      nonSelected: <RiSearch2Line size={20} color="#808080" />,
      selected: <RiSearch2Fill size={20} color="#ffffff" />,
    },
  ];

  let navLinks = navs.map((nav, index) => {
    return (
      <NavLink key={index} to={nav.src}>
        {({ isActive }) => (
          <span
            className={`flex flex-col justify-between items-center gap-1 font-['FontBold'] text-sm text-[#808080] ${isActive && 'text-white font-[FontBold]'} transition-all duration-1000 ease-in-out`}
          >
            {isActive ? nav.selected : nav.nonSelected}
            {nav.name}
          </span>
        )}
      </NavLink>
    );
  });
  return (
    <nav className="fixed bg-black w-full py-2 px-5 bottom-0 left-0 z-50 flex justify-between items-center">
      {navLinks}
    </nav>
  );
};

export default Navbar;
