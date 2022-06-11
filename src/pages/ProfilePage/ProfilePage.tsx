import { useState } from "react";
import styles from "./ProfilePage.module.scss";
import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Button } from "primereact/button";
import { FormikErrors, FormikValues, useFormik } from "formik";
import { ChangePasswordInterface } from "../../typings";
import FormHorizontalSpacing from "../../components/FormComponents/FormHorizontalSpacing/FormHorizontalSpacing";
import FormPasswordInput from "../../components/FormComponents/FormPasswordInput/FormPasswordInput";
import { changePassword } from "../../slices/authSlice";
import { addErrorMessage, addSuccessMessage } from "../../slices/toastSlice";

const ProfilePage = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    validate: (data) => {
      let errors: FormikErrors<FormikValues> = {};

      if (!data.oldPassword) {
        errors.oldPassword = "Введите текущий пароль.";
      }

      if (!data.password) {
        errors.password = "Введите новый пароль.";
      }

      if (!data.confirmPassword) {
        errors.confirmPassword = "Подтвердите новый пароль.";
      }

      if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "Подтверждение не совпадает с паролем.";
      }

      return errors;
    },
    onSubmit: async (data: ChangePasswordInterface) => {
      try {
        const result = await dispatch(changePassword(data)).unwrap();
        dispatch(addSuccessMessage(result));
        setShowChangePassword(false);
        formik.resetForm();
      } catch (err) {
        //@ts-ignore
        dispatch(addErrorMessage(err.message));
      }
    },
  });
  const isFormFieldValid = (name: string) =>
    !!(
      formik.touched[name as "oldPassword" | "password" | "confirmPassword"] &&
      formik.errors[name as "oldPassword" | "password" | "confirmPassword"]
    );

  const getFormErrorMessage = (name: string) => {
    return (
      isFormFieldValid(
        name as "oldPassword" | "password" | "confirmPassword"
      ) && (
        <small className="p-error">
          {
            formik.errors[
              name as "oldPassword" | "password" | "confirmPassword"
            ]
          }
        </small>
      )
    );
  };

  return (
    <div className={styles.ProfileContainer}>
      <Dialog
        visible={showChangePassword}
        onHide={() => {
          setShowChangePassword(false);
        }}
        position="center"
        header={<div style={{ padding: "4px 0" }}>Изменение пароля</div>}
        style={{ width: "600px" }}
        resizable={false}
        draggable={false}
      >
        <form onSubmit={formik.handleSubmit} className="p-fluid">
          <FormHorizontalSpacing />
          <FormPasswordInput
            label="Старый пароль"
            value={formik.values.oldPassword}
            name="oldPassword"
            isSetting={false}
            handleChange={formik.handleChange}
            isFormFieldValid={isFormFieldValid}
            getFormErrorMessage={getFormErrorMessage}
          />
          <FormHorizontalSpacing />
          <FormPasswordInput
            label="Новый пароль"
            value={formik.values.password}
            name="password"
            isSetting={true}
            handleChange={formik.handleChange}
            isFormFieldValid={isFormFieldValid}
            getFormErrorMessage={getFormErrorMessage}
          />
          <FormHorizontalSpacing />
          <FormPasswordInput
            label="Подтвердите новый пароль"
            value={formik.values.confirmPassword}
            name="confirmPassword"
            isSetting={false}
            handleChange={formik.handleChange}
            isFormFieldValid={isFormFieldValid}
            getFormErrorMessage={getFormErrorMessage}
          />
          <FormHorizontalSpacing />

          <div className="p-d-flex p-jc-center">
            <Button type="submit" label="Сохранить" className="p-button-text" />
          </div>
        </form>
      </Dialog>
      <div className={styles.cardWrapper}>
        <Card className={styles.ProfileContent}>
          <h2 style={{ textAlign: "center" }}>Профиль</h2>
          <FormHorizontalSpacing />
          <FormHorizontalSpacing />
          <div className={styles.Content}>
            <strong>Email:</strong> {user.email}
          </div>
          <div className={styles.Content}>
            <strong>Name:</strong> {user.name}
          </div>
          <FormHorizontalSpacing />
          <div className={styles.ButtonContainer}>
            <Button
              onClick={() => setShowChangePassword(true)}
              label="Изменить пароль"
            />
          </div>
        </Card>
      </div>
      <div className={styles.cardWrapper}></div>
    </div>
  );
};

export default ProfilePage;
