import React, { useEffect, useState } from "react";
import "./dashboard-seller.css";

import rect from "../../assets/icons/Rectangle 205.png";
import support from "../../assets/images/support.png";

import SellerCarousel from "../../components/seller-carousel/seller-carousel";
import AddMarket from "./components/add-market";
import AllProducts from "./components/all-products";
import ScanSeller from "./components/scan-seller";
import JoinUs from "../../components/join-us/join-us";

function SellersDashboard() {
  const [isVerified, setisVerified] = useState();
  const refresh = () => {
    fetch("https://api-seller.bonusreturn.ru/api/v1/seller/get-me/", {
      method: "GET",
      headers: {
        "Api-Key": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => setisVerified(data.data.is_verified))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="sellers_dash container">
      <AddMarket />

      <ScanSeller refresh={refresh} isVerified={isVerified} />

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

      <AllProducts />

      <JoinUs />
    </div>
  );
}

export default SellersDashboard;
