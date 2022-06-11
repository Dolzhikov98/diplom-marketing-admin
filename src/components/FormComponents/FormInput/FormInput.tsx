import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React from "react";
import {TFormInput} from "../../../typings";


const FormInput = ({
  label,
  value,
  name,
  isRequired,
  handleChange,
  isFormFieldValid,
  getFormErrorMessage,
}: TFormInput) => {
  return (
    <div className="p-field">
      <span className="p-float-label">
        <InputText
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={classNames({ "p-invalid": isFormFieldValid && isRequired && isFormFieldValid(name) })}
        />
        <label htmlFor="name" className={classNames({ "p-error": isRequired && isFormFieldValid && isFormFieldValid(name) })}>
          {label}
          {isRequired && "*"}
        </label>
      </span>
      {isRequired && getFormErrorMessage && getFormErrorMessage(name)}
    </div>
  );
};

export default FormInput;
