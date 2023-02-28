export const contentEditable = (e, elIdx, sectionId, setMainData) => {
  setMainData((prev) => {
    const cur = JSON.parse(JSON.stringify(prev));
    cur[sectionId].children[elIdx].content = e.target.innerText;
    return cur;
  });
};
