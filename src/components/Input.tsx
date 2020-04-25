import * as React from "react";
import '../styles/about-page.css';
import * as PropTypes from 'prop-types';

const Input = ({
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

Input.propTypes = {
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    containerClass: PropTypes.string,
};

export default Input;
