import './ErrorMessages.scss';

interface IErrorMessagesProps {
  errors: string[];
}

const ErrorMessages = ({ errors }: IErrorMessagesProps) => {
  return (
    <div className="m-4">
      <div>
        {errors.filter(Boolean).map((e) => (
          <p className="error-text" key={`err_${e}`}>
            {e}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ErrorMessages;
