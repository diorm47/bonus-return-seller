import React, { useEffect, useState } from "react";
import rect from "../../assets/icons/Rectangle 205.png";
import right_arrow from "../../assets/icons/Right Arrow.png";
import { ReactComponent as FaqArrow } from "../../assets/icons/faq-arrow.svg";
import { ReactComponent as Fav } from "../../assets/icons/favorite.svg";
import { ReactComponent as Gift } from "../../assets/icons/gift.svg";
import online from "../../assets/icons/online.png";
import { ReactComponent as Share } from "../../assets/icons/share.svg";
import { ReactComponent as Verified } from "../../assets/icons/verified.svg";
import { ReactComponent as Phone } from "../../assets/images/sellers-cashback.svg";
import support from "../../assets/images/support.png";
import logo from "../../assets/logo.png";
import DateNavigator from "../../components/date-navigator/date-navigator";
import Snackbar from "../../components/snackbar/snackbar";
import { mainApi } from "../../components/utils/main-api";
import "./sellers.css";
import { ReactComponent as TalkToUs } from "../../assets/icons/talk-tous.svg";
import qr from "../../assets/images/qr-code sellers.gif";
import { NavLink } from "react-router-dom";

function Sellers() {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
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
  const [faq1, setFaq1] = useState(false);
  const [faq2, setFaq2] = useState(false);
  const [faq3, setFaq3] = useState(false);
  const [faq4, setFaq4] = useState(false);
  const [cpiData, setCpiData] = useState([]);
  const [cahback1, setCashback1] = useState(1);
  const [cahback2, setCashback2] = useState(2);
  const [cahback3, setCashback3] = useState(3);
  const getCpi = () => {
    mainApi
      .getCPILinks()
      .then((userData) => {
        setCpiData(userData.data);
      })
      .catch(() => {
        console.log("error");
      });
  };
  useEffect(() => {
    getCpi();
  }, []);
  const hours = ["09:00", "12:00", "14:00", "16:00", "18:00", "20:00"];

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [email, setEmail] = useState("");
  const [applyLink, setApplyLink] = useState("");
  const applySellerLink = () => {
    const data = {
      date: selectedDate,
      time: selectedTime,
      email: email,
    };
    mainApi
      .applyConsulting(data)
      .then((userData) => {
        snackOptions("Вы успешно записаны на консультацию!", "success");
      })
      .catch((err) => {
        console.log(err);
        let errorMessage = "Ошибка!";
        if (err.detail && Array.isArray(err.detail) && err.detail.length > 0) {
          errorMessage = err.detail[0].msg || err.detail[0].message || "Error";
        }
        snackOptions(err.message || errorMessage, "error");

      });
  };
  const handleChange = (e) => {
    const value = e.target.value;
    const cleanedValue = value.replace(/[^0-9]/g, "");
    if (cleanedValue.length <= 4) {
      const formattedValue =
        cleanedValue.length > 2
          ? cleanedValue.slice(0, 2) + ":" + cleanedValue.slice(2)
          : cleanedValue;

      setSelectedTime(formattedValue);
    }
  };

  const applySellerLinkMarket = () => {
    const data = {
      link: applyLink,
    };
    mainApi
      .applySellerCon(data)
      .then((userData) => {
        snackOptions("Подключено успешно", "success");
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
  return (
    <>
      <div className="sellers_header container">
        <div className="sellers_header_left">
          <div className="home_header_left_title">
            <h2>
              РешаеМ задачи бизнеса используя <br />
              кэшбэк Bonus ПРОМОКОДЫ
            </h2>
            <p>
              Мы помогаем брендам и селлерам увеличивать прибыль <br /> с
              помощью перфоманс-продуктов
            </p>
          </div>
          <div className="home_header_left_stats">
            <div className="home_header_left_stat_item">
              <h3>491 924</h3>
              <div>
                <p>
                  <span>+ 18 724</span> за месяц
                </p>
              </div>
              <h4>кэшбэк за месяц</h4>
            </div>
            <div className="home_header_left_stat_item">
              <h3>14 607</h3>
              <div>
                <p>
                  <span>+ 778</span> за месяц
                </p>
              </div>
              <h4>
                подключено <br /> селлеров
              </h4>
            </div>
            <div className="home_header_left_stat_item home_header_left_stat_item_online">
              <h3>463</h3>
              <div>
                <img src={online} alt="" />
                <p>online</p>
              </div>
              <h4>
                подключено <br /> брендов
              </h4>
            </div>
          </div>
          <div className="sellers_header_left_filters">
            <h3>Механики мотивации конечных потребителей товаров</h3>
            <div className="stores_rev_filter main_p container">
              <p>Скидки</p>
              <p>Промокоды</p>
              <p>Акции</p>
              <p>Конкурсы</p>
              <p>Бонусы с чека</p>
              <p>Кэшбек</p>
              <p>Распродажи</p>
              <p>Коды с упаковки</p>
              <p>Подарок от бренда</p>
            </div>
          </div>
        </div>
        <div className="sellers_header_date">
          <DateNavigator
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <div className="sellers_header_hours">
            {hours.map((time, index) => (
              <div
                key={index}
                className={
                  selectedTime == time ? "sellers_header_hour_selected" : ""
                }
                onClick={() => setSelectedTime(time)}
              >
                <p>{time}</p>
              </div>
            ))}

            <input
              type="text"
              placeholder="00:00"
              value={selectedTime}
              onChange={handleChange}
              maxLength={5}
              style={{
                MozAppearance: "textfield",
                appearance: "textfield",
              }}
            />
          </div>
          <div className="sellers_header_date_consult">
            <h4>Записаться на консультацию</h4>
            <div className="exchange_money_input">
              <input
                type="email"
                className="main_input"
                placeholder="Введите свой e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={applySellerLink}>
                <img src={right_arrow} alt="" />
              </button>
            </div>
            <p>
              Каждый бизнес уникален! Успешные кейсы — это результат, который
              виден только в конце пути!
            </p>
            <p>
              {" "}
              Обсудите с нами возможности роста продаж вашего бизнеса за 30
              минут!
            </p>
          </div>
        </div>
      </div>
      <div className="sellers_quests container">
        <h2>Сравнение кэшбек механик и обычной рекламы</h2>
        <div className="sellers_quests_list">
          <div className="sellers_quest_item">
            <div
              className={
                faq1
                  ? "sellers_quest_item_title sellers_quest_item_title_visible"
                  : "sellers_quest_item_title"
              }
              onClick={() => setFaq1(!faq1)}
            >
              <h3>Высокая рентабельность кэшбека?</h3>
              <FaqArrow />
            </div>
            <div
              className={
                faq1
                  ? "sellers_quest_item_data sellers_quest_item_data_visible"
                  : "sellers_quest_item_data"
              }
            >
              <p>
                Кэшбек механики: Вознаграждая покупателей за отзывы,
                вы вкладываете средства напрямую в стимулирование продаж
                и улучшение репутации своего товара. Каждый рубль, потраченный
                на кэшбек, возвращается к вам в виде повышенной лояльности
                и дополнительных продаж.
              </p>
              <p>
                {" "}
                Обычная реклама: Значительная часть рекламного бюджета
                расходуется на привлечение внимания, которое не всегда
                конвертируется в покупки. Эффективность рекламы может быть
                непредсказуемой и зависит от множества внешних факторов.
              </p>
            </div>
          </div>
          <div className="sellers_quest_item">
            <div
              className={
                faq2
                  ? "sellers_quest_item_title sellers_quest_item_title_visible"
                  : "sellers_quest_item_title"
              }
              onClick={() => setFaq2(!faq2)}
            >
              <h3>Увеличение числа отзывов за счет кэшбека?</h3>
              <FaqArrow />
            </div>
            <div
              className={
                faq2
                  ? "sellers_quest_item_data sellers_quest_item_data_visible"
                  : "sellers_quest_item_data"
              }
            >
              <p>
                Кэшбек механики: Покупатели мотивированы оставлять отзывы,
                чтобы получить кэшбек, что приводит к увеличению количества
                и качества отзывов. Положительные отзывы помогают создать
                доверие к вашему бренду.
              </p>
              <p>
                Обычная реклама: Реклама привлекает внимание, но не всегда
                стимулирует клиентов оставлять отзывы. Без отзывов,
                потенциальные покупатели могут сомневаться в выборе вашего
                товара.
              </p>
            </div>
          </div>
          <div className="sellers_quest_item">
            <div
              className={
                faq3
                  ? "sellers_quest_item_title sellers_quest_item_title_visible"
                  : "sellers_quest_item_title"
              }
              onClick={() => setFaq3(!faq3)}
            >
              <h3>Снижение затрат на маркетинг за счет кэшбека?</h3>
              <FaqArrow />
            </div>
            <div
              className={
                faq3
                  ? "sellers_quest_item_data sellers_quest_item_data_visible"
                  : "sellers_quest_item_data"
              }
            >
              <p>
                Кэшбек механики: Средства, потраченные на кэшбек, возвращаются
                вам в виде увеличения продаж и повторных покупок. Это делает
                кэшбек программы более экономически эффективными.
              </p>
              <p>
                Обычная реклама: Расходы на рекламу могут быть значительными,
                и не всегда приводят к желаемому увеличению продаж.
                Эффективность рекламы сложно предсказать, что увеличивает риски.
              </p>
            </div>
          </div>
          <div className="sellers_quest_item">
            <div
              className={
                faq4
                  ? "sellers_quest_item_title sellers_quest_item_title_visible"
                  : "sellers_quest_item_title"
              }
              onClick={() => setFaq4(!faq4)}
            >
              <h3>Целевой подход</h3>
              <FaqArrow />
            </div>
            <div
              className={
                faq4
                  ? "sellers_quest_item_data sellers_quest_item_data_visible"
                  : "sellers_quest_item_data"
              }
            >
              <p>
                Кэшбек механики: Средства, потраченные на кэшбек, возвращаются
                вам в виде увеличения продаж и повторных покупок. Это делает
                кэшбек программы более экономически эффективными.
              </p>
              <p>
                Обычная реклама: Расходы на рекламу могут быть значительными,
                и не всегда приводят к желаемому увеличению продаж.
                Эффективность рекламы сложно предсказать, что увеличивает риски.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="cashback_now container">
        <div className="cashback_now_left">
          <h3>
            Активируйте кэшбек программу <br />
            прямо сейчас
          </h3>
          <p>
            и ощутите эффективность, которая превзойдет <br />
            ожидания от обычной рекламы!
          </p>
        </div>
        <div className="cashback_now_right">
          <div className="cashback_now_right_qr">
            <img src={qr} alt="" />
          </div>
          <Phone />
        </div>
      </div>
      <div className="bonus_activate container">
        <div className="bonus_activate_card">
          <div className="bonus_activate_card_title">
            <img src={logo} alt="" />
            <h4>Активировать бонус на выбор</h4>
          </div>
          <div className="bonus_activate_card_filters">
            <div
              className={
                cahback1 == 1
                  ? "bonus_activate_card_filter bonus_activate_card_filter_selected"
                  : "bonus_activate_card_filter"
              }
              onClick={() => setCashback1(1)}
            >
              <p>кэшбек</p>
            </div>
            <div
              className={
                cahback1 == 2
                  ? "bonus_activate_card_filter bonus_activate_card_filter_selected"
                  : "bonus_activate_card_filter"
              }
              onClick={() => setCashback1(2)}
            >
              <p>промокод</p>
            </div>
            <div
              className={
                cahback1 == 3
                  ? "bonus_activate_card_filter bonus_activate_card_filter_selected"
                  : "bonus_activate_card_filter"
              }
              onClick={() => setCashback1(3)}
            >
              <p>кэшбек за отзыв</p>
            </div>
          </div>
          {cahback1 == 1 ? (
            <div className="bonus_activate_cashback">
              <div className="bonus_activate_cashback_percent">
                <p>
                  <span>до</span> 4.93%
                </p>
              </div>
              <button className="top_10_store_card_btn">Активировать</button>
              <div className="bonus_activate_cashback_time">
                <p>00:00</p>
                <div>
                  <span>минут</span>
                  <span>секунд</span>
                </div>
              </div>
              <div className="bonus_activate_cashback_warn">
                <p>Кэшбек начислиться после покупки</p>
              </div>
            </div>
          ) : (
            ""
          )}
          {cahback1 == 2 ? (
            <div className="bonus_activate_promo">
              <div className="bonus_activate_promo_title">
                <h5>можно обменять после покупки</h5>
              </div>
              <div className="bonus_activate_promo_data">
                <div className="bonus_activate_cashback_time">
                  <p>500</p>
                  <div>
                    <span>на рубли</span>
                  </div>
                </div>
                <div className="bonus_activate_promo_data_open">
                  <button className="top_10_store_card_btn">
                    открыть промокод
                  </button>
                  <span>Дата окончания: 00 месяца в 23:59</span>
                </div>
              </div>
              <div className="bonus_activate_promo_data aic">
                <div className="bonus_activate_cashback_time">
                  <p>2000</p>
                  <div>
                    <span>
                      на скидку известных <br />
                      брендов
                    </span>
                  </div>
                </div>
                <div className="bonus_activate_promo_data_open">
                  <button className="top_10_store_card_btn">
                    открыть промокод
                  </button>
                  <span>Дата окончания: 00 месяца в 23:59</span>
                </div>
              </div>
              <div className="bonus_activate_promo_btns">
                <button>читать обзор</button>
                <button>поделиться бонусом</button>
              </div>
              <div className="bonus_activate_cashback_warn">
                <p>Проверенный продавец</p>
              </div>
            </div>
          ) : (
            ""
          )}
          {cahback1 == 3 ? (
            <div className="bonus_activate_review">
              <div className="bonus_activate_review_title">
                <h4>
                  Получайте кэшбэк <br />
                  на ваши покупки до 50%!
                </h4>
                <p>
                  Напишите нам несколько <br />
                  приятных слов о вашей покупке
                </p>
              </div>
              <button className="top_10_store_card_btn">Активировать</button>
              <div className="bonus_activate_cashback_warn">
                <p>
                  Активируйте сейчас - кэшбек начисляется <br />
                  после размещения отзыва
                </p>
              </div>
              <div className="verified_seller">
                <Verified />
                <p>Проверенный продавец</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="bonus_activate_card">
          <div className="bonus_activate_card_title">
            <img src={logo} alt="" />
            <h4>Активировать бонус на выбор</h4>
          </div>
          <div className="bonus_activate_card_filters">
            <div
              className={
                cahback2 == 1
                  ? "bonus_activate_card_filter bonus_activate_card_filter_selected"
                  : "bonus_activate_card_filter"
              }
              onClick={() => setCashback2(1)}
            >
              <p>кэшбек</p>
            </div>
            <div
              className={
                cahback2 == 2
                  ? "bonus_activate_card_filter bonus_activate_card_filter_selected"
                  : "bonus_activate_card_filter"
              }
              onClick={() => setCashback2(2)}
            >
              <p>промокод</p>
            </div>
            <div
              className={
                cahback2 == 3
                  ? "bonus_activate_card_filter bonus_activate_card_filter_selected"
                  : "bonus_activate_card_filter"
              }
              onClick={() => setCashback2(3)}
            >
              <p>кэшбек за отзыв</p>
            </div>
          </div>
          {cahback2 == 1 ? (
            <div className="bonus_activate_cashback">
              <div className="bonus_activate_cashback_percent">
                <p>
                  <span>до</span> 4.93%
                </p>
              </div>
              <button className="top_10_store_card_btn">Активировать</button>
              <div className="bonus_activate_cashback_time">
                <p>00:00</p>
                <div>
                  <span>минут</span>
                  <span>секунд</span>
                </div>
              </div>
              <div className="bonus_activate_cashback_warn">
                <p>Кэшбек начислиться после покупки</p>
              </div>
            </div>
          ) : (
            ""
          )}
          {cahback2 == 2 ? (
            <div className="bonus_activate_promo">
              <div className="bonus_activate_promo_title">
                <h5>можно обменять после покупки</h5>
              </div>
              <div className="bonus_activate_promo_data">
                <div className="bonus_activate_cashback_time">
                  <p>500</p>
                  <div>
                    <span>на рубли</span>
                  </div>
                </div>
                <div className="bonus_activate_promo_data_open">
                  <button className="top_10_store_card_btn">
                    открыть промокод
                  </button>
                  <span>Дата окончания: 00 месяца в 23:59</span>
                </div>
              </div>
              <div className="bonus_activate_promo_data aic">
                <div className="bonus_activate_cashback_time">
                  <p>2000</p>
                  <div>
                    <span>
                      на скидку известных <br />
                      брендов
                    </span>
                  </div>
                </div>
                <div className="bonus_activate_promo_data_open">
                  <button className="top_10_store_card_btn">
                    открыть промокод
                  </button>
                  <span>Дата окончания: 00 месяца в 23:59</span>
                </div>
              </div>
              <div className="bonus_activate_promo_btns">
                <button>читать обзор</button>
                <button>поделиться бонусом</button>
              </div>
              <div className="bonus_activate_cashback_warn">
                <p>Проверенный продавец</p>
              </div>
            </div>
          ) : (
            ""
          )}
          {cahback2 == 3 ? (
            <div className="bonus_activate_review">
              <div className="bonus_activate_review_title">
                <h4>
                  Получайте кэшбэк <br />
                  на ваши покупки до 50%!
                </h4>
                <p>
                  Напишите нам несколько <br />
                  приятных слов о вашей покупке
                </p>
              </div>
              <button className="top_10_store_card_btn">Активировать</button>
              <div className="bonus_activate_cashback_warn">
                <p>
                  Активируйте сейчас - кэшбек начисляется <br />
                  после размещения отзыва
                </p>
              </div>
              <div className="verified_seller">
                <Verified />
                <p>Проверенный продавец</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="bonus_activate_card">
          <div className="bonus_activate_card_title">
            <img src={logo} alt="" />
            <h4>Активировать бонус на выбор</h4>
          </div>
          <div className="bonus_activate_card_filters">
            <div
              className={
                cahback3 == 1
                  ? "bonus_activate_card_filter bonus_activate_card_filter_selected"
                  : "bonus_activate_card_filter"
              }
              onClick={() => setCashback2(1)}
            >
              <p>кэшбек</p>
            </div>
            <div
              className={
                cahback3 == 2
                  ? "bonus_activate_card_filter bonus_activate_card_filter_selected"
                  : "bonus_activate_card_filter"
              }
              onClick={() => setCashback3(2)}
            >
              <p>промокод</p>
            </div>
            <div
              className={
                cahback3 == 3
                  ? "bonus_activate_card_filter bonus_activate_card_filter_selected"
                  : "bonus_activate_card_filter"
              }
              onClick={() => setCashback3(3)}
            >
              <p>кэшбек за отзыв</p>
            </div>
          </div>
          {cahback3 == 1 ? (
            <div className="bonus_activate_cashback">
              <div className="bonus_activate_cashback_percent">
                <p>
                  <span>до</span> 4.93%
                </p>
              </div>
              <button className="top_10_store_card_btn">Активировать</button>
              <div className="bonus_activate_cashback_time">
                <p>00:00</p>
                <div>
                  <span>минут</span>
                  <span>секунд</span>
                </div>
              </div>
              <div className="bonus_activate_cashback_warn">
                <p>Кэшбек начислиться после покупки</p>
              </div>
            </div>
          ) : (
            ""
          )}
          {cahback3 == 2 ? (
            <div className="bonus_activate_promo">
              <div className="bonus_activate_promo_title">
                <h5>можно обменять после покупки</h5>
              </div>
              <div className="bonus_activate_promo_data">
                <div className="bonus_activate_cashback_time">
                  <p>500</p>
                  <div>
                    <span>на рубли</span>
                  </div>
                </div>
                <div className="bonus_activate_promo_data_open">
                  <button className="top_10_store_card_btn">
                    открыть промокод
                  </button>
                  <span>Дата окончания: 00 месяца в 23:59</span>
                </div>
              </div>
              <div className="bonus_activate_promo_data aic">
                <div className="bonus_activate_cashback_time">
                  <p>2000</p>
                  <div>
                    <span>
                      на скидку известных <br />
                      брендов
                    </span>
                  </div>
                </div>
                <div className="bonus_activate_promo_data_open">
                  <button className="top_10_store_card_btn">
                    открыть промокод
                  </button>
                  <span>Дата окончания: 00 месяца в 23:59</span>
                </div>
              </div>
              <div className="bonus_activate_promo_btns">
                <button>читать обзор</button>
                <button>поделиться бонусом</button>
              </div>
              <div className="bonus_activate_cashback_warn">
                <p>Проверенный продавец</p>
              </div>
            </div>
          ) : (
            ""
          )}
          {cahback3 == 3 ? (
            <div className="bonus_activate_review">
              <div className="bonus_activate_review_title">
                <h4>
                  Получайте кэшбэк <br />
                  на ваши покупки до 50%!
                </h4>
                <p>
                  Напишите нам несколько <br />
                  приятных слов о вашей покупке
                </p>
              </div>
              <button className="top_10_store_card_btn">Активировать</button>
              <div className="bonus_activate_cashback_warn">
                <p>
                  Активируйте сейчас - кэшбек начисляется <br />
                  после размещения отзыва
                </p>
              </div>
              <div className="verified_seller">
                <Verified />
                <p>Проверенный продавец</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="all_stores">
          <div>
            <h5>
              Расскажи <br />о товаре
            </h5>
            <p>
              Напишите о любых товарах, разместите на них ссылки и заработайте
              на этом
            </p>
            <button>Написать обзор</button>
          </div>
        </div>
      </div>

      <div className="support_block container">
        <div className="support_block_title">
          <h3>Служба поддержки всегда рядом</h3>
          <p>
            Трудности с модерацией, управлением заказами или выплатами? <br />
            Решим любые вопросы! Мы всегда на связи и готовы помочь
          </p>
        </div>
        <div className="support_block_wrapper">
          <div className="support_block_wrapper_card support_block_card1">
            <div className="support_block_card1_text">
              <h4>Напишите нам:</h4>
              <p>Бот поддержки: </p>
              <a href="mailto:hello@bonusreturn.ru">hello@bonusreturn.ru</a>
            </div>
            <div className="support_block_card1_img">
              <img src={support} alt="" />
            </div>
          </div>
          <div className="support_block_wrapper_card support_block_card2">
            <div className="support_block_card_message">
              <img src={rect} alt="" />
              <p>Благодарю за оперативность решения проблемы!</p>
            </div>
            <div className="support_block_card_message">
              <img src={rect} alt="" />
              <p>
                Как всегда блестяще сработала поддержка! <br />
                Спасибо!
              </p>
            </div>
            <div className="support_block_card_message">
              <img src={rect} alt="" />
              <p>Быстро ответили и помогли с проблемой</p>
            </div>
            <div className="support_block_card_message">
              <img src={rect} alt="" />
              <p>
                Помогли довольно быстро. Если будет повтор проблемы, обращусь
                вновь!
              </p>
            </div>
          </div>
          <div className="support_block_wrapper_card support_block_card2 support_block_card3">
            <div className="support_block_card_message">
              <img src={rect} alt="" />
              <p>Все отлично. работой тех.поддержки полностью доволен</p>
            </div>
            <div className="support_block_card_message">
              <img src={rect} alt="" />
              <p>
                Спасибо большое за информацию и оперативный, четкий и быстрый
                ответ!
              </p>
            </div>
            <div className="support_block_card_message">
              <img src={rect} alt="" />
              <p>Очень быстро, буквально за минуту ответили и решили</p>
            </div>
            <div className="support_block_card_message">
              <img src={rect} alt="" />
              <p>Благодарю за оперативность и помощь с решением вопроса</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cashback_stores_cards container">
        <div className="block_title">
          <h2>Магазины с кэшбэком</h2>
        </div>
        <div className="cashback_stores_cards_list">
          {cpiData && cpiData.length > 0
            ? cpiData.map((item, index) =>
                item.web_site_location === "lower" ? (
                  <div className="card" key={index}>
                    <div className="add_favorite">
                      <Fav />
                    </div>
                    <a href={item.cpi_url}>
                      <div className="card_img">
                        <img src={item.image_url} alt="" />
                      </div>
                    </a>
                    <div className="card_desc">
                      <div className="card_desc_t">
                        <p>{item.name}</p>
                      </div>
                      <div className="card_amount">
                        <p>до {item.cashback_up_to}</p>
                        <div>
                          <Gift />
                          <Share />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null
              )
            : ""}

          <div className="all_stores">
            <div>
              <h5>Более 3 тыс.</h5>
              <p>
                интернет-магазинов <br />и сервисов с кэшбэком
              </p>
              <button>Все магазины</button>
            </div>
          </div>
        </div>
      </div>
      <div className="talk_to_us container talk_to_us_sellers">
        <div className="talk_to_us_desc">
          <div className="cashback_stores_title">
            <h3>
              нЕ НАШЛИ НУЖНЫЙ МАГАЗИН? <br />
              РАССКАЖИТЕ НАМ
            </h3>
            <p>Мы постараемся добавить его и оповестим вас</p>
          </div>
          <div className="get_cashback_input">
            <input
              className="main_input"
              type="text"
              placeholder="Введите ссылку на магазин или товар"
              value={applyLink}
              onChange={(e) => setApplyLink(e.target.value)}
            />
            <button onClick={applySellerLinkMarket}>Подключить</button>
          </div>
        </div>
        <div className="talk_to_us_img">
          <TalkToUs />
        </div>
      </div>
      <div className="home_navigation_right sellers_promos container">
        <div className="home_navigation_title">
          <h3>Лучшие промокоды и акции</h3>
          <NavLink to="/coupon">
            <p>Смотреть все</p>
          </NavLink>
        </div>
        <div className="best_promos">
          <div className="best_promos">
            {cpiData && cpiData.length > 0
              ? cpiData.map((item, index) =>
                  item.web_site_location === "other" ? (
                    <div className="best_promo" key={index}>
                      <div className="best_promo_title">
                        <img src={item.image_url} alt="" />
                        <div>
                          <span>{item.name}</span> <br />
                          <p>{item.cashback_up_to}</p>
                        </div>
                      </div>
                      <div className="best_promo_desc">
                        <div>
                          <h2>{item.brand_name}</h2>
                          <p>
                            Действует с {item.active_since} до {item.active_to}
                          </p>
                        </div>
                        <a href={item.cpi_url}>
                          <button>Перейти к акции</button>
                        </a>
                      </div>
                    </div>
                  ) : null
                )
              : ""}
          </div>
        </div>
      </div>
      <Snackbar text={snackText} status={snackStatus} visible={visibleSnack} />
    </>
  );
}

export default Sellers;
