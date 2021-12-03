import { useAppSelector } from '@features/hooks';

import { TmdbMovieSimple } from '@features/types';

import FilteredMoviesList from '@components/FilteredMoviesList/FilteredMoviesList';

interface IHomeViewProps {
  match: {
    params: {
      page: string;
    };
  };
}

const HomeView = ({
  match: {
    params: { page = '1' },
  },
}: IHomeViewProps) => {
  const searchTerm = useAppSelector((state) => state.ui.searchTerm);

  const filterMoviesBySearchTerm = (movie: TmdbMovieSimple) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <FilteredMoviesList
      page={parseInt(page, 10)}
      filterFunc={filterMoviesBySearchTerm}
    />
  );
};

export default HomeView;
