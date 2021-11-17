import { useState, useRef, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';

import { useAppDispatch } from '@features/hooks';

import { loginUser } from '@features/actions';

import { IUser } from '@features/types';

const saveToLocalStorage = (user: IUser) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const useLoginView = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('FlyingBanana');
  const [password, setPassword] = useState('test123');

  const loginFormRef = useRef<HTMLFormElement>(null);

  const isLoginFormInputValid = () => loginFormRef.current?.reportValidity();

  const isDisabled = !(username && password);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLoginFormInputValid()) {
      try {
        const { user, token } = (await dispatch(
          loginUser({ username, password }),
        ).unwrap()) as { user: IUser['data']; token: string };

        history.push('/');
        saveToLocalStorage({ data: user, token });
      } catch {
        // Error is dealt with inside loginUser thunk
        // but unwrap() bubbles it up again, so just catch and ignore it.
      }
    }
  };

  return {
    username,
    password,
    handleSubmit,
    setUsername,
    setPassword,
    loginFormRef,
    isDisabled,
  };
};

export default useLoginView;
