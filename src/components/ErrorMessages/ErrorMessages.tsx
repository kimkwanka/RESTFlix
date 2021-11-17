/* eslint-disable react/no-array-index-key */
import { useAppSelector } from '@features/hooks';

import './ErrorMessages.scss';

interface IErrorMessagesProps {
  errorType: 'loginErrors' | 'registerErrors' | 'profileErrors';
}

const ErrorMessages = ({ errorType }: IErrorMessagesProps) => {
  const errorMessages = useAppSelector((state) => state.errors[errorType]);

  return (
    <div className="m-4">
      <div>
        {errorMessages.map((e, i) => (
          <p className="error-text" key={`err${i}`}>
            {e.message}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ErrorMessages;
