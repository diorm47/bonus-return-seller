import React, { useState, useEffect } from "react";
import { ReactComponent as FaqArrow } from "../../assets/icons/faq-arrow.svg";

const daysOfWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

const DateNavigator = ({ selectedDate, setSelectedDate }) => {
  const [currentWeek, setCurrentWeek] = useState([]);

  const [currentMonth, setCurrentMonth] = useState("");

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today.toISOString().split("T")[0]); // Set today's date as selected
    updateWeek(today);
  }, []);

  const updateWeek = (startDate) => {
    const today = new Date();
    const startOfWeek = new Date(
      startDate.setDate(startDate.getDate() - startDate.getDay() + 1)
    );
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      if (currentDate > today) {
        dates.push({ day: daysOfWeek[i], date: currentDate });
      } else if (
        currentDate.toISOString().split("T")[0] ===
        today.toISOString().split("T")[0]
      ) {
        dates.push({ day: daysOfWeek[i], date: currentDate });
      } else {
        dates.push({ day: daysOfWeek[i], date: currentDate, disabled: true });
      }
    }
    setCurrentWeek(dates);
    setCurrentMonth(startOfWeek.toLocaleString("ru-RU", { month: "long" }));
  };

  const changeWeek = (offset) => {
    const newWeekStart = new Date(currentWeek[0].date);
    newWeekStart.setDate(newWeekStart.getDate() + offset * 7);
    updateWeek(newWeekStart);
  };

  const handleDateClick = (date) => {
    if (date.disabled) return;
    setSelectedDate(date.toISOString().split("T")[0]);
  };

  return (
    <>
      <div className="sellers_header_date_title">
        <h2>Дата и время</h2>
        <h3>{currentMonth}</h3>
      </div>
      <div className="sellers_header_dates_wrapper">
        <button onClick={() => changeWeek(-1)} className="arrow_right_date">  <FaqArrow /></button>

        <div className="sellers_header_dates">
          {currentWeek.map((day, index) => (
            <div
              key={index}
              className={`${
                selectedDate === day.date.toISOString().split("T")[0]
                  ? "sellers_header_date_selected"
                  : ""
              } ${day.disabled ? "sellers_header_date_disabled" : ""} ${
                index >= 5 ? "sellers_header_date_weekend" : ""
              }`}
              onClick={() => handleDateClick(day.date)}
            >
              <p>{day.day}</p>
              <span>{day.date.getDate()}</span>
            </div>
          ))}
        </div>
        <button onClick={() => changeWeek(1)}>
          <FaqArrow />
        </button>
      </div>
    </>
  );
};

export default DateNavigator;
