import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { ReactComponent as Search } from "../../assets/icons/search.svg";
import { ReactComponent as Snipet } from "../../assets/icons/snippet.svg";
import { ReactComponent as Stars } from "../../assets/icons/stars.svg";
import { ReactComponent as VK } from "../../assets/icons/vk.svg";
import megamarket from "../../assets/images/mega.png";
import "../../components/card/card.css";
import "./cashback.css";
import { ReactComponent as TalkToUs } from "../../assets/icons/talk-tous.svg";

import { ReactComponent as ArrLeft } from "../../assets/icons/arr-left.svg";
import { ReactComponent as ArrRight } from "../../assets/icons/arr-right.svg";
import market from "../../assets/icons/market.png";
import ozonm from "../../assets/icons/ozonm.png";
import ava from "../../assets/images/ava.png";
import gift from "../../assets/images/gift.png";
import rev1 from "../../assets/images/rev-1.png";
import rev2 from "../../assets/images/rev-2.png";
import rev3 from "../../assets/images/rev-3.png";
import Card from "../../components/card/card";
import Snackbar from "../../components/snackbar/snackbar";
import { mainApi } from "../../components/utils/main-api";
import { NavLink } from "react-router-dom";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className="car_arrow car_arrow_left" onClick={onClick}>
      <ArrLeft />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="car_arrow car_arrow_right" onClick={onClick}>
      <ArrRight />
    </div>
  );
}

