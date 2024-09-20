import React, { useEffect, useState } from "react";
import "./dashboard-seller.css";
import { mainApi } from "../../components/utils/main-api";
import header_img from "../../assets/images/seller-dash-header.png";
import seller_un from "../../assets/images/seller-unau.png";
import rect from "../../assets/icons/Rectangle 205.png";
import support from "../../assets/images/support.png";
import img from "../../assets/images/tg-bg.png";
import { ReactComponent as NonChecked } from "../../assets/icons/not-checked.svg";
import { ReactComponent as Checked } from "../../assets/icons/checked.svg";
import { ReactComponent as Snipet } from "../../assets/icons/snippet.svg";
import { ReactComponent as VK } from "../../assets/icons/vk.svg";
import { ReactComponent as Search } from "../../assets/icons/search.svg";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import { ReactComponent as CarLeft } from "../../assets/icons/car-left.svg";
import { ReactComponent as CarRight } from "../../assets/icons/car-right.svg";
import SellerCarousel from "../../components/seller-carousel/seller-carousel";

function SellersDashboard() {
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState();

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

  useEffect(() => {
    getPlatformsActions();
  }, []);
  return (
    <div className="sellers_dash container">
      <div className="sellers_dash_header">
        <div className="sellers_dash_header_left">
          <div className="sellers_dash_title">
            <h2>
              БЕСПЛАТНОЕ Продвижение <br />
              за процент с продаж!
            </h2>
            <p>
              Мы бесплатно добавим ваши товары в настоящий кэшбэк сервис.
              Выберите <br /> маркетплейс и укажите размер кэшбека для
              Покупателя;
            </p>
          </div>
          <div className="seller_upload">
            <p>Скачать пример файла для загрузки</p>
          </div>
          <div className="cashback_stores_list">
            <p>Выбрать маркетплейс:</p>
            <div className="cashback_stores_lists cashback_stores_lists_seller">
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
          <div className="seller_header_actions">
            <button>
              <p>Загрузить товар</p>
            </button>
            <button>
              <p>Добавить товары конкурента</p>
            </button>
          </div>
          <div className="seller_header_actions_bottom">
            <p>
              Добавлено товаров : 120 <span>Управлять товарами</span>
            </p>
            <p>
              Пожалуйста, <a href="#">свяжитесь с нами</a>, если у Вас есть
              вопросы.
            </p>
          </div>
        </div>
        <div className="sellers_dash_header_right">
          <img src={header_img} alt="" />
        </div>
      </div>

      <div className="seller_scan">
        <img src={seller_un} alt="" />
        <div className="seller_scan_block">
          <h2>Добрый день</h2>
          <div className="seller_scan_title">
            <NonChecked />
            <p>Вы не проверенный продавец</p>
          </div>
          <h2>Проверка и подключение продавца</h2>
          <p className="main_text">
            Создайте токен и укажите, к каким функциям Wildberries он разрешает
            доступ, укажите “Только на чтение“ (по токену нельзя будет ничего
            поменять)Контент, Статистика, Аналитика, Продвижения, рекомендации -
            <span className="main_link">получить токен</span>
          </p>
          <div className="add_seller_token">
            <button>API токен статистики только для чтения</button>
            <button>Добавить</button>
          </div>
          <div className="add_seller_desc">
            <div className="add_seller_desc_badge">
              <p className="main_text">
                После прохождения проверки, Вы получите Знак
              </p>
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

      <div className="seller_carousel_wrapper container">
        <div className="support_block_title">
          <h3>Выделись среди конкурентов</h3>
          <p>Получите дополнительное продвижение</p>
        </div>
        <SellerCarousel />
      </div>

      <div className="support_block container support_block_seller">
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

      <div className="we_help">
        <div className="support_block_title">
          <h3>
            МЫ ПОМОГАЕМ ПРОДАТЬ ВАШ ТОВАР С <br /> БОНУСОМ ПОКУПАТЕЛЮ
          </h3>
          <p>
            Персональные программы продвижение для клиентов с рекламным бюджетом
            от 1 млн.р. мес. <br />
            Если у Вас есть вопросы -{" "}
            <a href="#" className="main_link">
              свяжитесь с нами
            </a>{" "}
          </p>
        </div>
        <div className="stores_rev_filter main_p container">
          <p>Кэшбек</p>
          <p>Бонус за отзыв</p>
          <p>Промокоды</p>
          <p>Прямые продажи</p>
          <p>Брошенная корзина</p>
          <p>Показы у конкурента</p>
          <p>Распродажи</p>
          <p>Коды с упаковки</p>
          <p>Подарок от бренда</p>
          <p>Reels на маркетах</p>
          <p>Баннеры</p>
          <p>Рассылки аудитории</p>
          <p>Бренд зона</p>
          <p>Конкурсы</p>
          <p>Акции</p>
          <p>Бонусы с чека</p>
        </div>
      </div>
      <div className="talk_to_us download_snipet container">
        <div className="talk_to_us_desc">
          <div className="cashback_stores_title">
            <h3>Устанавливайте расширение Bonus Return</h3>
            <p>
              Наше дополнение для браузера не позволит забыть <br /> о кэшбэк и
              напомнит о нем
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

      <div className="all_products_list container">
        <div className="all_products_list_top">
          <div className="all_products_list_top_buttons">
            <button>
              Все товары <span>145</span>
            </button>
            <button>Добавить свои товары</button>
            <button>Добавить товары конкурента</button>
          </div>
          <div className="cashback_stores_lists ">
            {platforms.map((img, index) => (
              <img
                className={
                  selectedPlatform == img.platform_id ? "selected_platform" : ""
                }
                key={index}
                src={img.image_url}
                alt={img.title}
                title={img.title}
                onClick={() => setSelectedPlatform(img.platform_id)}
              />
            ))}
          </div>
          <div className="all_products_list_top_actions">
            <p>Ожидание кэшбэка 100</p>
            <p>Скачать Excel</p>
          </div>
        </div>
        <div className="all_products_list_top_second">
          <div>
            <p className="main_text">Общий на все товары Размер кэшбэка %</p>
            <input type="text" value="10" />
          </div>
          <div>
            <p className="main_text">Общий на все товары сумма промокода, ₽ </p>
            <input type="text" value="1000" />
          </div>
          <div>
            <p className="main_text">
              Общий на все товары Размер кэшбэка за отзыв %
            </p>
            <input type="text" value="100" />
          </div>
        </div>
        <div className="all_products_list_titles">
          <div className="home_header_search all_products_list_search">
            <input
              type="text"
              placeholder="Введите артикул или ссылку на товар"
            />
            <Search />
          </div>
          <div className="all_products_list_titles_list">
            <p>
              Размер <br />
              кэшбэка %
            </p>
            <p>
              Сумма <br />
              промокода
            </p>
            <p>
              Кэшбэк <br />
              за отзыв
            </p>
            <p>
              Ключевые <br />
              слова для отзыва,
              <br />
              через запятую
            </p>
            <p>Входящий отзыв</p>
          </div>
        </div>
        <div className="all_products_table">
          <div className="all_product_item">
            <div className="all_product_item_desc">
              <img src={img} alt="" />
              <div>
                <p>
                  <b>Наименование товара</b>
                </p>
                <span>Категория товара</span>
                <br />
                <span>Артикул: 000000000 </span>
                <p>превью товара с UTM</p>
                <a href="#" className="main_link">
                  Яндекс Маркет
                </a>
              </div>
            </div>
            <div className="all_product_item_stat">
              <div>
                <p className="main_text">10</p>
                <p>
                  <b>новый</b>
                </p>
              </div>
              <div>
                <p className="main_text">100</p>
                <p>
                  <b>новый</b>
                </p>
              </div>
              <div>
                <p className="main_text">500</p>
                <p>
                  <b>новый</b>
                </p>
              </div>
            </div>
            <div className="all_product_item_revs">
              <p className="main_text">
                Задача организации, в особенности же высококачественный прототип
                ...
              </p>
              <p className="main_text">
                Ксения <br />
                Покупка: 07.08.2024 <br />
                Цвет: черный
                <br />
                Размер: ONE SIZE
                <br />
                ШК: 23144402915
                <br />
                👍🏼👍🏼👍🏼 13.08.2024 22:22
              </p>
            </div>
            <div className="all_product_item_actions">
              <div>
                <button>Принять</button>
                <Trash />
              </div>
              <p className="main_text">отказ </p>
            </div>
          </div>
          <div className="all_product_item">
            <div className="all_product_item_desc">
              <img src={img} alt="" />
              <div>
                <p>
                  <b>Наименование товара</b>
                </p>
                <span>Категория товара</span>
                <br />
                <span>Артикул: 000000000 </span>
                <p>превью товара с UTM</p>
                <a href="#" className="main_link">
                  Яндекс Маркет
                </a>
              </div>
            </div>
            <div className="all_product_item_stat">
              <div>
                <p className="main_text">10</p>
                <p>
                  <b>новый</b>
                </p>
              </div>
              <div>
                <p className="main_text">100</p>
                <p>
                  <b>новый</b>
                </p>
              </div>
              <div>
                <p className="main_text">500</p>
                <p>
                  <b>новый</b>
                </p>
              </div>
            </div>
            <div className="all_product_item_revs">
              <p className="main_text">
                Задача организации, в особенности же высококачественный прототип
                ...
              </p>
              <p className="main_text">
                Ксения <br />
                Покупка: 07.08.2024 <br />
                Цвет: черный
                <br />
                Размер: ONE SIZE
                <br />
                ШК: 23144402915
                <br />
                👍🏼👍🏼👍🏼 13.08.2024 22:22
              </p>
            </div>
            <div className="all_product_item_actions">
              <div>
                <button>Принять</button>
                <Trash />
              </div>
              <p className="main_text">отказ </p>
            </div>
          </div>
          <div className="all_product_item">
            <div className="all_product_item_desc">
              <img src={img} alt="" />
              <div>
                <p>
                  <b>Наименование товара</b>
                </p>
                <span>Категория товара</span>
                <br />
                <span>Артикул: 000000000 </span>
                <p>превью товара с UTM</p>
                <a href="#" className="main_link">
                  Яндекс Маркет
                </a>
              </div>
            </div>
            <div className="all_product_item_stat">
              <div>
                <p className="main_text">10</p>
                <p>
                  <b>новый</b>
                </p>
              </div>
              <div>
                <p className="main_text">100</p>
                <p>
                  <b>новый</b>
                </p>
              </div>
              <div>
                <p className="main_text">500</p>
                <p>
                  <b>новый</b>
                </p>
              </div>
            </div>
            <div className="all_product_item_revs">
              <p className="main_text">
                Задача организации, в особенности же высококачественный прототип
                ...
              </p>
              <p className="main_text">
                Ксения <br />
                Покупка: 07.08.2024 <br />
                Цвет: черный
                <br />
                Размер: ONE SIZE
                <br />
                ШК: 23144402915
                <br />
                👍🏼👍🏼👍🏼 13.08.2024 22:22
              </p>
            </div>
            <div className="all_product_item_actions">
              <div>
                <button>Принять</button>
                <Trash />
              </div>
              <p className="main_text">отказ </p>
            </div>
          </div>
          <div className="all_product_item">
            <div className="all_product_item_desc">
              <img src={img} alt="" />
              <div>
                <p>
                  <b>Наименование товара</b>
                </p>
                <span>Категория товара</span>
                <br />
                <span>Артикул: 000000000 </span>
                <p>превью товара с UTM</p>
                <a href="#" className="main_link">
                  Яндекс Маркет
                </a>
              </div>
            </div>
            <div className="all_product_item_stat">
              <div>
                <p className="main_text">10</p>
                <p>
                  <b>новый</b>
                </p>
              </div>
              <div>
                <p className="main_text">100</p>
                <p>
                  <b>новый</b>
                </p>
              </div>
              <div>
                <p className="main_text">500</p>
                <p>
                  <b>новый</b>
                </p>
              </div>
            </div>
            <div className="all_product_item_revs">
              <p className="main_text">
                Задача организации, в особенности же высококачественный прототип
                ...
              </p>
              <p className="main_text">
                Ксения <br />
                Покупка: 07.08.2024 <br />
                Цвет: черный
                <br />
                Размер: ONE SIZE
                <br />
                ШК: 23144402915
                <br />
                👍🏼👍🏼👍🏼 13.08.2024 22:22
              </p>
            </div>
            <div className="all_product_item_actions">
              <div>
                <button>Принять</button>
                <Trash />
              </div>
              <p className="main_text">отказ </p>
            </div>
          </div>
          <div className="all_product_item">
            <div className="all_product_item_desc">
              <img src={img} alt="" />
              <div>
                <p>
                  <b>Наименование товара</b>
                </p>
                <span>Категория товара</span>
                <br />
                <span>Артикул: 000000000 </span>
                <p>превью товара с UTM</p>
                <a href="#" className="main_link">
                  Яндекс Маркет
                </a>
              </div>
            </div>
            <div className="all_product_item_stat">
              <div>
                <p className="main_text">10</p>
                <p>
                  <b>новый</b>
                </p>
              </div>
              <div>
                <p className="main_text">100</p>
                <p>
                  <b>новый</b>
                </p>
              </div>
              <div>
                <p className="main_text">500</p>
                <p>
                  <b>новый</b>
                </p>
              </div>
            </div>
            <div className="all_product_item_revs">
              <p className="main_text">
                Задача организации, в особенности же высококачественный прототип
                ...
              </p>
              <p className="main_text">
                Ксения <br />
                Покупка: 07.08.2024 <br />
                Цвет: черный
                <br />
                Размер: ONE SIZE
                <br />
                ШК: 23144402915
                <br />
                👍🏼👍🏼👍🏼 13.08.2024 22:22
              </p>
            </div>
            <div className="all_product_item_actions">
              <div>
                <button>Принять</button>
                <Trash />
              </div>
              <p className="main_text">отказ </p>
            </div>
          </div>
          <div className="all_product_item">
            <div className="all_product_item_desc">
              <img src={img} alt="" />
              <div>
                <p>
                  <b>Наименование товара</b>
                </p>
                <span>Категория товара</span>
                <br />
                <span>Артикул: 000000000 </span>
                <p>превью товара с UTM</p>
                <a href="#" className="main_link">
                  Яндекс Маркет
                </a>
              </div>
            </div>
            <div className="all_product_item_stat">
              <div>
                <p className="main_text">10</p>
                <p>
                  <b>новый</b>
                </p>
              </div>
              <div>
                <p className="main_text">100</p>
                <p>
                  <b>новый</b>
                </p>
              </div>
              <div>
                <p className="main_text">500</p>
                <p>
                  <b>новый</b>
                </p>
              </div>
            </div>
            <div className="all_product_item_revs">
              <p className="main_text">
                Задача организации, в особенности же высококачественный прототип
                ...
              </p>
              <p className="main_text">
                Ксения <br />
                Покупка: 07.08.2024 <br />
                Цвет: черный
                <br />
                Размер: ONE SIZE
                <br />
                ШК: 23144402915
                <br />
                👍🏼👍🏼👍🏼 13.08.2024 22:22
              </p>
            </div>
            <div className="all_product_item_actions">
              <div>
                <button>Принять</button>
                <Trash />
              </div>
              <p className="main_text">отказ </p>
            </div>
          </div>
        </div>
        <div className="all_products_pagination">
          <CarLeft />
          <div className="all_products_pagination_items">
            <p>1</p>
            <p className="all_products_pagination_active">2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
          </div>

          <CarRight />
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
  );
}

export default SellersDashboard;
