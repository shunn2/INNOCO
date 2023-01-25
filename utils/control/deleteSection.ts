import { deleteSectionProps } from '@/types/control';

const deleteSection = ({
  e,
  element,
  setMain,
  setSectionOrder,
}: deleteSectionProps) => {
  setMain((prev) => {
    let cur = JSON.parse(JSON.stringify(prev));
    delete cur[element.sectionId];
    return cur;
  });
  setSectionOrder((prev) => {
    let cur = [...prev];
    cur.splice(element.index, 1);
    return cur;
  });
  e.stopPropagation();
};

export default deleteSection;
