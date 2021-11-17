/* eslint-disable react/no-array-index-key */
/* eslint no-restricted-globals: ["error"] */
import { useState, useRef, MouseEvent } from 'react';

import { useAppSelector, useAppDispatch } from '@features/hooks';

import { updateUserData, deleteUser } from '@features/actions';

const formatDate = (date: string) => {
  const inputDate = new Date(date);
  return inputDate.toISOString().substr(0, 10);
};

const useProfileView = () => {
  const currentUserData = useAppSelector((state) => state.user.data);

  const dispatch = useAppDispatch();
  const updateFormRef = useRef<HTMLFormElement>(null);

  const [newUserData, setNewUserData] = useState({
    ...currentUserData,
    password: '',
  });

  const userDataChanged =
    newUserData.username !== currentUserData.username ||
    newUserData.password !== '' ||
    newUserData.email !== currentUserData.email ||
    formatDate(newUserData.birthday) !== formatDate(currentUserData.birthday);

  const updateNewUserData = (key: string, value: string) => {
    setNewUserData({ ...newUserData, [key]: value });
  };

  const setUsername = (newUsername: string) =>
    updateNewUserData('username', newUsername);
  const setPassword = (newPassword: string) =>
    updateNewUserData('password', newPassword);
  const setEmail = (newEmail: string) => updateNewUserData('email', newEmail);
  const setBirthday = (newBirthday: string) =>
    updateNewUserData('birthday', newBirthday);

  const isUpdateFormInputValid = () => updateFormRef.current?.reportValidity();

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isUpdateFormInputValid()) {
      dispatch(updateUserData(newUserData));
    }
  };

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // eslint-disable-next-line no-alert
    const deletionConfirmed = confirm(
      'Do you really want to delete your account? This action is not reversible!',
    );

    if (deletionConfirmed) {
      dispatch(deleteUser());
    }
  };

  const { username, email, password, birthday, favoriteMovies } = newUserData;

  return {
    username,
    email,
    password,
    birthday,
    favoriteMovies,
    formatDate,
    handleSubmit,
    handleDelete,
    setEmail,
    setBirthday,
    setPassword,
    setUsername,
    userDataChanged,
    updateFormRef,
  };
};

export default useProfileView;
