const deleteElement = (element, setMain) => {
  setMain((prev) => {
    let cur = JSON.parse(JSON.stringify(prev));
    cur[element.sectionId].children.splice(element.index, 1);
    return cur;
  });
};

export default deleteElement;
