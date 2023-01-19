import ComponentWrapper from './componentWrapper';
import { textData } from './data';

const TextComponent = () => {
  return <ComponentWrapper type="text" icon={'box-icon'} data={textData} />;
};

export default TextComponent;
