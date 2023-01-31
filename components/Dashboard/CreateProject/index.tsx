import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    height: '500px',
    backgroundColor: '#000',
  },
  overlay: {},
};

interface CreateModalProps {
  isOpen: boolean;
  handleIsOpen: () => void;
}

const ProjectCreateModal = ({ isOpen, handleIsOpen }: CreateModalProps) => {
  return (
    <Modal isOpen={isOpen} style={customStyles}>
      <div>hihi</div>
    </Modal>
  );
};

export default ProjectCreateModal;
