/* eslint-disable react/no-array-index-key */
/* eslint no-restricted-globals: ["error"] */
import { useState, useEffect, useRef, MouseEvent } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { IState } from '../../features/types';

import { updateUserData, deleteUser } from '../../features';

const formatDate = (date: string) => {
  const inputDate = new Date(date);
  return inputDate.toISOString().substr(0, 10);
};

const useProfileView = () => {
  const dispatch = useDispatch();
  const updateFormRef = useRef<HTMLFormElement>(null);
  const currentUserData = useSelector((state: IState) => state.user.data);

  const [newUserData, setNewUserData] = useState({
    ...currentUserData,
    password: '',
  });
  const [dataHasChanged, setDataHasChanged] = useState(false);

  const updateChangedStatus = () => {
    setDataHasChanged(
      newUserData.username !== currentUserData.username ||
        newUserData.password !== '' ||
        newUserData.email !== currentUserData.email ||
        formatDate(newUserData.birthday) !==
          formatDate(currentUserData.birthday),
    );
  };

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

  useEffect(() => {
    updateChangedStatus();
  }, [newUserData, currentUserData]);

  return {
    formatDate,
    handleSubmit,
    handleDelete,
    setEmail,
    setBirthday,
    setPassword,
    setUsername,
    dataHasChanged,
    updateFormRef,
  };
};

export default useProfileView;
