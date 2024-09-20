import React from "react";

import { ReactComponent as Fav } from "../../assets/icons/fav.svg";
import { ReactComponent as Gift } from "../../assets/icons/gift.svg";
import { ReactComponent as Share } from "../../assets/icons/share.svg";
import "./card.css";

function cashbackDisplay(cashback_up_to) {
  if (!cashback_up_to) {
    return null;
  }

  let trimmedCashback;
  if (cashback_up_to.includes("RUB")) {
    trimmedCashback = cashback_up_to.split("R")[0] + "R";
  } else if (cashback_up_to.includes("%")) {
    trimmedCashback = cashback_up_to;
  } else {
    trimmedCashback = cashback_up_to;
  }

  return <p>до {trimmedCashback}</p>;
}

function Card({ item }) {
  
  return (
    <div className="card">
      <div className="add_favorite">
        <Fav />
      </div>
      <div className="card_img">
        <img src={item.image_url} alt="" />
      </div>
      <div className="card_desc">
        <div className="card_desc_t">
          <p>{item.name}</p>
        </div>
        <div className="card_amount">
          {cashbackDisplay(item.cashback_up_to)}
          <div>
            <a href={item.cpi_url}>
              <Gift />
            </a>
            <a href="#">
              <Share />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
