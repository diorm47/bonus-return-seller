import React, { useEffect, useState } from "react";
import header_img from "../../../assets/images/seller-dash-header.png";
import { mainApi } from "../../../components/utils/main-api";

function AddMarket() {
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
    <div className="sellers_dash_header">
      <div className="sellers_dash_header_left">
        <div className="sellers_dash_title">
          <h2>
            БЕСПЛАТНОЕ Продвижение <br />
            за процент с продаж!
          </h2>
          <p>
            Мы бесплатно добавим ваши товары в настоящий кэшбэк сервис. Выберите{" "}
            <br /> маркетплейс и укажите размер кэшбека для Покупателя;
          </p>
        </div>
        <div className="seller_upload">
          <a href="https://api-seller.bonusreturn.ru/api/v1/personal_area/upload-products/example/">
            {" "}
            <p>Скачать пример файла для загрузки</p>
          </a>
        </div>
        <div className="cashback_stores_list">
          <p>Выбрать маркетплейс:</p>
          <div className="cashback_stores_lists cashback_stores_lists_seller">
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
  );
}

export default AddMarket;
