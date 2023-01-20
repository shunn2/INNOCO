import ComponentWrapper from './componentWrapper';
import { linkData } from './data';

const LinkComponent = () => {
  return <ComponentWrapper type="Link" icon={'link-icon'} data={linkData} />;
};

export default LinkComponent;
