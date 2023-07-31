import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import styles from "./Select.module.css";

type SelectOption = {
  value: string;
  label: string;
};

type Props<T extends FieldValues> = {
  error?: FieldError | undefined;
  id: string;
  label: string;
  name: Path<T>;
  options?: RegisterOptions;
  placeholder?: string;
  register: UseFormRegister<T>;
  required?: boolean;
  selectOption: SelectOption[];
};

export default function Select<T extends FieldValues>({
  error,
  label,
  id,
  name,
  options,
  placeholder,
  register,
  selectOption,
}: Props<T>) {
  return (
    <div className={styles.textField}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select
        className={styles.input}
        id={id}
        placeholder={placeholder}
        {...register(name, options)}
      >
        {selectOption.map(({ value, label: optionLabel }) => (
          <option key={value} value={value}>
            {optionLabel}
          </option>
        ))}
      </select>
      <p className={styles.error}>{error && error.message}</p>
    </div>
  );
}
