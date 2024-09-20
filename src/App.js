import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/footer/footer";
import NavBar from "./components/nav-bar/nav-bar";

import Login from "./pages/login-page/login";
import Sellers from "./pages/sellers/sellers";
import { loginUserAction } from "./redux/user-reducer";
import { mainApi } from "./components/utils/main-api";
import Cashback from "./pages/cashback/cashback";

import SellersDashboard from "./pages/dashboard-seller/dashboard-seller";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
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
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetch("https://api-seller.bonusreturn.ru/api/v1/seller/get-me/", {
        method: "GET",
        headers: {
          "Api-Key": localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((data) => dispatch(loginUserAction(data.data)))
        .catch((error) => refreshToken());
    }
  }, []);

  return (
    <>
      {location.pathname !== "/login" ? <NavBar /> : ""}

      <div className="pages_content">
        <Routes>
          <Route path="/" element={<SellersDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sellers" element={<SellersDashboard />} />
        </Routes>
      </div>

      {location.pathname !== "/login" ? <Footer /> : ""}
    </>
  );
}

export default App;
