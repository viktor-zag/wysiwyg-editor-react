import React, { useEffect, useRef, useState } from "react";

const CustomSelect = ({ setValue, options, initialOption }) => {
  const [currentOption, setCurrentOption] = useState(initialOption ? initialOption : "JavaScript");
  const [selectOpen, setSelectOpen] = useState(false);
  const dropDownRef = useRef();

  const handleChoice = (option) => {
    console.log(option);
    setCurrentOption(option);
    setSelectOpen(false);
    setValue(option);
  };

  const handleOpenSelect = () => {
    if (selectOpen) {
      console.log("close!");
      setSelectOpen(false);
    } else {
      console.log("open!");
      setSelectOpen(true);
    }
  };

  const handleClickOutside = (event) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current.contains(event.target)
    ) {
      event.stopPropagation();
      setSelectOpen(false)
    }

  };
  useEffect(() => {
    document.addEventListener("mousedown", (e) => handleClickOutside(e));
    return () => {
      document.removeEventListener("mousedown", (e) => handleClickOutside(e));
    };
  }, []);

  return (
    <div className="cust_select" ref={dropDownRef}>
      <div className="cust_select_btn" onClick={() => handleOpenSelect()}>
        <p className="cust_select_selected_text">{currentOption}</p>
        <div className="cust_select_chevron">
          <div className="chev_item chev_left"></div>
          <div className="chev_item chev_right"></div>
        </div>
      </div>
      <div className={`cust_select_dd ${selectOpen ? "active" : ""}`}>
        {options &&
          options.map((o) => (
            <p
              key={o}
              className="cust_select_option"
              onClick={() => handleChoice(o)}
            >
              {o}
            </p>
          ))}
      </div>
    </div>
  );
};

export default CustomSelect;
