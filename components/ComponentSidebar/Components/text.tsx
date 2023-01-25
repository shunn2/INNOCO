import ComponentWrapper from './componentWrapper';
import { textData } from './data';

const TextComponent = () => {
  return <ComponentWrapper type="Text" icon={'text-icon'} data={textData} />;
};

export default TextComponent;
