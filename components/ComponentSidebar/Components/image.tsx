import ComponentWrapper from './componentWrapper';
import { imageData } from './data';

const ImageComponent = () => {
  return (
    <ComponentWrapper type="Image" icon={'button-icon'} data={imageData} />
  );
};

export default ImageComponent;
