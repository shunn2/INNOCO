import { ChangeEvent } from 'react';
import * as Styled from './styled';

interface OptionProps {
  title: string;
  value: string;
}

interface SelectProps {
  optionList: OptionProps[];
  selected: string;
  size?: number;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Select = (props: SelectProps) => {
  const { optionList, selected, size, onChange } = props;
  return (
    <Styled.Select size={size} onChange={(e) => onChange(e)}>
      {optionList.map((option) => (
        <Styled.Option
          value={option.value}
          defaultValue={selected}
          key={option.title}
        >
          {option.title}
        </Styled.Option>
      ))}
    </Styled.Select>
  );
};

export default Select;
