interface StyleChangeProps {
  element: any;
  type: string;
  value: string;
  setMainData: (prev) => void;
}

const styleChange = ({
  element,
  type,
  value,
  setMainData,
}: StyleChangeProps) => {
  setMainData((prev) => {
    const cur = JSON.parse(JSON.stringify(prev));
    if (element.el.type === 'section')
      cur[element.id].sectionProps.style[type] = value;
    else
      cur[element.sectionId].children[element.index].props.style[type] = value;
    return cur;
  });
};

export default styleChange;
