import ComponentWrapper from './componentWrapper';
import { sectionData } from './data';

const SectionComponent = () => {
  return (
    <ComponentWrapper type="Section" icon={'box-icon'} data={sectionData} />
  );
};

export default SectionComponent;
