import Swal from 'sweetalert2';

interface AlertProps {
  icon?: 'error' | 'success' | 'info';
  title: string;
  text: string;
  showCancelButton?: boolean;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  callBack?: () => void;
}

const Alert = (props: AlertProps) => {
  Swal.fire({
    ...props,
  }).then((res) => props.callBack());
  //   if (isConfirmed) props.callBack;
};

Alert.defaultProps = {
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
};

export default Alert;
