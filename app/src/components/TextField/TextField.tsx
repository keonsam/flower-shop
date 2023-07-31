import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import styles from "./TextField.module.css";

type Props<T extends FieldValues> = {
  error?: FieldError | undefined;
  id: string;
  label?: string;
  name: Path<T>;
  options?: RegisterOptions;
  placeholder?: string;
  register: UseFormRegister<T>;
  required?: boolean;
  type?: "text" | "number" | "date" | "password" | "datetime-local";
};

export default function TextField<T extends FieldValues>({
  error,
  label,
  id,
  name,
  options,
  placeholder,
  register,
  type = "text",
}: Props<T>) {
  return (
    <div className={styles.textField}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        className={styles.input}
        id={id}
        placeholder={placeholder}
        type={type}
        {...register(name, options)}
      />
      <p className={styles.error}>{error && error.message}</p>
    </div>
  );
}
