/* eslint-disable react/no-array-index-key */
/* eslint no-restricted-globals: ["error"] */
import { useState, useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
  setIsLoading, updateUserData, logoutUser, setErrors,
} from '../../redux';

const formatDate = (date) => {
  const inputDate = new Date(date);
  return inputDate.toISOString().substr(0, 10);
};

const useProfileView = () => {
  const dispatch = useDispatch();

  const currentUserData = useSelector((state) => state.user.data);
  const jwtToken = useSelector((state) => state.user.token);

  const { _id } = currentUserData;

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
        || formatDate(newUserData.Birthday) !== formatDate(currentUserData.Birthday),
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

  const deleteUser = async () => {
    try {
      dispatch(setIsLoading(true));

      const res = await fetch(
        `https://dry-sands-45830.herokuapp.com/users/${_id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );

      if (res.status === 200) {
        dispatch(logoutUser());
      } else {
        const userDeletionError = await res.text();
        console.error(res.status, userDeletionError);
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const updateUser = async () => {
    try {
      if (!newUserData) {
        return;
      }

      dispatch(setIsLoading(true));

      const res = await fetch(
        `https://dry-sands-45830.herokuapp.com/users/${_id}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(newUserData),
        },
      );

      if (res.status === 200) {
        const updatedUserDataFromServer = await res.json();

        dispatch(updateUserData(updatedUserDataFromServer));
        dispatch(setErrors([]));
      }

      if (res.status === 400) {
        const responseBodyText = await res.text();

        dispatch(setErrors([responseBodyText]));
        console.error(responseBodyText);
      }

      if (res.status === 422) {
        const responseBody = await res.json();
        const errorMessages = responseBody.errors.map((e) => e.msg);

        dispatch(setErrors(errorMessages));
        console.error(responseBody.errors);
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUpdateFormInputValid()) {
      updateUser(newUserData);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-alert
    const deletionConfirmed = confirm(
      'Do you really want to delete your account? This action is not reversible!',
    );

    if (deletionConfirmed) {
      deleteUser();
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
