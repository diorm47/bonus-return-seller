import React from "react";
import "./seller-carousel.css";
import { ReactComponent as Check } from "../../assets/icons/mark.svg";
import { ReactComponent as Question } from "../../assets/icons/question.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";

function SellerCarousel() {
  return (
    <div className="seller_carousel">
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        loop={true}
        centeredSlides={true}
      >
        <SwiperSlide>
          {" "}
          <div className="seller_carousel_item">
            <div className="seller_carousel_item_top">
              <h2>
                КЭШБЭК <br /> ВЕЗДЕ
              </h2>
              <h3>
                Покажем ваш товар с кэшбэком покупателям на всех крупных
                маркетплейсах страны
              </h3>
              <h4>
                Клиент перейдет на вашу карточку на Wildberries, для совершения
                более выгодной для себя покупки
              </h4>
              <div className="seller_carousel_item_desc">
                <div>
                  <Check />
                  <p>Преимущество 1</p>
                </div>
                <div>
                  <Check />
                  <p>Преимущество 2</p>
                </div>
                <div>
                  <Check />
                  <p>Преимущество 3</p>
                </div>
              </div>{" "}
            </div>
            <div className="seller_carousel_item_actions">
              <div className="seller_carousel_item_about">
                <p>узнать подробнее</p>
                <Question />
              </div>
              <h1>9 000 ₽/мес.</h1>
              <button>Подключить</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="seller_carousel_item">
            <div className="seller_carousel_item_top">
              <h2>Я САМ ВЫБИРАЮ</h2>
              <h3>Вы сами выбираете, как продвигать свой товар</h3>
              <h4>
                Выбирайте только те функции, которые нужны для вашего
                уникального предложения
              </h4>
              <div className="seller_carousel_item_desc">
                <div>
                  <Check />
                  <p>Волшебные кнопки </p>
                </div>
                <div>
                  <Check />
                  <p>Трафик конкурента</p>
                </div>
                <div>
                  <Check />
                  <p>Кэшбэк везде</p>
                </div>
                <div>
                  <Check />
                  <p>Бонусы на максимум</p>
                </div>
              </div>{" "}
            </div>
            <div className="seller_carousel_item_actions">
              <div className="seller_carousel_item_about">
                <p>узнать подробнее</p>
                <Question />
              </div>
              <h1>35 000 ₽/мес.</h1>
              <button>Подключить</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="seller_carousel_item">
            <div className="seller_carousel_item_top">
              <h2>
                БОНУСЫ <br />
                НА МАКСИМУМ
              </h2>
              <h3>
                Мы разместим информацию о ваших товарах в 13 000 каталогах
              </h3>
              <h4>
                Наши алгоритмы ИИ подбирают источники для размещения вашего
                товара по интересам ваших клиентов
              </h4>
              <div className="seller_carousel_item_desc">
                <div>
                  <div>
                    {" "}
                    <Check />
                  </div>
                  <p>Быстрый рост продаж</p>
                </div>
                <div>
                  <div>
                    {" "}
                    <Check />
                  </div>

                  <p>Большое количество источников рекламы</p>
                </div>
              </div>{" "}
            </div>
            <div className="seller_carousel_item_actions">
              <div className="seller_carousel_item_about">
                <p>узнать подробнее</p>
                <Question />
              </div>
              <h1>30 000 ₽/мес.</h1>
              <button>Подключить</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="seller_carousel_item">
            <div className="seller_carousel_item_top">
              <h2>
                Волшебные <br />
                кнопки
              </h2>
              <h3>выделим ваши товары на витринах маркетплесов</h3>
              <h4>
                Обращаем внимание клиентов на ваши товары и даем бонусы за
                покупки
              </h4>
              <div className="seller_carousel_item_desc">
                <div>
                  <div>
                    {" "}
                    <Check />
                  </div>

                  <p>Высокая кликабельность СTR</p>
                </div>
                <div>
                  <div>
                    {" "}
                    <Check />
                  </div>

                  <p>Решаем проблему брошенных корзин</p>
                </div>
                <div>
                  <div>
                    {" "}
                    <Check />
                  </div>

                  <p>
                    Клиент гарантировано получить дополнительный бонус от
                    покупки вашего товара за наш счет
                  </p>
                </div>
              </div>{" "}
            </div>
            <div className="seller_carousel_item_actions">
              <div className="seller_carousel_item_about">
                <p>узнать подробнее</p>
                <Question />
              </div>
              <h1>5 000 ₽/мес.</h1>
              <button>Подключить</button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="seller_carousel_item">
            <div className="seller_carousel_item_top">
              <h2>
                ТРАФИК <br /> КОНКУРЕНТА
              </h2>
              <h3>Покажем в карточке товара конкурента ссылку на ваш товар</h3>
              <h4>
                клиент получает гарантированные бонусы при покупке товара у вас
              </h4>
              <div className="seller_carousel_item_desc">
                <div>
                  <div>
                    {" "}
                    <Check />
                  </div>

                  <p>Экономия денег на рекламе за счет конкурента</p>
                </div>
                <div>
                  <div>
                    {" "}
                    <Check />
                  </div>

                  <p>
                    Переманим клиента от конкурента подарком, без снижение цены
                    продаж
                  </p>
                </div>
                <div>
                  <div>
                    {" "}
                    <Check />
                  </div>

                  <p>Следим за ценами конкурентов и управляем продажами</p>
                </div>
              </div>{" "}
            </div>
            <div className="seller_carousel_item_actions">
              <div className="seller_carousel_item_about">
                <p>узнать подробнее</p>
                <Question />
              </div>
              <h1>7 000 ₽/мес.</h1>
              <button>Подключить</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default SellerCarousel;
