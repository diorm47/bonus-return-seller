import React, { useEffect, useState } from "react";
import "./login.css";
import logo from "../../assets/logo.png";
import girl from "../../assets/images/login-img.png";
import tg from "../../assets/icons/Telegram App.png";
import open_pass from "../../assets/icons/open-pass.png";
import done from "../../assets/icons/done.png";
import hiddden_pass from "../../assets/icons/hidden-pass.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUserAction } from "../../redux/user-reducer";
import { mainApi } from "../../components/utils/main-api";
import Snackbar from "../../components/snackbar/snackbar";
// const isEmail = (input) => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(input);
// };

function Login() {
  const location = useLocation();

  const getTgAuthResult = () => {
    const searchParams = new URLSearchParams(location.hash.substring(1));
    return searchParams.get("tgAuthResult");
  };

  const tgAuthResult = getTgAuthResult();
  // snackbar
  const [visibleSnack, setVisibleSnack] = useState(false);
  const [snackText, setSnackText] = useState("");
  const [snackStatus, setSnackStatus] = useState("");
  const snackOptions = (text, status) => {
    setVisibleSnack(true);
    setSnackText(text);
    setSnackStatus(status);
    setTimeout(() => {
      setVisibleSnack(false);
    }, 2000);
  };
  const navigate = useNavigate();
  const [auth, setAuth] = useState(true);
  const [policy, setPolicy] = useState(true);
  const [remember, setRemember] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [createPas, setCreatePas] = useState(false);
  const [createPas2, setCreatePas2] = useState(false);

  //
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createPassword, setCreatePassword] = useState("");
  const [createPassword2, setCreatePassword2] = useState("");

  const refreshToken = async () => {
    const data = {
      refresh_token: localStorage.getItem("refresh"),
    };

    mainApi
      .updateToken(data)
      .then((userData) => {
        localStorage.setItem("token", userData.access_token);
       
      })
      .catch((err) => {});
  };

  const refresh = () => {
    fetch("https://api-seller.bonusreturn.ru/api/v1/seller/get-me/", {
      method: "GET",
      headers: {
        "Api-Key": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => dispatch(loginUserAction(data.data)))
      .catch((error) => refreshToken());
  };

  const login = async () => {
    const data = {
      password: createPassword || password,
      login: email,
    };

    mainApi
      .loginAction(data)
      .then((userData) => {
        localStorage.setItem("token", userData.access_token);
        localStorage.setItem("refresh", userData.refresh_token);
        const is_logged = {
          is_logged: true,
        };
        dispatch(loginUserAction(is_logged));
        refresh();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        let errorMessage = "An error occurred";
        if (err.detail && Array.isArray(err.detail) && err.detail.length > 0) {
          errorMessage = err.detail[0].msg || err.detail[0].message || "Error";
        }
        snackOptions(err.error || errorMessage, "error");
      });
  };

  // auth
  const authorize = async () => {
    const data = {
      login: email,
      password: createPassword,
      password_confirmation: createPassword2,
    };

    mainApi
      .authorizationAction(data)
      .then((userData) => {
        login(createPassword);
      })
      .catch((err) => {
        console.log("error");
        // login(createPassword);
        snackOptions(err.error, "error");
      });
  };

  const tgLoginAction = async (data) => {
    mainApi
      .tgLogin({
        tgAuthResult: data,
      })
      .then((userData) => {
        localStorage.setItem("token", userData.access_token);
        localStorage.setItem("refresh", userData.refresh_token);

        const is_logged = {
          is_logged: true,
        };
        dispatch(loginUserAction(is_logged));
        refresh();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        let errorMessage = "An error occurred";
        if (err.detail && Array.isArray(err.detail) && err.detail.length > 0) {
          errorMessage = err.detail[0].msg || err.detail[0].message || "Error";
        }
        snackOptions(err.message || errorMessage, "error");
      });
  };

  useEffect(() => {
    if (tgAuthResult) {
      tgLoginAction(tgAuthResult);
    }
  }, [tgAuthResult]);
  return (
    <>
      <div className="login_page">
        <div className="login_left">
          <NavLink to="/">
            <div className="login_left_logo">
              <img src={logo} alt="" />
              <h1>Bonus Return</h1>
            </div>
          </NavLink>
          <h2>
            Осталось только <br />
            зарегистрироваться
          </h2>
          <p>
            “Bonus return” добавлен в браузер, чтобы продолжить, пожалуйста,{" "}
            <br />
            зарегистрируйтесь или войдите в аккаунт
          </p>
          <img src={girl} alt="" />
        </div>
        <div className="login_right">
          <div className="login_right_togglers">
            <p
              onClick={() => setAuth(true)}
              className={auth ? "login_right_toggler_active" : ""}
            >
              Регистрация
            </p>
            <p
              onClick={() => setAuth(false)}
              className={!auth ? "login_right_toggler_active" : ""}
            >
              Войти
            </p>
          </div>
          <a href="https://api.bonusreturn.ru/api/v1/client/telegram-login/">
            <div className="login_tg">
              <img src={tg} alt="" />
              <p>
                Регистрация с помощью <b>Telegram</b>
              </p>
            </div>
          </a>
          <div className="login_right_line"></div>
          {/* <div className="login_right_desc">
            <p>С помощью e-mail или номера телефона</p>
          </div> */}
          <div className="login_form">
            <div className="login_form_input">
              <input
                type="text"
                placeholder="Введите e-mail или номера телефона"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {auth ? (
              <div className="auth_part">
                <div className="login_form_input">
                  <input
                    type={!createPas ? "password" : "text"}
                    placeholder="Создайте пароль"
                    value={createPassword}
                    onChange={(e) => setCreatePassword(e.target.value)}
                  />
                  {createPas ? (
                    <img
                      src={hiddden_pass}
                      alt=""
                      onClick={() => setCreatePas(false)}
                    />
                  ) : (
                    <img
                      src={open_pass}
                      alt=""
                      onClick={() => setCreatePas(true)}
                    />
                  )}
                </div>
                <div className="login_form_input">
                  <input
                    type={!createPas2 ? "password" : "text"}
                    placeholder="Введите пароль еще раз"
                    value={createPassword2}
                    onChange={(e) => setCreatePassword2(e.target.value)}
                  />
                  {createPas2 ? (
                    <img
                      src={hiddden_pass}
                      alt=""
                      onClick={() => setCreatePas2(false)}
                    />
                  ) : (
                    <img
                      src={open_pass}
                      alt=""
                      onClick={() => setCreatePas2(true)}
                    />
                  )}
                </div>

                <div className="login_btn">
                  <button onClick={authorize}>Зарегистрироваться</button>
                </div>
                <div className="login_form_check">
                  <div
                    className="login_form_check_input"
                    onClick={() => setPolicy(!policy)}
                  >
                    {policy ? <img src={done} alt="" /> : ""}
                  </div>
                  <p>
                    присоединиавшись, вы соглашаетесь с
                    <NavLink to=""> Условиями использования сервиса </NavLink> и{" "}
                    <NavLink to="">Политикикой конфииденциальности</NavLink>
                  </p>
                </div>
              </div>
            ) : (
              <div className="auth_part">
                <div className="login_form_input">
                  <input
                    type={!showPass ? "password" : "text"}
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {showPass ? (
                    <img
                      src={hiddden_pass}
                      alt=""
                      onClick={() => setShowPass(false)}
                    />
                  ) : (
                    <img
                      src={open_pass}
                      alt=""
                      onClick={() => setShowPass(true)}
                    />
                  )}
                </div>

                <div className="login_btn">
                  <button onClick={login}>Войти</button>
                </div>
                <div className="login_form_check">
                  <div
                    className="login_form_check_input"
                    onClick={() => setRemember(!remember)}
                  >
                    {remember ? <img src={done} alt="" /> : ""}
                  </div>
                  <p>Запомнить меня</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Snackbar text={snackText} status={snackStatus} visible={visibleSnack} />
    </>
  );
}

export default Login;
