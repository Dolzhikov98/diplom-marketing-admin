import { useState } from "react";
import { Card } from "primereact/card";
import styles from "./SignIn.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import FormHorizontalSpacing from "../../components/FormComponents/FormHorizontalSpacing/FormHorizontalSpacing";
import FormInput from "../../components/FormComponents/FormInput/FormInput";
import FormPasswordInput from "../../components/FormComponents/FormPasswordInput/FormPasswordInput";
import { FormikErrors, FormikValues, useFormik } from "formik";
import { Dialog } from "primereact/dialog";
import { login, resetPassword } from "../../slices/authSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { addErrorMessage, addSuccessMessage } from "../../slices/toastSlice";

interface SignInFormInterface {
  email: string;
  password: string;
}

const SignIn = () => {
  const [isShown, setIsShown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (data) => {
      let errors: FormikErrors<FormikValues> = {};

      if (!data.email) {
        errors.email = "Введите email.";
      }

      if (!data.password) {
        errors.password = "Введите пароль.";
      }

      return errors;
    },
    onSubmit: async (data: SignInFormInterface) => {
      try {
        await dispatch(login(data)).unwrap();
        dispatch(addSuccessMessage("Добро пожаловать"));
        navigate("/");
      } catch (err) {
        //@ts-ignore
        dispatch(addErrorMessage(err.message));
      }
    },
  });

  const isFormFieldValid = (name: string) =>
    !!(formik.touched[name as "email" | "password"] && formik.errors[name as "email" | "password"]);

  const getFormErrorMessage = (name: string) => {
    return (
      isFormFieldValid(name as "email" | "password") && (
        <small className="p-error">{formik.errors[name as "email" | "password"]}</small>
      )
    );
  };

  const resetPasswordFormik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (data) => {
      let errors: FormikErrors<FormikValues> = {};

      if (!data.email) {
        errors.email = "Введите email.";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
        errors.email = "Некорректный Email.";
      }

      return errors;
    },
    onSubmit: async (data: { email: string }) => {
      try {
        const result = await dispatch(resetPassword(data.email)).unwrap();
        dispatch(addSuccessMessage(result));
      } catch (err) {
        //@ts-ignore
        dispatch(addErrorMessage(err.message));
      }
      // setIsShown(false);
      // formik.resetForm();
    },
  });

  const isResetFormFieldValid = (name: string) =>
    !!(resetPasswordFormik.touched[name as "email"] && resetPasswordFormik.errors[name as "email"]);

  const getResetFormErrorMessage = (name: string) => {
    return (
      isResetFormFieldValid(name as "email") && (
        <small className="p-error">{resetPasswordFormik.errors[name as "email"]}</small>
      )
    );
  };

  return (
    <div className={styles.SignInContainer}>
      <Dialog
        visible={isShown}
        onHide={() => setIsShown(false)}
        position="center"
        header={<div className={styles.modalHeader}>"Восстановление пароля."</div>}
        style={{ width: "400px" }}
        resizable={false}
        draggable={false}
      >
        <div className={styles.DialogContainer}>
          <form onSubmit={resetPasswordFormik.handleSubmit} className="p-fluid">
            {/*<h5 className={styles.Header}>Введите почту для восстановления пароля.</h5>*/}
            <FormHorizontalSpacing />
            <FormInput
              label="Email"
              value={resetPasswordFormik.values.email}
              name="email"
              isRequired={true}
              handleChange={resetPasswordFormik.handleChange}
              isFormFieldValid={isResetFormFieldValid}
              getFormErrorMessage={getResetFormErrorMessage}
            />
            <FormHorizontalSpacing />
            <Button type="submit" label="Сбросить пароль" className="p-mt-2" />
          </form>
        </div>
      </Dialog>
      <Card className={styles.Card}>
        <h5 className={styles.Header}>Вход</h5>
        <form onSubmit={formik.handleSubmit} className="p-fluid">
          <FormInput
            label="Email"
            value={formik.values.email}
            name="email"
            isRequired={true}
            handleChange={formik.handleChange}
            isFormFieldValid={isFormFieldValid}
            getFormErrorMessage={getFormErrorMessage}
          />
          <FormHorizontalSpacing />
          <FormPasswordInput
            label="Пароль"
            value={formik.values.password}
            name="password"
            isSetting={false}
            handleChange={formik.handleChange}
            isFormFieldValid={isFormFieldValid}
            getFormErrorMessage={getFormErrorMessage}
          />
          <FormHorizontalSpacing />
          <Button type="submit" label="Войти" className="p-mt-2" />
          {/* <p className={styles.LinkContainer}>
            Забыли пароль?{" "}
            <span className={styles.Link} onClick={() => setIsShown(true)}>
              Восстановить
            </span>
          </p> */}
          {/* <p className={styles.LinkContainer}>
            У вас нет учетной записи?{" "}
            <Link to={"/registration"} className={styles.Link}>
              Зарегистрироваться
            </Link>
          </p> */}
        </form>
      </Card>
    </div>
  );
};

export default SignIn;
