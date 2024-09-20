import React from "react";
import { ReactComponent as Snipet } from "../../assets/icons/snippet.svg";


function DownloadSnippet() {
  return (
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
  );
}

export default DownloadSnippet;
