import * as React from "react";
import '../_styles/about-page.css';
import { onChange } from "../types/commonTypes";

interface InputProps {
  title: string,
  onChange: onChange,
  value: string,
  containerClass: string,
};

const Input: React.FunctionComponent<InputProps> = ({
  containerClass,
  title,
  onChange,
  value,
  ...inputProps
}) => {
  return (
    <div className={containerClass}>
      <h2 className="alt-header">{title}</h2>
      <input
        value={value}
        onChange={onChange}
        {...inputProps}
      />
    </div>
  );
};

export default Input;
