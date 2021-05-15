import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from "react-router-dom";
import { useSpring, animated } from 'react-spring';

const Header = () => {

  const node = useRef();
  const handleClick = e => {
    if (node.current.contains(e.target)) {
      return;
    }
    toggleMenu(false);
  };

  const [isToggled, toggleMenu] = useState(false);
  const menuEffect = useSpring({
    from: {opacity: 0, height: "0vh"},
    to: {
      opacity: isToggled ? 1 : .85,
      height: isToggled ? "40vh" : "0vh",
    },
  });

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  useEffect(() => {
    isToggled ? document.body.style.overflow = 'hidden'
              : document.body.style.overflow = 'unset'

    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [isToggled]);

  return(
    <header role="banner" ref={node}>

      <div className="container">

        <span>Tomáš Kretek</span>

        <div
          className={`navButton ${isToggled ? "active" : "" }`}
          onClick={ () => toggleMenu(!isToggled)}
        >
          <div className="navButtonHamburger"></div>

        </div>

        <animated.nav style={menuEffect}>
          <ul>
            <li><NavLink exact to="/" onClick={ () => toggleMenu(false)}>FORMULÁŘ</NavLink></li>
            <li><NavLink to="/clanky" onClick={ () => toggleMenu(false)}>ČLÁNKY</NavLink></li>
          </ul>
        </animated.nav>

      </div>

    </header>
  );
}

export default Header;
