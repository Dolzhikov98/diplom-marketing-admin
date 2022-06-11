import React from "react";
import { Checkbox } from "primereact/checkbox";
import { classNames } from "primereact/utils";
import styles from "./FormCheckbox.module.scss";
import {TFormCheckbox} from "../../../typings";

const FormCheckbox = ({
  label,
  value,
  name,
  isRequired,
  handleChange,
  isFormFieldValid,
}: TFormCheckbox) => {
  return (
    <div className={classNames([styles.CheckboxContainer, "p-field-checkbox"])}>
      <Checkbox
        inputId={name}
        name={name}
        checked={value}
        onChange={handleChange}
        className={classNames({ "p-invalid": isFormFieldValid(name) })}
      />
      <label
        htmlFor="accept"
        className={classNames([styles.CheckboxLabel, { "p-error": isFormFieldValid(name) }])}
      >
        {label}
        {isRequired && "*"}
      </label>
    </div>
  );
};

export default FormCheckbox;
