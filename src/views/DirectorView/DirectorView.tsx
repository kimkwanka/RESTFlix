import { useAppSelector } from '../../features/hooks';

import { TRootState, IMovie } from '../../features/types';

import FilteredMoviesList from '../../components/FilteredMoviesList/FilteredMoviesList';

import './DirectorView.scss';

const selectDirectorByName = (state: TRootState, directorName: string) => {
  const movieWithDirector = state.movies.find(
    (movie: IMovie) => movie.director.name === directorName,
  );
  return movieWithDirector?.director;
};

interface IDirectorViewProps {
  match: {
    params: {
      directorName: string;
    };
  };
}

const DirectorView = ({
  match: {
    params: { directorName },
  },
}: IDirectorViewProps) => {
  const director = useAppSelector((state) =>
    selectDirectorByName(state, directorName),
  );

  return (
    <div className="director-view">
      <div className="director-view__details">
        <h1 className="director-view__name">{director?.name}</h1>
        <div className="director-view__birth">{`Year of Birth: ${director?.birth}`}</div>
        {director?.death && (
          <div className="director-view__death">{`Year of Death: ${director?.death}`}</div>
        )}
        <div className="director-view__description">{director?.bio}</div>
        <h2>Movies by this director:</h2>
        <FilteredMoviesList
          filterFunc={(movie: IMovie) =>
            movie.director.name.toLowerCase() === directorName.toLowerCase()
          }
        />
      </div>
    </div>
  );
};

export default DirectorView;
