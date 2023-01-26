import { useRecoilState, useRecoilValue } from 'recoil';
import { withMainData } from '@recoil/editor';
import { elementInfoAtom } from '@recoil/styleSideBar/atom';
import { useEffect, useState } from 'react';
import * as Styled from '../../../styled';
import styleChange from '@utils/style/styleChange';
import getCurrentStyle from '@utils/style/getCurrentStyle';
import { SvgIcon } from '@components/Common';

const flexList = {
  flexDirection: 'Direction',
  alignItems: 'Align items',
  justifyContent: 'Justify Content',
  flexWrap: 'Children wrap',
  alignContent: 'Align content',
};
const propertyList = {
  flexDirection: ['row', 'column', 'row-reverse', 'column-reverse'],
  alignItems: ['start', 'center', 'end', 'stretch', 'baseline'],
  justifyContent: ['start', 'center', 'end', 'space-between', 'space-around'],
  flexWrap: ['nowrap', 'wrap', 'wrap-reverse'],
  alignContent: [
    'start',
    'center',
    'end',
    'stretch',
    'space-between',
    'space-around',
  ],
};

const FlexMenu = () => {
  const [flexProperty, setFlexProperty] = useState<FlexPropertyProps>({
    flexDirection: '',
    alignItems: '',
    justifyContent: '',
    flexWrap: '',
    alignContent: '',
  });

  const element = useRecoilValue(elementInfoAtom);
  const [mainData, setMainData] = useRecoilState(withMainData);

  const handleFlexProperty = ({ type, value }: PropertyChangeProps) => {
    styleChange({ element, type, value, setMainData });
  };

  useEffect(() => {
    setFlexProperty({
      flexDirection:
        getCurrentStyle({ element, type: 'flexDirection', mainData }) || 'none',
      alignItems:
        getCurrentStyle({ element, type: 'alignItems', mainData }) || 'none',
      justifyContent:
        getCurrentStyle({ element, type: 'justifyContent', mainData }) ||
        'none',
      flexWrap:
        getCurrentStyle({ element, type: 'flexWrap', mainData }) || 'none',
      alignContent:
        getCurrentStyle({ element, type: 'alignContent', mainData }) || 'none',
    });
  }, [element, mainData]);

  return (
    <>
      {Object.keys(flexList).map((property) => (
        <div key={`flex_property_${property}`}>
          <Styled.Title>{flexList[property]}</Styled.Title>
          <Styled.StyleContainer>
            {propertyList[property].map((v) => (
              <Styled.SvgWrapper
                key={v}
                selected={v === flexProperty[property]}
                onClick={() => handleFlexProperty({ type: property, value: v })}
              >
                <SvgIcon type={`${property}-${v}-icon`} />
              </Styled.SvgWrapper>
            ))}
          </Styled.StyleContainer>
        </div>
      ))}
    </>
  );
};

interface FlexPropertyProps {
  flexDirection: string;
  alignItems: string;
  justifyContent: string;
  flexWrap: string;
  alignContent: string;
}

interface PropertyChangeProps {
  type: string;
  value: string;
}

export default FlexMenu;
