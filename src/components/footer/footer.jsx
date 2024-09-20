import React from "react";
import "./footer.css";
import { NavLink } from "react-router-dom";
import visa from "../../assets/icons/visa.png";
import mastercard from "../../assets/icons/mastercard.png";
import mir from "../../assets/icons/mir.png";
import tg from "../../assets/icons/tg.png";
import viber from "../../assets/icons/viber.png";

function Footer() {
  return (
    <footer>
      <div className="footer_wrapper">
        <div className="footer_left">
          <div className="footer_left_menu_list">
            <NavLink to="">
              <p>
                Программа лояльности <br />
                Bonus Return
              </p>
            </NavLink>
            <NavLink to="">
              <p>
                Android приложение <br />
                Bonus Return
              </p>
            </NavLink>
            <NavLink to="">
              <p>
                IOS приложение <br />
                Bonus Return
              </p>
            </NavLink>
            <NavLink to="">
              <p>
                Расширение для покупок <br />с кэшбэком
              </p>
            </NavLink>
            <NavLink to="">
              <p>
                Расширение Bonus Return <br />
                Вкладка
              </p>
            </NavLink>
            <NavLink to="">
              <p>Помощь</p>
            </NavLink>

            <NavLink to="">
              <p>Задать вопрос</p>
            </NavLink>
            <NavLink to="">
              <p>Все магазины</p>
            </NavLink>
            <NavLink to="">
              <p>Блог</p>
            </NavLink>
          </div>
          <div className="footer_left_menu_list">
            <NavLink to="">
              <p>О сервисе</p>
            </NavLink>
            <NavLink to="">
              <p>Контакты</p>
            </NavLink>
            <NavLink to="">
              <p>
                Отзывы <br />о Bonus Return
              </p>
            </NavLink>
            <NavLink to="">
              <p>Программа “Приведи друга”</p>
            </NavLink>
            <NavLink to="">
              <p>Рекламировать нас</p>
            </NavLink>
            <NavLink to="">
              <p>Советы для магазинов</p>
            </NavLink>
            <NavLink to="">
              <p>
                Рекламироваться <br />в “Bonus Return”
              </p>
            </NavLink>
          </div>
        </div>
        <div className="footer_right">
          <div className="footer_right_text">
            <h2>
              Безналичный расчет <br />
              для юридических лиц и ИП
            </h2>
            <p>
              Услуги предоставляются в виде сервиса, специальные действия по
              установке ПО на стороне клиентов не требуется
              <br />
              <br />
              Оплата производиться через ПАО СБЕРБАНК
            </p>
          </div>
          <div className="footer_right_payments">
            <img src={visa} alt="" />
            <img src={mastercard} alt="" />
            <img src={mir} alt="" />
          </div>
          <div className="footer_policy_socials">
            <div className="footer_policy main_p">
              <NavLink to="https://api.bonusreturn.ru/media/files/privacy_policy.docx">
                <p>Политика конфиденциальности</p>
              </NavLink>
              <NavLink to="https://api.bonusreturn.ru/media/files/conditions.docx">
                <p>Пользовательское соглашение</p>
              </NavLink>
            </div>
            <div className="footer_socials">
              <a href="https://t.me/bonusreturn_support">
                <img src={tg} alt="" />
              </a>
              <a href="https://wa.me/message/D4J6L7IQ7SH7P1">
             
                <img src={viber} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
