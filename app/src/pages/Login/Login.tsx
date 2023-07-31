import styles from "./Login.module.css";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useState } from "react";
import { LoginData } from "../../types/credential";
import axiosClient from "../../config/axiosClient";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import Header from "../../components/Header/Header";
import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";

export default function Login() {
  // register removed
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginData>({
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
  });



  const { isLoading, mutate } = useMutation(
    (login: LoginData) => {
      return axiosClient.post<{ token: string }>("/login", login);
    },
    {
      onError: (err) => {
        if (err instanceof AxiosError) {
          setFormError(err.response?.data.message);
        } else if (err instanceof Error) {
          setFormError(err.message);
        }
      },
      onSuccess: ({ data }) => {
        logIn(data.token);
        navigate("/dashboard");
      },
    }
  );

  const onSubmit = (data: LoginData) => {
    mutate(data);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Header variant="h3" title="Login"/>
        <TextField<LoginData>
          id="username"
          label="Username"
          error={errors.username}
          name="username"
          register={register}
          options={{
            required: "Username is required",
            validate: {
              maxLength: (v) =>
                v.length <= 255 ||
                "Username should have at most 255 characters",
              matchPattern: (v) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                "Username must be a valid address",
            },
          }}
        />

        <TextField<LoginData>
          error={errors.password}
          id="password"
          label="Password"
          name="password"
          register={register}
          options={{
            required: "Password is required",
            validate: {
              maxLength: (v) =>
                v.length <= 25 || "Password should have at most 25 characters",
              minLength: (v) =>
                v.length >= 8 || "Password should have at least 8 characters",
              containNumber: (v) =>
                /\d/.test(v) || "Password must contain at least 1 number",
              containSpecialChar: (v) =>
                /[^A-Za-z0-9\s]+/.test(v) ||
                "Password must contain at least 1 special character",
            },
          }}
          type="password"
        />

        <p className={styles.formError}>{formError && formError}</p>

        <div className={styles.buttonContainer}>
          <Button
            label="Sign in"
            type="submit"
            primary
            disabled={isLoading || !isValid}
          />
        </div>
      </form>
    </div>
  );
}
