import React, { useEffect, useState } from "react";
import { ReactComponent as Search } from "../../../assets/icons/search.svg";
import { ReactComponent as CarLeft } from "../../../assets/icons/car-left.svg";
import { ReactComponent as CarRight } from "../../../assets/icons/car-right.svg";
import { mainApi } from "../../../components/utils/main-api";
import ProductItem from "./product-item";

function AllProducts() {
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState();
  const [products, setProducts] = useState([]);

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

  const getProductsActions = () => {
    mainApi
      .getProducts()
      .then((data) => {
        setProducts(data.data);
      })
      .catch(() => {
        console.log("error");
      });
  };

  useEffect(() => {
    getPlatformsActions();
    getProductsActions();
  }, []);

  return (
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
        {products && products.length
          ? products.map((product) => <ProductItem item={product} key={product.apply_id} platforms={platforms} />)
          : ""}
      </div>
      {/* <div className="all_products_pagination">
        <CarLeft />
        <div className="all_products_pagination_items">
          <p>1</p>
          <p className="all_products_pagination_active">2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
        </div>

        <CarRight />
      </div> */}
    </div>
  );
}

export default AllProducts;