function Cashback() {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  // snackbar
  const [visibleSnack, setVisibleSnack] = useState(false);
  const [snackText, setSnackText] = useState("");
  const [applyLink, setApplyLink] = useState("");
  const [snackStatus, setSnackStatus] = useState("");
  const snackOptions = (text, status) => {
    setVisibleSnack(true);
    setSnackText(text);
    setSnackStatus(status);
    setTimeout(() => {
      setVisibleSnack(false);
    }, 2000);
  };
  const settings = {
    arrows: false,
    slidesToScroll: 1,
    infinite: false,
    dots: true,
    slidesToShow: 1,
    speed: 1000,
  };
  const settings2 = {
    arrows: true,
    slidesToScroll: 2,
    infinite: true,
    dots: false,
    slidesToShow: 4,
    speed: 1000,
    variableWidth: true,
    nextArrow: <SamplePrevArrow />,
    prevArrow: <SampleNextArrow />,
  };

  const [cpiData, setCpiData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [limit, setLimit] = useState(30);

  const getCpi = () => {
    mainApi
      .getCPILinksPage(`cashback&offset=0&limit=${limit}`)
      .then((userData) => {
        setCpiData(userData.data);
      })
      .catch(() => {
        console.log("error");
      });
  };

  const search = (data) => {
    mainApi
      .homeSearch(data)
      .then((userData) => {
        console.log(userData);
      })
      .catch(() => {
        console.log("error");
      });
  };

  const getCategoriesActions = () => {
    mainApi
      .getCategories()
      .then((userData) => {
        setCategories(userData.data);
      })
      .catch(() => {
        console.log("error");
      });
  };

  useEffect(() => {
    getCategoriesActions();
  }, []);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const applySellerLink = () => {
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

  const getMore = () => {
    setLimit(limit + 30);
  };
  useEffect(() => {
    getCpi();
  }, [limit]);
  return (
    <>
      <div className="home_page">
        <div className="home_header container">
          <div className="home_header_left">
            <div className="home_header_search_wrapper">
              <div className="home_header_search">
                <input
                  type="text"
                  placeholder="Поиск магазинов и товаров с кэшбэком"
                  onChange={(e) => search(e.target.value)}
                />
                <Search />
              </div>
              <div className="search_descs">
                <p>
                  Например: <b>Aliexpress,</b> iHerb, Banggood
                </p>
                <p>
                  <a href="https://chromewebstore.google.com/detail/bonus-return/bhaooeoeilecdjlkidolbiljhkdboekc?hl=ru&utm_source=ext_sidebar">
                    <span>Расширение</span>
                  </a>{" "}
                  для покупок с кэшбэком
                </p>
              </div>
            </div>
            <div className="home_header_left_title">
              <h1>
                как получить кэшбэк <br />
                за онлайн покупку
              </h1>
            </div>
            <div className="home_header_left_steps">
              <div>
                <p>
                  Перейти на магазин <br />
                  <b>Bonus Return</b>
                </p>
              </div>
              <div>
                <p>
                  Сделайте заказ <br />
                  на выбранном сайте
                </p>
              </div>
              <div>
                <p>
                  Получите <br />и выведите кэшбэк
                </p>
              </div>
            </div>
          </div>
          <div className="cashbacks_right">
            <div className="cashbacks_right_title">
              <h2>
                Вам доступен <span>(1)</span> подарок
              </h2>
              <p>за проведенную оплату</p>
            </div>
            <div className="get_cashback_input">
              <a href="#">
                <button>Выбрать</button>
              </a>
            </div>
            <img src={gift} alt="" />
          </div>
        </div>
        <div className="categories_filter container">
          <h2>По категориям</h2>

          <div className="categories_filter_car">
            <Slider {...settings2}>
              <div>
                <div
                  className="home_navigation_item"
                  onClick={() => setSelectedCategories("")}
                >
                  <p>Все</p>
                </div>
              </div>
              {categories.map((item) => (
                <div>
                  <div
                    className={
                      selectedCategories == item.id
                        ? "home_navigation_item home_navigation_item_selected"
                        : "home_navigation_item"
                    }
                    key={item.id}
                    onClick={() => setSelectedCategories(item.id)}
                  >
                    <p>{item.name}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="last_orders container">
          <div className="last_orders_title">
            <h2>Магазины с кэшбэком</h2>
          </div>
          <div className="last_orders_list last_orders_list_cashback">
            {cpiData && cpiData.length > 0
              ? cpiData.map((item, index) =>
                  item.type === "cashback" ? (
                    <Card item={item} key={index} />
                  ) : null
                )
              : ""}
          </div>
          <div className="cashback_actions">
            <button onClick={getMore}>Показать еще </button>
            <button onClick={toTop}>В начало</button>
          </div>
        </div>
        <div className="talk_to_us download_snipet container">
          <div className="talk_to_us_desc">
            <div className="cashback_stores_title">
              <h3>Устанавливайте расширение Bonus Return</h3>
              <p>
                Наше дополнение для браузера не позволит забыть <br /> о кэшбэк
                и напомнит о нем
              </p>
            </div>
            <div className="get_cashback_input">
              <a href="https://chromewebstore.google.com/detail/bonus-return/bhaooeoeilecdjlkidolbiljhkdboekc?hl=ru&utm_source=ext_sidebar">
                <button>Подробнее</button>
              </a>
            </div>
          </div>
          <Snipet />
        </div>
        <div className="last_orders container pt_100px">
          <div className="last_orders_list last_orders_list_cashback">
            {cpiData && cpiData.length > 0
              ? cpiData.map((item, index) => <Card item={item} key={index} />)
              : ""}
          </div>
          <div className="cashback_actions">
            <button>Показать еще </button>
            <button onClick={toTop}>В начало</button>
          </div>
        </div>

        <div className="join_us container">
          <div className="join_us_left">
            <h2>
              Вступай в самое большое <br />
              кэшбэк сообщество
            </h2>
            <div className="get_cashback_input">
              <a href="https://vk.ru/bonusreturn">
                <button>Перейти в группу</button>
              </a>
            </div>
          </div>
          <div className="join_us_img">
            <VK />
          </div>
        </div>
        <div className="last_orders container pt_100px">
          <div className="last_orders_list last_orders_list_cashback">
            {cpiData && cpiData.length > 0
              ? cpiData.map((item, index) =>
                  item.type === "cashback" ? (
                    <Card item={item} key={index} />
                  ) : null
                )
              : ""}
          </div>
          <div className="cashback_actions">
            <button onClick={getMore}>Показать еще </button>
            <button onClick={toTop}>В начало</button>
          </div>
        </div>
        <div className="talk_to_us container">
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
              <button onClick={applySellerLink}>Подключить</button>
            </div>
          </div>
          <div className="talk_to_us_img">
            <TalkToUs />
          </div>
        </div>
      </div>

      <Snackbar text={snackText} status={snackStatus} visible={visibleSnack} />
    </>
  );
}

export default Cashback;
