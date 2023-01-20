import { v4 as uuidv4 } from 'uuid';

const duplicateElement = (element, main, setMain) => {
  const duplicated = { ...main[element.sectionId].children[element.index] };
  duplicated.id = uuidv4();
  setMain((prev) => {
    let cur = JSON.parse(JSON.stringify(prev));
    cur[element.sectionId].children.splice(element.index, 0, duplicated);
    return cur;
  });
};

export default duplicateElement;
