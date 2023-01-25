interface CurrentStyleProps {
  element: any;
  type: string;
  mainData: any;
}

const getCurrentStyle = ({ element, type, mainData }: CurrentStyleProps) => {
  if (element.el.type === 'section')
    return mainData[element.id].sectionProps.style[type];
  return mainData[element.sectionId].children[element.idx]?.props.style[type];
};

export default getCurrentStyle;
