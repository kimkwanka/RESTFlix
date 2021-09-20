/* eslint-disable react/no-array-index-key */
/* eslint no-restricted-globals: ["error"] */
import { useState, useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { updateUserData, deleteUser } from '../../redux';

const formatDate = (date) => {
  const inputDate = new Date(date);
  return inputDate.toISOString().substr(0, 10);
};

const useProfileView = () => {
  const dispatch = useDispatch();

  const currentUserData = useSelector((state) => state.user.data);

  const [newUserData, setNewUserData] = useState({
    ...currentUserData,
    Password: '',
  });
  const [dataHasChanged, setDataHasChanged] = useState(false);

  const updateChangedStatus = () => {
    setDataHasChanged(
      newUserData.Username !== currentUserData.Username
        || newUserData.Password !== ''
        || newUserData.Email !== currentUserData.Email
        || formatDate(newUserData.Birthday)
          !== formatDate(currentUserData.Birthday),
    );
  };

  const updateNewUserData = (key, value) => {
    setNewUserData({ ...newUserData, [key]: value });
  };

  const setUsername = (newUsername) => updateNewUserData('Username', newUsername);
  const setPassword = (newPassword) => updateNewUserData('Password', newPassword);
  const setEmail = (newEmail) => updateNewUserData('Email', newEmail);
  const setBirthday = (newBirthday) => updateNewUserData('Birthday', newBirthday);

  const updateFormRef = useRef();

  const isUpdateFormInputValid = () => updateFormRef.current.reportValidity();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUpdateFormInputValid()) {
      dispatch(updateUserData(newUserData));
    }
  };

  const handleDelete = async (e) => {
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
