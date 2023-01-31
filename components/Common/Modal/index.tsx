import { PropsWithChildren } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    minWidth: '600px',
    minHeight: '500px',
    backgroundColor: '#000',
    opacity: 1.0,
  },
  overlay: {
    opacity: 1.0,
  },
};

interface ModalProps {
  isOpen: boolean;
}

const CreateModal = (props: PropsWithChildren<ModalProps>) => {
  const { children, isOpen } = props;
  return (
    <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
      {children}
    </Modal>
  );
};

export default CreateModal;
