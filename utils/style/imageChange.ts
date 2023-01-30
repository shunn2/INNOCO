interface ImageChangeProps {
  element: any;
  url: string;
  setMainData: (prev) => void;
}

const imageChange = ({ element, url, setMainData }: ImageChangeProps) => {
  setMainData((prev) => {
    const cur = JSON.parse(JSON.stringify(prev));
    cur[element.sectionId].children[element.index].props.src = url;
    return cur;
  });
};

export default imageChange;
