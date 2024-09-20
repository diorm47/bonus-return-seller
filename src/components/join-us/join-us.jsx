import React from "react";
import { ReactComponent as VK } from "../../assets/icons/vk.svg";

function JoinUs() {
  return (
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
  );
}

export default JoinUs;
