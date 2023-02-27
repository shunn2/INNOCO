import { render } from '@testing-library/react';
import Home from '@pages/index';

describe('predict page', () => {
  it('danbii 글자가 잘 나오는지 체크', () => {
    const { getByText } = render(<Home />);
    expect(getByText('danbii')).toBeInTheDocument();
  });
});

describe('predict page', () => {
  it('버튼 글자가 잘 나오는지 체크', () => {
    const { getByText } = render(<Home />);
    expect(getByText('danbii')).toBeInTheDocument();
    expect(getByText('버튼')).toBeInTheDocument();
  });
});
