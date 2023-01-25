import { deleteElementProps } from '@/types/control';

const deleteElement = ({ e, element, setMain }: deleteElementProps) => {
  setMain((prev) => {
    let cur = JSON.parse(JSON.stringify(prev));
    cur[element.sectionId].children.splice(element.index, 1);
    return cur;
  });
  e.stopPropagation();
};

export default deleteElement;
