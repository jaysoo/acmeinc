import { render } from '@testing-library/react';

import Lib2 from './lib2';

describe('Lib2', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Lib2 />);
    expect(baseElement).toBeTruthy();
  });

  it('should render secret', () => {
    const { baseElement } = render(<Lib2 showSecret={true} />);
    expect(baseElement.innerHTML).toMatch(/secret/);
  });
});
