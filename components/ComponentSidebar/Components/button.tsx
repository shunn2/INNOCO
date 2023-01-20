import ComponentWrapper from './componentWrapper';
import { buttonData } from './data';

const ButtonComponent = () => {
  return (
    <ComponentWrapper type="Button" icon={'button-icon'} data={buttonData} />
  );
};

export default ButtonComponent;
