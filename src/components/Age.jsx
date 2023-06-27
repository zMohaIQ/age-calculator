import React, { useRef, useState } from "react";
import "./Age.css";
import iconArrow from "../assets/images/icon-arrow.svg";

const Age = () => {
  const dayRef = useRef();
  const monthRef = useRef();
  const yearRef = useRef();

  const [ageYears, setAgeYears] = useState("--");
  const [ageMonths, setAgeMonths] = useState("--");
  const [ageDays, setAgeDays] = useState("--");
  const [formErrors, setFormErrors] = useState({
    notEmptyDay: false,
    notEmptyMonth: false,
    notEmptyYear: false,
    dayValid: false,
    monthValid: false,
    yearValid: false,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    const dayValue = parseInt(dayRef.current.value);
    const monthValue = parseInt(monthRef.current.value);
    const yearValue = parseInt(yearRef.current.value);

    const newFormErrors = {
      notEmptyDay: isNaN(dayValue),
      notEmptyMonth: isNaN(monthValue),
      notEmptyYear: isNaN(yearValue),
      dayValid: dayValue > 31 || dayValue < 0,
      monthValid: monthValue > 12 || monthValue < 0,
      yearValid: yearValue > 2022 || yearValue < 1900,
    };

    if (
      newFormErrors.notEmptyDay ||
      newFormErrors.notEmptyMonth ||
      newFormErrors.notEmptyYear ||
      newFormErrors.dayValid ||
      newFormErrors.monthValid ||
      newFormErrors.yearValid
    ) {
      setFormErrors(newFormErrors);
      setAgeYears("--");
      setAgeMonths("--");
      setAgeDays("--");
    } else {
      const today = new Date();
      const birthDate = new Date(yearValue, monthValue - 1, dayValue);

      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();
      let days = today.getDate() - birthDate.getDate();

      if (months < 0 || (months === 0 && days < 0)) {
        years--;
        months += 12;
      }

      if (days < 0) {
        const lastMonthDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          0
        );
        days += lastMonthDate.getDate();
        months--;
      }

      setAgeYears(years);
      setAgeMonths(months);
      setAgeDays(days);
      setFormErrors({
        notEmptyDay: false,
        notEmptyMonth: false,
        notEmptyYear: false,
        dayValid: false,
        monthValid: false,
        yearValid: false,
      });
    }
  };

  return (
    <main className="card">
      <div className="container">
        <form onSubmit={submitHandler}>
          <div className="form_container">
            <div className="block">
              <label
                htmlFor="day"
                className={
                  formErrors.notEmptyDay
                    ? "error"
                    : "" || formErrors.dayValid
                    ? "error"
                    : ""
                }
              >
                Day
              </label>
              <input
                type="number"
                id="day"
                placeholder="DD"
                ref={dayRef}
                className={
                  formErrors.notEmptyDay
                    ? "border"
                    : "" || formErrors.dayValid
                    ? "border"
                    : ""
                }
              />
              <small>
                {formErrors.notEmptyDay && "This field is required"}
                {formErrors.dayValid && "Must be a valid day"}
              </small>
            </div>
            <div className="block">
              <label
                htmlFor="month"
                className={
                  formErrors.notEmptyMonth
                    ? "error"
                    : "" || formErrors.monthValid
                    ? "error"
                    : ""
                }
              >
                Month
              </label>
              <input
                type="number"
                id="month"
                placeholder="MM"
                ref={monthRef}
                className={
                  formErrors.notEmptyMonth
                    ? "border"
                    : "" || formErrors.monthValid
                    ? "border"
                    : ""
                }
              />
              <small>
                {formErrors.notEmptyMonth && "This field is required"}
                {formErrors.monthValid && "Must be a valid month"}
              </small>
            </div>
            <div className="block">
              <label
                htmlFor="year"
                className={
                  formErrors.notEmptyYear
                    ? "error"
                    : "" || formErrors.yearValid
                    ? "error"
                    : ""
                }
              >
                Year
              </label>
              <input
                type="number"
                id="year"
                placeholder="YY"
                ref={yearRef}
                className={
                  formErrors.notEmptyYear
                    ? "border"
                    : "" || formErrors.yearValid
                    ? "border"
                    : ""
                }
              />
              <small>
                {formErrors.notEmptyYear && "This field is required"}
                {formErrors.yearValid && "Must be a valid year"}
              </small>
            </div>
          </div>
          <div className="submit_block">
            <hr />
            <button type="submit" className="submit_btn">
              <img src={iconArrow} alt="iconArrow" />
            </button>
          </div>
        </form>
        <div className="output">
          <h1>
            <span id="YY">{ageYears}</span> Years
          </h1>
          <h1>
            <span id="MM">{ageMonths}</span> Months
          </h1>
          <h1>
            <span id="DD">{ageDays}</span> Days
          </h1>
        </div>
      </div>
    </main>
  );
};

export default Age;
