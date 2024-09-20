import React, { useState } from "react";
import "./nav-bar.css";
import logo from "../../assets/logo.png";
import eng from "../../assets/icons/eng.png";
import ru from "../../assets/icons/ru.png";
import zn from "../../assets/icons/zn.png";
import avatar from "../../assets/icons/user-default.jpg";
import { NavLink } from "react-router-dom";
import { ReactComponent as Menu } from "../../assets/icons/burger-menu.svg";
import { useSelector } from "react-redux";

function NavBar() {
  const [menu, setMenu] = useState(false);
  const userData = useSelector((state) => state.user);

  return (
    <nav>
      <div className="container nav_wrapper">
        <div className="nav_wrapper_icon">
          <NavLink to="/">
            <img src={logo} alt="" />
          </NavLink>
          <NavLink to="/">
            <h2>Bonus Return</h2>
          </NavLink>
          <p>настоящий кэшбэк</p>
        </div>
        <div className="nav_wrapper_menu">
          <NavLink to="/sellers">
            <p>Селлерам</p>
          </NavLink>
          <NavLink to="">
            <p>Покупателям</p>
          </NavLink>
        </div>
        <div className="nav_wrapper_right">
          {!userData.is_logged ? (
            <div className="nav_wrapper_login">
              <NavLink to="/login">
                <button>Вход</button>
              </NavLink>
              <NavLink to="/login">
                <button>Регистрация</button>
              </NavLink>
              <div className="nav_burger" onClick={() => setMenu(!menu)}>
                <Menu />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="nav_lang_toggler">
            <div>
              <img src={eng} alt="" />
              <p>EN</p>
            </div>
            <div>
              <img src={ru} alt="" />
              <p>RU</p>
            </div>
            <div>
              <img src={zn} alt="" />
              <p>ZN</p>
            </div>
          </div>
          {userData.is_logged ? (
            <NavLink to="">
              <div className="nav_user_profile">
                <img src={avatar} alt="" />
                <div>
                  <h4>{userData.name}</h4>
                  <p>{userData.email || userData.username}</p>
                </div>
              </div>
            </NavLink>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={menu ? "mobile_nav visible_mobile_nav" : "mobile_nav"}>
        <div className="mobile_nav_toggler">
          <div className="nav_lang_toggler">
            <div>
              <img src={eng} alt="" />
              <p>EN</p>
            </div>
            <div>
              <img src={ru} alt="" />
              <p>RU</p>
            </div>
            <div>
              <img src={zn} alt="" />
              <p>ZN</p>
            </div>
          </div>
          <Menu onClick={() => setMenu(!menu)} />
        </div>

        <div className="nav_wrapper_menu">
          <NavLink to="">
            <p>Главная</p>
          </NavLink>
          <NavLink to="/sellers">
            <p>Селлерам</p>
          </NavLink>
          <NavLink to="">
            <p>Магазинам</p>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
