import React from "react";
import PropTypes from "prop-types";
const Input = (props) => {
  const { name, label, type, error, ...rest } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        id={name}
        name={name}
        type={type}
        className="form-control"
        // aria-describedby={name + "Help"}
      />
      {error && <div className="alert alert-danger">{error}</div>}
      {/* <small id={name + "Help"} className="form-text text-muted">
        {helpText}
      </small> */}
    </div>
  );
};
Input.propType = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  helpText: PropTypes.string,
  inputType: PropTypes.string,
};
export default Input;
