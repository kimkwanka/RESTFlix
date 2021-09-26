import React from 'react';

import { useSelector } from 'react-redux';

import FilteredMoviesList from '../../components/FilteredMoviesList/FilteredMoviesList';

const HomeView = () => {
  const searchTerm = useSelector((state) => state.ui.searchTerm);

  const filterMoviesBySearchTerm = (movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <FilteredMoviesList filterFunc={filterMoviesBySearchTerm} allowDuplicates />
  );
};

export default HomeView;
