import React from 'react';

import { useSelector } from 'react-redux';

import { IState, IMovie } from '../../features/types';

import FilteredMoviesList from '../../components/FilteredMoviesList/FilteredMoviesList';

const HomeView = () => {
  const searchTerm = useSelector((state: IState) => state.ui.searchTerm);

  const filterMoviesBySearchTerm = (movie: IMovie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <FilteredMoviesList filterFunc={filterMoviesBySearchTerm} allowDuplicates />
  );
};

export default HomeView;
