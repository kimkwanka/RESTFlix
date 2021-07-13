import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';

import './MovieCard.scss';

const imgRoot = 'https://dry-sands-45830.herokuapp.com/img/';

const MovieCard = ({ movie }) => (
  <Link className="movie-card h-100" to={`movies/${movie._id}`}>
    <Card className="h-100">
      <Card.Img crossOrigin="anonymous" variant="top" src={`${imgRoot}${movie.ImagePath}`} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
      </Card.Body>
    </Card>
  </Link>
);

MovieCard.propTypes = {
  movie: PropTypes.PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};

export default React.memo(MovieCard);
