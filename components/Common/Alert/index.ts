import Swal from 'sweetalert2';

interface AlertProps {
  icon?: 'error' | 'success' | 'info' | 'warning';
  title?: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  allowOutsideClick?: boolean;
}

const Alert = async (props: AlertProps) => {
  const data = await Swal.fire({
    ...props,
  });
  return data;
};

Alert.defaultProps = {
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
};

export default Alert;
