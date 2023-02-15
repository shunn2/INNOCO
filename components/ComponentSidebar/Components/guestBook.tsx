import ComponentWrapper from './componentWrapper';
import { guestBook } from './data';

const GuestBookComponent = () => {
  return (
    <ComponentWrapper type="GuestBook" icon={'button-icon'} data={guestBook} />
  );
};

export default GuestBookComponent;
