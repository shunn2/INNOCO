import theme from '@styles/theme';
import { PropsWithChildren } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: '36px',
    height: '600px',
    minWidth: '800px',
    minHeight: '600px',
    backgroundColor: `${theme.color.gray.dark}`,
    borderRadius: '16px',
  },
  overlay: {
    backgroundColor: 'rgba(255,255,255,0.1)',
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
