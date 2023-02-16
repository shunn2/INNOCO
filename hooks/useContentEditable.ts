const useContentEditable = (e, elIdx, sectionId, setMainData) => {
  setMainData((prev) => {
    const cur = JSON.parse(JSON.stringify(prev));
    cur[sectionId].children[elIdx].content = e.target.innerHTML;
    return cur;
  });
};

export default useContentEditable;
