import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow-down.svg";
import { ReactComponent as Search } from "../../assets/icons/search.svg";
import { ReactComponent as Snipet } from "../../assets/icons/snippet.svg";
import { ReactComponent as TalkToUs } from "../../assets/icons/talk-tous.svg";
import { ReactComponent as Copy } from "../../assets/icons/copy.svg";
import { ReactComponent as VK } from "../../assets/icons/vk.svg";
import "../../components/card/card.css";
import "./coupon.css";

import { ReactComponent as ArrLeft } from "../../assets/icons/arr-left.svg";
import { ReactComponent as ArrRight } from "../../assets/icons/arr-right.svg";
import gift from "../../assets/images/gift.png";
import Snackbar from "../../components/snackbar/snackbar";
import { mainApi } from "../../components/utils/main-api";

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

function Coupon() {
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

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const [filteredDataCategory, setCpiData] = useState([]);

  const [applyLink, setApplyLink] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [limit, setLimit] = useState(20);
  const getCpi = () => {
    mainApi
      .getCPILinksPage(`coupon&offset=0&limit=${limit}`)
      .then((userData) => {
        setCpiData(userData.data);
      })
      .catch(() => {
        console.log("error");
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
  const [visibleDesc, setVisibleDesc] = useState("");
  const [coupon, setCoupon] = useState({});

  const getMore = () => {
    setLimit(limit + 20);
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
        <div className=" container coupons_list_wrapper">
          <div className="home_navigation_title">
            <h3>Лучшие промокоды и акции</h3>
          </div>
          <div className="best_promos coupons_list">
            {filteredDataCategory && filteredDataCategory.length > 0 ? (
              filteredDataCategory.map((item) => (
                <div className="coupons_list_item_wrapper" key={item.id}>
                  <div className="coupons_list_item">
                    <div className="coupons_list_item_left">
                      <img src={item.image_url} alt="" />
                    </div>
                    <div className="coupons_list_item_right">
                      <div className="coupons_list_item_right_cost">
                        <p>{item.cashback_up_to}</p>
                      </div>
                      <div className="coupons_list_item_right_desc">
                        <div className="coupons_list_item_right_descriptions">
                          <h2>{item.description}</h2>
                          <p>
                            Действует с {item.active_since} до {item.active_to}
                          </p>
                        </div>
                        <div className="coupons_list_item_right_desc_actions">
                          <button onClick={() => setCoupon(item)}>
                            Получить промокод
                          </button>

                          <div
                            className={
                              visibleDesc == item.id
                                ? "show_details show_details_visible"
                                : "show_details"
                            }
                            onClick={() => setVisibleDesc(item.id)}
                          >
                            <p>Показать детали</p>
                            <ArrowDown />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {visibleDesc == item.id ? (
                    <div className="coupons_list_item_description_block_wrapper">
                      <div className="coupons_list_item_description_block">
                        <p>{item.conditions_text}</p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
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

        <div className=" container coupons_list_wrapper">
          <div className="best_promos coupons_list">
            {filteredDataCategory && filteredDataCategory.length > 0 ? (
              filteredDataCategory.map((item) => (
                <div className="coupons_list_item_wrapper" key={item.id}>
                  <div className="coupons_list_item">
                    <div className="coupons_list_item_left">
                      <img src={item.image_url} alt="" />
                    </div>
                    <div className="coupons_list_item_right">
                      <div className="coupons_list_item_right_cost">
                        <p>{item.cashback_up_to}</p>
                      </div>
                      <div className="coupons_list_item_right_desc">
                        <div className="coupons_list_item_right_descriptions">
                          <h2>{item.description}</h2>
                          <p>
                            Действует с {item.active_since} до {item.active_to}
                          </p>
                        </div>
                        <div className="coupons_list_item_right_desc_actions">
                          <button onClick={() => setCoupon(item)}>
                            Получить промокод
                          </button>

                          <div
                            className={
                              visibleDesc == item.id
                                ? "show_details show_details_visible"
                                : "show_details"
                            }
                            onClick={() => setVisibleDesc(item.id)}
                          >
                            <p>Показать детали</p>
                            <ArrowDown />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {visibleDesc == item.id ? (
                    <div className="coupons_list_item_description_block_wrapper">
                      <div className="coupons_list_item_description_block">
                        <p>{item.conditions_text}</p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))
            ) : (
              <div className="empty_catogory">
                <p>Не найден!</p>
              </div>
            )}
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
        <div className=" container coupons_list_wrapper">
          <div className="best_promos coupons_list p0">
            {filteredDataCategory && filteredDataCategory.length > 0 ? (
              filteredDataCategory.map((item) => (
                <div className="coupons_list_item_wrapper" key={item.id}>
                  <div className="coupons_list_item">
                    <div className="coupons_list_item_left">
                      <img src={item.image_url} alt="" />
                    </div>
                    <div className="coupons_list_item_right">
                      <div className="coupons_list_item_right_cost">
                        <p>{item.cashback_up_to}</p>
                      </div>
                      <div className="coupons_list_item_right_desc">
                        <div className="coupons_list_item_right_descriptions">
                          <h2>{item.description}</h2>
                          <p>
                            Действует с {item.active_since} до {item.active_to}
                          </p>
                        </div>
                        <div className="coupons_list_item_right_desc_actions">
                          <button onClick={() => setCoupon(item)}>
                            Получить промокод
                          </button>

                          <div
                            className={
                              visibleDesc == item.id
                                ? "show_details show_details_visible"
                                : "show_details"
                            }
                            onClick={() => setVisibleDesc(item.id)}
                          >
                            <p>Показать детали</p>
                            <ArrowDown />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {visibleDesc == item.id ? (
                    <div className="coupons_list_item_description_block_wrapper">
                      <div className="coupons_list_item_description_block">
                        <p>{item.conditions_text}</p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))
            ) : (
              <div className="empty_catogory">
                <p>Не найден!</p>
              </div>
            )}
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
      </div>
      {coupon && coupon.id ? (
        <>
          <div className="overflow" onClick={() => setCoupon({})}></div>
          <div className="coupon_modal">
            <div className="coupon_modal_img">
              <img src={coupon.image_url} alt="" />
            </div>
            <div className="coupon_modal_ins">
              <p>Перейдите на сайт магазина и используйте промокод</p>
            </div>
            <div className="coupon_modal_actions">
              <div className="coupon_modal_actions_input">
                <input type="text" value={coupon.promo_code} />
                <button>
                  <Copy />
                </button>
              </div>
              <a href={coupon.cpi_url}>
                {" "}
                <button className="coupon_modal_action_btn">
                  Перейти на сайт магазина
                </button>
              </a>
            </div>
            <div className="coupon_modal_desc">
              <p className="coupon_modal_desc_type">{coupon.name}</p>
              <h4 className="coupon_modal_desc_title">{coupon.description}</h4>
              <h4 className="coupon_modal_desc_cond">
                {coupon.conditions_text}
              </h4>
              <div className="coupon_modal_desc_time">
                <p>
                  Действует с {coupon.active_since} до {coupon.active_to}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      <Snackbar text={snackText} status={snackStatus} visible={visibleSnack} />
    </>
  );
}

export default Coupon;
