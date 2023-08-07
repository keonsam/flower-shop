import Modal from "../Modal/Modal";
import styles from "./DeleteModal.module.css";
import Footer from "../Footer/Footer";

type Props = {
  description: string;
  disabled?: boolean;
  onClose: (update?: boolean) => void;
  onDelete: () => void;
  title: string;
};

const DeleteModal = ({
  description,
  disabled = false,
  onClose,
  onDelete,
  title,
}: Props) => {
  return (
    <Modal
      title={title}
      footer={
        <Footer
          disabled={disabled}
          onClose={onClose}
          onSubmit={onDelete}
          submitLabel="Confirm"
          closeLabel="Close"
        />
      }
    >
      <div className={styles.container}>{description}</div>
    </Modal>
  );
};

export default DeleteModal;
