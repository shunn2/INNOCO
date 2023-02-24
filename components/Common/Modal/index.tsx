import theme from '@styles/theme';
import { PropsWithChildren, useEffect } from 'react';
import Modal from 'react-modal';
import SvgIcon from '../Svg/SvgIcon';
import * as Styled from './styled';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: '36px',
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
  width?: string;
  height?: string;
  title?: string;
  handleOpen?: () => void;
}

const CreateModal = (props: PropsWithChildren<ModalProps>) => {
  const { children, isOpen } = props;
  useEffect(() => {
    if (props.width) customStyles.content.minWidth = props.width;
    if (props.height) customStyles.content.minHeight = props.height;
  }, []);
  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      style={{
        ...customStyles,
        minWidth: props.width,
        height: props.height,
      }}
    >
      <Styled.ModalTitleContainer>
        <p>{props.title}</p>
        <div onClick={() => props.handleOpen()}>
          <SvgIcon type="close-icon" />
        </div>
      </Styled.ModalTitleContainer>
      {children}
    </Modal>
  );
};

export default CreateModal;
