import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { ReactComponent as Search } from "../../assets/icons/search.svg";
import { ReactComponent as Snipet } from "../../assets/icons/snippet.svg";
import { ReactComponent as Stars } from "../../assets/icons/stars.svg";
import { ReactComponent as TalkToUs } from "../../assets/icons/talk-tous.svg";
import { ReactComponent as VK } from "../../assets/icons/vk.svg";
import megamarket from "../../assets/images/mega.png";
import { ReactComponent as Phone } from "../../assets/images/phone.svg";
import "../../components/card/card.css"; 
import "./home.css";

import right_arrow from "../../assets/icons/Right Arrow.png";
import qr from "../../assets/images/qr-code-clients.gif";

import all from "../../assets/icons/catalogues/all.png";
import big from "../../assets/icons/catalogues/big-cash.png";
import cash from "../../assets/icons/catalogues/kesh.png";
import like from "../../assets/icons/catalogues/like.png";
import new_it from "../../assets/icons/catalogues/new.png";
import promo from "../../assets/icons/catalogues/promo.png";
import saw from "../../assets/icons/catalogues/saw.png";
import wish from "../../assets/icons/catalogues/wish.png";

// import car from "../../assets/icons/categories/car.png";
// import child from "../../assets/icons/categories/children.png";
// import electro from "../../assets/icons/categories/electro.png";
// import home from "../../assets/icons/categories/home.png";
// import hotels from "../../assets/icons/categories/hotels.png";
// import sofa from "../../assets/icons/categories/sofa.png";
// import sport from "../../assets/icons/categories/sport.png";
// import watch from "../../assets/icons/categories/watch.png";
// import wears from "../../assets/icons/categories/wears.png";

import chrome from "../../assets/icons/chrome.png";
import mozila from "../../assets/icons/mozila.png";
import opera from "../../assets/icons/opera.png";
import safari from "../../assets/icons/safari.png";

import { ReactComponent as Fav } from "../../assets/icons/favorite.svg";
import { ReactComponent as Gift } from "../../assets/icons/gift.svg";
import market from "../../assets/icons/market.png";
import ozonm from "../../assets/icons/ozonm.png";
import { ReactComponent as Share } from "../../assets/icons/share.svg";
import ava from "../../assets/images/ava.png";
import rev1 from "../../assets/images/rev-1.png";
import rev2 from "../../assets/images/rev-2.png";
import rev3 from "../../assets/images/rev-3.png";
import Snackbar from "../../components/snackbar/snackbar";
import { mainApi } from "../../components/utils/main-api";
import Card from "../../components/card/card";
import { NavLink } from "react-router-dom";

