import { Link } from 'react-router-dom';

import ErrorMessages from '../../components/ErrorMessages/ErrorMessages';

import useRegistrationView from './useRegistrationView';

const RegistrationView = () => {
  const {
    username,
    password,
    email,
    birthday,
    handleSubmit,
    setUsername,
    setPassword,
    setEmail,
    setBirthday,
    registerFormRef,
    isDisabled,
  } = useRegistrationView();

  return (
    <div className="register-view">
      <h1 className="register-view__heading">Sign Up</h1>
      <form
        className="d-flex flex-column align-items-center"
        ref={registerFormRef}
      >
        <label htmlFor="formUsername">
          Username:*
          <input
            id="formUsername"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength={5}
            pattern="^[a-zA-Z0-9]+$"
          />
        </label>
        <label htmlFor="formPassword">
          Password:*
          <input
            id="formPassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label htmlFor="formEmail">
          Email:*
          <input
            id="formEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label htmlFor="formBirthday">
          Birthday:
          <input
            id="formBirthday"
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </label>
        <button
          className="secondary"
          type="submit"
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          Sign Up
        </button>
        <ErrorMessages errorType="registerErrors" />
      </form>
      <p>
        Already have an account?&nbsp;
        <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};

export default RegistrationView;
