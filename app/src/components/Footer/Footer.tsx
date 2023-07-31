import Button from "../Button/Button";
import styles from "./Footer.module.css";

type Props = {
  disabled: boolean;
  onClose: () => void;
  onSubmit: () => void;
  submitLabel: string;
  closeLabel: string;
};

export default function Footer({
  disabled,
  onClose,
  onSubmit,
  submitLabel,
  closeLabel,
}: Props) {
  return (
    <div className={styles.buttonContainer}>
      <Button label={closeLabel} size="medium" onClick={onClose} />
      <Button
        disabled={disabled}
        label={submitLabel}
        onClick={onSubmit}
        size="medium"
        primary
        type="submit"
      />
    </div>
  );
}
