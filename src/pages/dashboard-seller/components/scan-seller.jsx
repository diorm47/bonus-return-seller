import React, { useState } from "react";
import { mainApi } from "../../../components/utils/main-api";
import { ReactComponent as NonChecked } from "../../../assets/icons/not-checked.svg";
import { ReactComponent as Checked } from "../../../assets/icons/checked.svg";
import seller_un from "../../../assets/images/seller-unau.png";
import seller_a from "../../../assets/images/seller-au.png";
import Snackbar from "../../../components/snackbar/snackbar";

function ScanSeller({ refresh, isVerified }) {
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

  const [token, setToken] = useState();
  const checkToken = () => {
    if (token) {
      mainApi
        .postToken({
          wb_api_statistics_token: token,
        })
        .then(() => {
          snackOptions("API токен успешно подключен", "success");
          refresh();
        })
        .catch((err) => {
          snackOptions(err.detail, "error");
        });
    }
  };
  return (
    <>
      <div className="seller_scan">
        {isVerified ? (
          <img src={seller_a} alt="" />
        ) : (
          <img src={seller_un} alt="" />
        )}

        <div className="seller_scan_block">
          <h2>Добрый день</h2>
          {isVerified ? (
            <>
              <div className="seller_scan_title">
                <Checked />
                <p>Проверенный продавец</p>
              </div>
              <h2>Вы подключены</h2>
            </>
          ) : (
            <>
              <div className="seller_scan_title">
                <NonChecked />
                <p>Вы не проверенный продавец</p>
              </div>
              <h2>Проверка и подключение продавца</h2>
              <p className="main_text">
                Создайте токен и укажите, к каким функциям Wildberries он
                разрешает доступ, укажите “Только на чтение“ (по токену нельзя
                будет ничего поменять)Контент, Статистика, Аналитика,
                Продвижения, рекомендации -
                <span className="main_link">получить токен</span>
              </p>
            </>
          )}

          <div className="add_seller_token">
            <input
              type="text"
              placeholder="API токен статистики только для чтения"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              disabled={isVerified}
            />
            <button onClick={checkToken} disabled={isVerified}>
              Добавить
            </button>
          </div>
          <div className="add_seller_desc">
            <div className="add_seller_desc_badge">
              {!isVerified ? (
                <p className="main_text">
                  После прохождения проверки, Вы получите Знак
                </p>
              ) : (
                ""
              )}

              <div>
                <Checked />
                <p>Проверенный продавец</p>
              </div>
            </div>

            <p className="main_text">
              Если у Вас есть вопросы -{" "}
              <a href="#" className="main_link">
                свяжитесь с нами
              </a>
            </p>
          </div>
        </div>
      </div>
      <Snackbar text={snackText} status={snackStatus} visible={visibleSnack} />
    </>
  );
}

export default ScanSeller;
