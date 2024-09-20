import React, { useState } from "react";

import img from "../../../assets/images/tg-bg.png";
import { mainApi } from "../../../components/utils/main-api";
import Snackbar from "../../../components/snackbar/snackbar";

function ProductItem({ item, platforms }) {
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

  const filteredPlatforms = platforms.filter(
    (platform) => platform.platform_id === item.platform
  );

  const confrimFeedbackAction = (apply_id) => {
    mainApi
      .confrimFeedback({
        apply_id: apply_id,
      })
      .then((data) => {
        snackOptions(data.detail, "success");
      })
      .catch((err) => {
        snackOptions(err.detail, "error");
      });
  };

  const rejectFeedbackAction = (apply_id) => {
    mainApi
      .rejectFeedback({
        apply_id: apply_id,
      })
      .then((data) => {
        snackOptions(data.detail, "success");
      })
      .catch((err) => {
        snackOptions(err.detail, "error");
      });
  };

  return (
    <>
      <div className="all_product_item">
        <div className="all_product_item_desc">
          <img src={img} alt="" />
          <div>
            <p>
              <b>{item.title}</b>
            </p>
            <span>Категория товара</span>
            <br />
            <span>Артикул: {item.product_id} </span>
            <p>превью товара с UTM</p>
            <a href={item.product_link} className="main_link">
              {filteredPlatforms[0].title}
            </a>
          </div>
        </div>
        <div className="all_product_item_stat">
          <div>
            <p className="main_text">{item.cashback_amount}</p>
            <p>
              <b>новый</b>
            </p>
          </div>
          <div>
            <p className="main_text">{item.feedback_amount || 0}</p>
            <p>
              <b>новый</b>
            </p>
          </div>
          <div>
            <p className="main_text">{item.feedback_amount || 0}</p>
            <p>
              <b>новый</b>
            </p>
          </div>
        </div>
        <div className="all_product_item_revs">
          <p className="main_text">
            {item.keywords && item.keywords.length
              ? item.keywords.map((kword) => <span>{kword}</span>)
              : "Пусто"}
          </p>
          <p className="main_text">
            {item.feedback_text ? item.feedback_text : "Пусто"}
          </p>
        </div>
        {item.status == "under_consideration" ? (
          <div className="all_product_item_actions">
            <div>
              <button onClick={() => confrimFeedbackAction(item.apply_id)}>
                Принять
              </button>
            </div>
            <p
              onClick={() => rejectFeedbackAction(item.apply_id)}
              className="main_text"
            >
              отказ{" "}
            </p>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <Snackbar text={snackText} status={snackStatus} visible={visibleSnack} />
    </>
  );
}

export default ProductItem;
