/* eslint-disable react/no-array-index-key */
/* eslint no-restricted-globals: ["error"] */
import { useState, useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';

import { setIsLoading, setUser, setErrors } from '../../redux/actions';

const formatDate = (date) => {
  const inputDate = new Date(date);
  return inputDate.toISOString().substr(0, 10);
};

const useProfileView = () => {
  const loggedInUser = useSelector((state) => state.user);
  const jwtToken = useSelector((state) => state.token);

  const { _id } = loggedInUser;

  const [newUserData, setNewUserData] = useState({
    ...loggedInUser,
    Password: '',
  });
  const [dataHasChanged, setDataHasChanged] = useState(false);

  const updateChangedStatus = () => {
    setDataHasChanged(
      newUserData.Username !== loggedInUser.Username
        || newUserData.Password !== ''
        || newUserData.Email !== loggedInUser.Email
        || formatDate(newUserData.Birthday) !== formatDate(loggedInUser.Birthday),
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
      setIsLoading(true);

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
        setUser(null);
      } else {
        const userDeletionError = await res.text();
        console.error(res.status, userDeletionError);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async () => {
    try {
      if (!newUserData) {
        return;
      }

      setIsLoading(true);

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
        const updatedUserFromServer = await res.json();

        setUser(updatedUserFromServer);
        setErrors([]);
      }

      if (res.status === 400) {
        const responseBodyText = await res.text();

        setErrors([responseBodyText]);
        console.error(responseBodyText);
      }

      if (res.status === 422) {
        const responseBody = await res.json();
        const errorMessages = responseBody.errors.map((e) => e.msg);

        setErrors(errorMessages);
        console.error(responseBody.errors);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
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
  }, [newUserData, loggedInUser]);

  return {
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
