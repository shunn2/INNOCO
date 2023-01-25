import { duplicateSectionProps } from '@/types/control';
import { v4 as uuidv4 } from 'uuid';

const duplicateSection = ({
  e,
  element,
  main,
  setMain,
  setSectionOrder,
}: duplicateSectionProps) => {
  const duplicated = JSON.parse(JSON.stringify(main[element.id]));
  duplicated.id = uuidv4();
  duplicated.children.forEach((element) => {
    element.id = uuidv4();
  });
  setMain((prev) => {
    let cur = JSON.parse(JSON.stringify(prev));
    cur[duplicated.id] = duplicated;
    return cur;
  });
  setSectionOrder((prev) => {
    let cur = [...prev];
    cur.splice(element.index + 1, 0, duplicated.id);
    return cur;
  });
  e.stopPropagation();
};

export default duplicateSection;
