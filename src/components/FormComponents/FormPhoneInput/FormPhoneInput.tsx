import { InputMask, InputMaskChangeParams } from "primereact/inputmask";
import { classNames } from "primereact/utils";
import React from "react";
import { TFormInput } from "../../../typings";

const FormPhoneInput = ({
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
        <InputMask
          id={name}
          name={name}
          value={value}
          // @ts-ignore
          onChange={(e: InputMaskChangeParams) => handleChange(e)}
          mask="+7 (999) 999-9999"
          className={classNames({
            "p-invalid": isFormFieldValid && isRequired && isFormFieldValid(name),
          })}
        />
        <label
          htmlFor="name"
          className={classNames({
            "p-error": isRequired && isFormFieldValid && isFormFieldValid(name),
          })}
        >
          {label}
          {isRequired && "*"}
        </label>
      </span>
      {isRequired && getFormErrorMessage && getFormErrorMessage(name)}
    </div>
  );
};

export default FormPhoneInput;
