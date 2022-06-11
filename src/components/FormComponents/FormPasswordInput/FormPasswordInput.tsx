import { Divider } from "primereact/divider";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import React from "react";
import {TFormPasswordInput} from "../../../typings";

const FormPasswordInput = ({
  label,
  value,
  name,
  isSetting,
  handleChange,
  isFormFieldValid,
  getFormErrorMessage,
}: TFormPasswordInput) => {
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: "1.5" }}>
        <li>Одна строчная буква</li>
        <li>Одна заглавная буква</li>
        <li>Одна цифра</li>
        <li>Минимум 8 символов</li>
      </ul>
    </React.Fragment>
  );
  return (
    <div className="p-field">
      <span className="p-float-label">
        <Password
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          toggleMask
          className={classNames({ "p-invalid": isFormFieldValid && isFormFieldValid(name) })}
          promptLabel={isSetting ? "Введите пароль" : ""}
          weakLabel={"Пароль слишком короткий"}
          mediumLabel={"Пароль можно подобрать"}
          strongLabel={"Надёжный пароль"}
          feedback={isSetting}
          footer={isSetting && passwordFooter}
        />
        <label htmlFor="password" className={classNames({ "p-error": isFormFieldValid && isFormFieldValid(name) })}>
          {label}*
        </label>
      </span>
      {getFormErrorMessage && getFormErrorMessage(name)}
    </div>
  );
};

export default FormPasswordInput;
