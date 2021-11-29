import { useAppSelector } from '@features/hooks';

import { TmdbMovieSimple } from '@features/types';

import FilteredMoviesList from '@components/FilteredMoviesList/FilteredMoviesList';

const HomeView = () => {
  const searchTerm = useAppSelector((state) => state.ui.searchTerm);

  const filterMoviesBySearchTerm = (movie: TmdbMovieSimple) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <FilteredMoviesList filterFunc={filterMoviesBySearchTerm} allowDuplicates />
  );
};

export default HomeView;
