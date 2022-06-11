import React from "react";
import { CheckboxChangeParams } from "primereact/checkbox";

export interface TFormCheckbox {
  label: string;
  value: boolean;
  name: string;
  isRequired?: boolean;
  handleChange: (e: React.ChangeEvent | CheckboxChangeParams) => void;
  isFormFieldValid: (name: string) => void;
  getFormErrorMessage: (name: string) => void;
}

export interface TFormInput {
  label: string;
  value: string;
  name: string;
  isRequired?: boolean;
  handleChange: (e: React.ChangeEvent) => void;
  isFormFieldValid?: (name: string) => void;
  getFormErrorMessage?: (name: string) => void;
}

export interface TFormPasswordInput {
  label: string;
  value: string;
  name: string;
  isSetting: boolean;
  handleChange: (e: React.ChangeEvent) => void;
  isFormFieldValid?: (name: string) => void;
  getFormErrorMessage?: (name: string) => void;
}

export interface RegistrationBody {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface ApiError {
  error: {
    code: number;
    message: string;
  };
}

export interface ChangePasswordInterface {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export interface ToastState {
  severity: string;
  summary: string;
  detail: string;
}

export interface LoaderState {
  loading: boolean;
}
