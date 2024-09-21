import React, { useEffect, useRef, useState, useCallback } from "react";
import header_img from "../../../assets/images/seller-dash-header.png";
import { mainApi } from "../../../components/utils/main-api";
import Snackbar from "../../../components/snackbar/snackbar";

function AddMarket() {
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

  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const getPlatformsActions = useCallback(() => {
    mainApi
      .getPlatforms()
      .then((userData) => {
        setPlatforms(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getPlatformsActions();
  }, [getPlatformsActions]);

  const inputFileRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleClick = () => {
    inputFileRef.current.click();
  };

  const handleUpload = async (file) => {
    if (!file || !selectedPlatform) {
      snackOptions("Выберите файл и маркетплейс для загрузки", "error");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        `https://api-seller.bonusreturn.ru/api/v1/personal_area/upload-products/?platform=${selectedPlatform}`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Api-Key": localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage();
        snackOptions("Файл загружен успешно", "success");
      } else {
        snackOptions("Ошибка загрузки файла", "error");
      }
    } catch (error) {
      snackOptions("Ошибка загрузки файла", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            <a href="https://api-seller.bonusreturn.ru/api/v1/personal_area/upload-products/example/">
              <p>Скачать пример файла для загрузки</p>
            </a>
          </div>
          <div className="cashback_stores_list">
            <p>Выбрать маркетплейс:</p>
            <div className="cashback_stores_lists cashback_stores_lists_seller">
              {platforms.map((img, index) => (
                <img
                  className={
                    selectedPlatform === img.platform_id
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
            <input
              type="file"
              ref={inputFileRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <button onClick={handleClick} disabled={loading}>
              <p>{loading ? "Загрузка..." : "Загрузить товар"}</p>
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
      <Snackbar text={snackText} status={snackStatus} visible={visibleSnack} />
    </>
  );
}

export default AddMarket;
