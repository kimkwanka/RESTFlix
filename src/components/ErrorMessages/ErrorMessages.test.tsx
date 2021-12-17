import { screen, render } from '@testing-library/react';
import ErrorMessages from '#components/ErrorMessages/ErrorMessages';

describe('ErrorMessages Component', () => {
  it('should show specified error messages', () => {
    const errorMessages = ['ErrorMsg1', 'ErrorMsg2', 'ErrorMsg3'];

    render(<ErrorMessages errors={errorMessages} />);

    const errorTexts = errorMessages
      .map((msg) => screen.queryByText(msg))
      .filter(Boolean);

    expect(errorTexts).toHaveLength(errorMessages.length);
  });

  it('should show only show non-empty error messages', () => {
    const errorMessages = ['ErrorMsg1', '', 'ErrorMsg3', '', 'ErrorMsg5'];
    const nonEmptyErrorMessages = errorMessages.filter(Boolean);

    render(<ErrorMessages errors={errorMessages} />);

    const errorTexts = nonEmptyErrorMessages
      .map((msg) => screen.queryByText(msg))
      .filter(Boolean);

    expect(errorTexts).toHaveLength(nonEmptyErrorMessages.length);
  });

  it('should not render <p> tags for empty error messages', () => {
    const errorMessages: string[] = [];

    render(<ErrorMessages errors={errorMessages} />);

    const nodesWithNoText = screen.getAllByText('');
    expect(nodesWithNoText.filter((n) => n.tagName === 'P')).toHaveLength(0);
  });
});
