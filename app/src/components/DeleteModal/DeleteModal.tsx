import Modal from "../Modal/Modal";
import styles from "./DeleteModal.module.css";
import Footer from "../Footer/Footer";

type Props = {
  disabled?: boolean;
  onClose: (update?: boolean) => void;
  onDelete: () => void;
};

const DeleteModal = ({ disabled = false, onClose, onDelete }: Props) => {
  return (
    <Modal
      title="Confirm Customer Deletion"
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
      <div className={styles.container}></div>
    </Modal>
  );
};

export default DeleteModal;
