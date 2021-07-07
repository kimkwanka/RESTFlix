import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';

import './MovieCard.scss';

const imgRoot = 'https://dry-sands-45830.herokuapp.com/img/';

const MovieCard = ({ movie, onClick }) => (
  <Card className="movie-card h-100" onClick={onClick}>
    <Card.Img crossOrigin="anonymous" variant="top" src={`${imgRoot}${movie.ImagePath}`} />
    <Card.Body>
      <Card.Title>{movie.Title}</Card.Title>
      <Card.Text>{movie.Description}</Card.Text>
    </Card.Body>
  </Card>
);

MovieCard.propTypes = {
  movie: PropTypes.PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default React.memo(MovieCard);