function Home() {
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
  const settings = {
    arrows: false,
    slidesToScroll: 1,
    infinite: false,
    dots: true,
    slidesToShow: 1,
    speed: 1000,
  };

  const [topTen, setTopTen] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState();
  const [cpiData, setCpiData] = useState([]);
  const [feddCashId, setFeddCashId] = useState("");
  const [promocode, setPromocode] = useState("");
  const [applyLink, setApplyLink] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("");
  const filteredDataCategory = selectedCategories
    ? cpiData.filter(
        (item) =>
          item.category_id === selectedCategories && item.web_site_location === "other"
      )
    : cpiData.filter((item) => item.web_site_location === "other");
  const getTopTenCash = () => {
    mainApi
      .getTopTen()
      .then((userData) => {
        setTopTen(userData.data);
      })
      .catch(() => {
        console.log("error");
      });
  };
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
  const feedbackCash = () => {
    const data = {
      product_id: feddCashId,
      platform_id: selectedPlatform,
    };
    mainApi
      .applyFeddCash(data)
      .then((userData) => {
        console.log(userData);
        snackOptions("Кешбек успешно получен", "success");
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
  const promoCash = () => {
    const data = {
      promo_code: promocode,
    };
    mainApi
      .applyPromo(data)
      .then((userData) => {
        snackOptions("Промокод успешно обменён", "success");
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
  const getPlatformsActions = () => {
    mainApi
      .getPlatforms()
      .then((userData) => {
        setPlatforms(userData);
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
    getTopTenCash();
    getCpi();
    getPlatformsActions();
    getCategoriesActions();
  }, []);

  console.log(cpiData);
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
            <div className="last_orders">
              <div className="last_orders_title">
                <h2>Последние заказы</h2>
                <p>Заказ: 00 сек. назад</p>
                <p>Онлайн магазинов: 75757</p>
              </div>
              <div className="last_orders_list">
                {cpiData && cpiData.length > 0
                  ? cpiData.map((item, index) =>
                      item.web_site_location === "main" ? (
                        <Card item={item} key={index} />
                      ) : null
                    )
                  : ""}
                <div className="all_stores">
                  <div>
                    <h5>Более 3 тыс.</h5>
                    <p>
                      интернет-магазинов <br />и сервисов с кэшбэком
                    </p>
                    <NavLink to="/cashback">
                      <button>Все магазины</button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="home_header_right">
            <div className="cashback_stores">
              <div className="cashback_stores_title">
                <h3>
                  Кэшбэк с покупок <br />
                  на маркетплейсах
                </h3>
                <p>
                  Отправьте нам артикул или ссылку на купленный товар на
                  маркетплейсе
                </p>
              </div>
              <div className="cashback_stores_list">
                <p>Выбрать маркетплейс:</p>
                <div className="cashback_stores_lists">
                  {platforms.map((img, index) => (
                    <img
                      className={
                        selectedPlatform == img.platform_id
                          ? "selected_platform"
                          : ""
                      }
                      key={index}
                      src={img.image_url}
                      alt={img.title}
                      title={img.title}
                      onClick={() => setSelectedPlatform(img.platform_id)}
                    />
                  ))}
                </div>
              </div>
              <div className="get_cashback_input">
                <input
                  className="main_input"
                  type="text"
                  placeholder="Введите артикул или ссылку на товар"
                  value={feddCashId}
                  onChange={(e) => setFeddCashId(e.target.value)}
                />
                <button onClick={feedbackCash}>Получить кэшбэк</button>
              </div>
            </div>
            <div className="exchange_money">
              <h2>
                обменяй промокод <br />
                на деньги!
              </h2>
              <div className="exchange_money_input">
                <input
                  type="text"
                  className="main_input"
                  placeholder="Введите промокод"
                  value={promocode}
                  onChange={(e) => setPromocode(e.target.value)}
                />
                <button onClick={promoCash}>
                  <img src={right_arrow} alt="" />
                </button>
              </div>
            </div>
            <div className="join_tg_channel">
              <div className="join_tg_channel_phone">
                <Phone />
              </div>

              <div className="join_tg_channel_desc">
                <p>
                  Присоединяйтесь <br />к нашему телеграм-каналу
                </p>
                <span>Будьте в курсе самых выгодных предложений</span>
              </div>
              <div className="join_tg_channel_qr">
                <div>
                  {" "}
                  <img src={qr} alt="" />
                </div>
                <p>Наведите камеру смартфона</p>
              </div>
            </div>
          </div>
        </div>
        <div className="last_orders last_orders_section container">
          <div className="last_orders_title">
            <h2>Последние заказы</h2>
            <p>Заказ: 00 сек. назад</p>
            <p>Онлайн магазинов: 75757</p>
          </div>
          <div className="last_orders_list">
            {cpiData && cpiData.length > 0
              ? cpiData.map((item, index) =>
                  item.web_site_location === "main" ? <Card item={item} key={index} /> : null
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
        <div className="home_navigation container">
          <div className="home_navigation_left">
            <div className="home_navigation_title">
              <h3>
                Навигация <br />
                по каталогу
              </h3>
            </div>
            <div className="home_navigation_list mb_46">
              <div className="home_navigation_item">
                <img src={all} alt="" />
                <p>Все магазины</p>
              </div>
              <div className="home_navigation_item">
                <img src={wish} alt="" />
                <p>Мое избранное</p>
              </div>
              <div className="home_navigation_item">
                <img src={saw} alt="" />
                <p>Просмотренные</p>
              </div>
              <div className="home_navigation_item">
                <img src={big} alt="" />
                <p>Повышенный кэшбэк</p>
              </div>
              <div className="home_navigation_item">
                <img src={like} alt="" />
                <p>Выбор редакции</p>
              </div>
              <div className="home_navigation_item">
                <img src={new_it} alt="" />
                <p>Новые предложения</p>
              </div>
              <div className="home_navigation_item">
                <img src={promo} alt="" />
                <p>Промокод</p>
              </div>
              <div className="home_navigation_item ">
                <img src={cash} alt="" />
                <p>Кэшбэк за отзыв</p>
              </div>
            </div>
            <div className="home_navigation_title">
              <h3>По категориям</h3>
            </div>
            {/* <div className="home_navigation_list">
              <div className="home_navigation_item">
                <img src={car} alt="" />
                <p>Автотовары</p>
              </div>
              <div className="home_navigation_item">
                <img src={hotels} alt="" />
                <p>Отели, гостиницы, билеты</p>
              </div>
              <div className="home_navigation_item">
                <img src={wears} alt="" />
                <p>Одежда и обувь</p>
              </div>
              <div className="home_navigation_item">
                <img src={sport} alt="" />
                <p>Спортивные товары</p>
              </div>
              <div className="home_navigation_item">
                <img src={home} alt="" />
                <p>Все для дома и сада</p>
              </div>
              <div className="home_navigation_item">
                <img src={child} alt="" />
                <p>Детские товары</p>
              </div>
              <div className="home_navigation_item">
                <img src={electro} alt="" />
                <p>Электроника и техника</p>
              </div>
              <div className="home_navigation_item">
                <img src={sofa} alt="" />
                <p>Мебель</p>
              </div>
              <div className="home_navigation_item">
                <img src={watch} alt="" />
                <p>Украшения и часы</p>
              </div>
            </div> */}
            <div className="home_navigation_list">
              <div
                className="home_navigation_item"
                onClick={() => setSelectedCategories("")}
              >
                <p>Все</p>
              </div>
              {categories.map((item) => (
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
              ))}
            </div>
          </div>
          <div className="home_navigation_right">
            <div className="home_navigation_title">
              <h3>Лучшие промокоды и акции</h3>
              <NavLink to="/coupon">
                <p>Смотреть все</p>
              </NavLink>
            </div>
            <div className="best_promos">
              {filteredDataCategory && filteredDataCategory.length > 0 ? (
                filteredDataCategory.map((item, index) => (
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
                ))
              ) : (
                <div className="empty_catogory">
                  <p>Не найден!</p>
                </div>
              )}
            </div>
            <div className="talk_to_us">
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
        </div>
        <div className="top_10_stores container">
          <div className="block_title">
            <h2>ТОП 10 повышенный кэшбэк на маркетплейсах</h2>
          </div>
          <div className="top_10_stores_list">
            {topTen && topTen.length
              ? topTen.map((item, index) => (
                  <div className="top_10_store_card" key={index}>
                    <div className="top_10_store_card_img">
                      <img src={item.image_url} alt="" />
                    </div>
                    <div className="top_10_store_card_price">
                      <h4>
                        {item.price} {item.currency}{" "}
                      </h4>
                      <p>
                        {item.old_price} {item.currency}
                      </p>
                    </div>
                    <div className="top_10_store_card_desc">
                      <p>{item.product_name}</p>
                    </div>
                    <a href={item.product_link} target="blank">
                      <button className="top_10_store_card_btn">Купить</button>
                    </a>
                  </div>
                ))
              : ""}
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
                <NavLink to="/cashback">
                 
                  <button>Все магазины</button>
                </NavLink>
              </div>
            </div>
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
        <div className="snipet_docs container">
          <div className="snipet_docs_title">
            <h2>Как установить плагин</h2>
          </div>
          <div className="snipet_docs_dev">
            <p>Расширение работает в</p>
            <div className="snipet_docs_dev_list">
              <a href="https://chromewebstore.google.com/detail/bonus-return/bhaooeoeilecdjlkidolbiljhkdboekc?hl=ru&utm_source=ext_sidebar">
                <div>
                  <img src={chrome} alt="" />
                  <p>Chrome</p>
                </div>
              </a>{" "}
              <a href="https://chromewebstore.google.com/detail/bonus-return/bhaooeoeilecdjlkidolbiljhkdboekc?hl=ru&utm_source=ext_sidebar">
                <div>
                  <img src={opera} alt="" />
                  <p>Opera</p>
                </div>
              </a>
              <a href="https://chromewebstore.google.com/detail/bonus-return/bhaooeoeilecdjlkidolbiljhkdboekc?hl=ru&utm_source=ext_sidebar">
                <div>
                  <img src={mozila} alt="" />
                  <p>Mozilla</p>
                </div>
              </a>
              <a href="https://chromewebstore.google.com/detail/bonus-return/bhaooeoeilecdjlkidolbiljhkdboekc?hl=ru&utm_source=ext_sidebar">
                <div>
                  <img src={safari} alt="" />
                  <p>Safari</p>
                </div>
              </a>
            </div>
          </div>
          <div className="snipet_docs_cards">
            <div className="snipet_docs_card">
              <h3>01</h3>
              <p>Зайдите на страницу плагина</p>
              <span>
                для использования плагина обязательна регистрация в сервисе
                Bonus Return
              </span>
              <div className="get_cashback_input">
                <a href="https://chromewebstore.google.com/detail/bonus-return/bhaooeoeilecdjlkidolbiljhkdboekc?hl=ru&utm_source=ext_sidebar">
                  <button>Перейти</button>
                </a>
              </div>
            </div>
            <div className="snipet_docs_card">
              <h3>02</h3>
              <p>Установите плагин</p>
              <span>
                Откройте расширение и закрепите Bonus Return на главной панели
              </span>
            </div>
            <div className="snipet_docs_card">
              <h3>03</h3>
              <p>Получите токен</p>
              <span>Нажмите на расширение и скопируйте ключ</span>
            </div>
            <div className="snipet_docs_card">
              <h3>04</h3>
              <p>Активируйте плагин</p>
              <span>
                Вставьте токен и нажмите{" "}
                <a href="https://chromewebstore.google.com/detail/bonus-return/bhaooeoeilecdjlkidolbiljhkdboekc?hl=ru&utm_source=ext_sidebar">
                  “Применить”
                </a>
              </span>
            </div>
          </div>
          <div className="cards_carousel">
            <Slider {...settings}>
              <div>
                <div className="snipet_docs_card">
                  <h3>01</h3>
                  <p>Зайдите на страницу плагина</p>
                  <span>
                    для использования плагина обязательна регистрация в сервисе
                    Bonus Return
                  </span>
                  <div className="get_cashback_input">
                    <a href="https://chromewebstore.google.com/detail/bonus-return/bhaooeoeilecdjlkidolbiljhkdboekc?hl=ru&utm_source=ext_sidebar">
                      <button>Перейти</button>
                    </a>
                  </div>
                </div>
              </div>
              <div>
                {" "}
                <div className="snipet_docs_card">
                  <h3>02</h3>
                  <p>Установите плагин</p>
                  <span>
                    Откройте расширение и закрепите Bonus Return на главной
                    панели
                  </span>
                </div>
              </div>
              <div>
                {" "}
                <div className="snipet_docs_card">
                  <h3>03</h3>
                  <p>Получите токен</p>
                  <span>Нажмите на расширение и скопируйте ключ</span>
                </div>
              </div>
              <div>
                {" "}
                <div className="snipet_docs_card">
                  <h3>04</h3>
                  <p>Активируйте плагин</p>
                  <span>
                    Вставьте токен и нажмите{" "}
                    <a href="https://chromewebstore.google.com/detail/bonus-return/bhaooeoeilecdjlkidolbiljhkdboekc?hl=ru&utm_source=ext_sidebar">
                      “Применить”
                    </a>{" "}
                  </span>
                </div>
              </div>
            </Slider>
          </div>
          <div className="snipet_docs_desc">
            <p>
              Если установить плагин через магазин расширений Chrome не
              получается, скачайте архив <br /> и извлеките из него папку с
              файлами. Затем откройте ссылку в браузере Chrome{" "}
              <a href="https://chromewebstore.google.com/detail/bonus-return/bhaooeoeilecdjlkidolbiljhkdboekc?hl=ru&utm_source=ext_sidebar">
                chrome://extensions/
              </a>{" "}
              <br /> и включите “Режим разработчика”/ Devoloped mode. Нажмите
              кнопку загрузки (Load Unpacked) и подгрузите туда папку плагина из
              архива.
            </p>
          </div>
        </div>
        <div className="stores_rev">
          <div className="stores_rev_title container">
            <h2>Отзывы о магазинах с кэшбэком</h2>
            <p>Отзывы: 9225</p>
            <p>
              <span>Вопросы: 711</span>
            </p>
          </div>
          <div className="stores_rev_filter main_p container">
            <p>Sela</p>
            <p>Мегамаркет</p>
            <p>Ozon</p>
            <p>Wildberries</p>
            <p>Другие магазины</p>
          </div>
          <div className="stores_rev_cards container">
            <div className="stores_rev_card main_p">
              <img src={megamarket} alt="" />
              <Stars />
              <p>
                Я на мегамаркет и перешла из-за бонусов “спасибо”. Может там не
                всегда сам товар дешевле, но если учитывать цену с кэшбеком..
              </p>
            </div>
            <div className="stores_rev_card main_p">
              <img src={ozonm} alt="" />
              <Stars />
              <p>
                В магазине много акций на выбор и купить то что хочется легко и
                возможность выплаты вознаграждения по приемлемым ценам ..
              </p>
            </div>
            <div className="stores_rev_card main_p">
              <img src={market} alt="" />
              <Stars />
              <p>
                Много товаров, которые не найдешь просто так в магазине. К тому
                же и работает он нормально, доставку ждать долго не нужно, ...
              </p>
            </div>
          </div>

          <div className="cards_carousel">
            <Slider {...settings}>
              <div>
                {" "}
                <div className="stores_rev_card main_p car_cards">
                  <img src={megamarket} alt="" />
                  <Stars />
                  <p>
                    В рамках спецификации современных стандартов, некоторые
                    особенности внутренней политики лишь добавляют фракционных
                    ...
                  </p>
                </div>
              </div>
              <div>
                {" "}
                <div className="stores_rev_card main_p car_cards">
                  <img src={ozonm} alt="" />
                  <Stars />
                  <p>
                    В рамках спецификации современных стандартов, некоторые
                    особенности внутренней политики лишь добавляют фракционных
                    ...
                  </p>
                </div>
              </div>
              <div>
                {" "}
                <div className="stores_rev_card main_p car_cards">
                  <img src={market} alt="" />
                  <Stars />
                  <p>
                    В рамках спецификации современных стандартов, некоторые
                    особенности внутренней политики лишь добавляют фракционных
                    ...
                  </p>
                </div>
              </div>
            </Slider>
          </div>
        </div>
        <div className="stores_rev">
          <div className="stores_rev_title container">
            <h2>Обзоры на товары с кэшбэком</h2>
          </div>
          <div className="stores_rev_filter main_p container">
            <p>Популярные обзоры</p>
            <p>Электроника</p>
            <p>Красота и здоровье</p>
            <p>Мода и стиль</p>
            <p>Другие магазины</p>
          </div>
          <div className="prod_revs container">
            <div className="prod_rev_card">
              <div className="prod_rev_card_img">
                <img src={rev1} alt="" />
              </div>
              <div className="prod_rev_card_desc">
                <div className="prod_rev_card_author">
                  <div>
                    <img src={ava} alt="" />
                    <p>Maria B</p>
                  </div>
                  <p>
                    <span>Обзоры автора</span>
                  </p>
                </div>
                <div className="prod_rev_card_desc_text main_p">
                  <h2>Вы не поверите, что было...</h2>
                  <p>
                    В рамках спецификации современных стандартов, некоторые
                    особенности внутренней политики лишь добавляют фракционных
                    ...
                  </p>
                </div>
              </div>
            </div>
            <div className="prod_rev_card">
              <div className="prod_rev_card_img">
                <img src={rev2} alt="" />
              </div>
              <div className="prod_rev_card_desc">
                <div className="prod_rev_card_author">
                  <div>
                    <img src={ava} alt="" />
                    <p>Maria B</p>
                  </div>
                  <p>
                    <span>Обзоры автора</span>
                  </p>
                </div>
                <div className="prod_rev_card_desc_text main_p">
                  <h2> Кэшбэк. Секреты Покупок</h2>
                  <p>
                    Теперь покупаю больше, даже если не нужно. Покупать стало
                    легче на маркетплейсах: ассортимент огромный, цены
                    низкие....
                  </p>
                </div>
              </div>
            </div>
            <div className="prod_rev_card">
              <div className="prod_rev_card_img">
                <img src={rev3} alt="" />
              </div>
              <div className="prod_rev_card_desc">
                <div className="prod_rev_card_author">
                  <div>
                    <img src={ava} alt="" />
                    <p>Maria B</p>
                  </div>
                  <p>
                    <span>Обзоры автора</span>
                  </p>
                </div>
                <div className="prod_rev_card_desc_text main_p">
                  <h2>Что это значит ?</h2>
                  <p>
                    Китайский ассортимент огромный, цены часто ниже, а качество
                    весьма приличное. Это изменило мои покупательские привычки
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="cards_carousel">
            <Slider {...settings}>
              <div>
                <div className="prod_rev_card car_cards">
                  <div className="prod_rev_card_img">
                    <img src={rev1} alt="" />
                  </div>
                  <div className="prod_rev_card_desc">
                    <div className="prod_rev_card_author">
                      <div>
                        <img src={ava} alt="" />
                        <p>Maria B</p>
                      </div>
                      <p>
                        <span>Обзоры автора</span>
                      </p>
                    </div>
                    <div className="prod_rev_card_desc_text main_p">
                      <h2>Вы не поверите, что было...</h2>
                      <p>
                        В рамках спецификации современных стандартов, некоторые
                        особенности внутренней политики лишь добавляют
                        фракционных ...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="prod_rev_card car_cards">
                  <div className="prod_rev_card_img">
                    <img src={rev2} alt="" />
                  </div>
                  <div className="prod_rev_card_desc">
                    <div className="prod_rev_card_author">
                      <div>
                        <img src={ava} alt="" />
                        <p>Maria B</p>
                      </div>
                      <p>
                        <span>Обзоры автора</span>
                      </p>
                    </div>
                    <div className="prod_rev_card_desc_text main_p">
                      <h2>Кэшбэк. Секреты Покупок</h2>
                      <p>
                        Теперь покупаю больше, даже если не нужно. Покупать
                        стало легче на маркетплейсах: ассортимент огромный, цены
                        низкие....
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="prod_rev_card car_cards">
                  <div className="prod_rev_card_img">
                    <img src={rev3} alt="" />
                  </div>
                  <div className="prod_rev_card_desc">
                    <div className="prod_rev_card_author">
                      <div>
                        <img src={ava} alt="" />
                        <p>Maria B</p>
                      </div>
                      <p>
                        <span>Обзоры автора</span>
                      </p>
                    </div>
                    <div className="prod_rev_card_desc_text main_p">
                      <h2> Что это значит ?</h2>
                      <p>
                        Китайский ассортимент огромный, цены часто ниже, а
                        качество весьма приличное. Это изменило мои
                        покупательские привычки
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
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
      </div>
      <Snackbar text={snackText} status={snackStatus} visible={visibleSnack} />
    </>
  );
}

export default Home;
