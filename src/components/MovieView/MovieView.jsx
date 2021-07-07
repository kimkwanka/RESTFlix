import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './MovieView.scss';

const imgRoot = 'https://dry-sands-45830.herokuapp.com/img/';

const MovieView = ({ movie, onBackClick }) => (
  <Card className="movie-card d-flex flex-column align-items-center">
    <Card.Img crossOrigin="anonymous" variant="top" src={`${imgRoot}${movie.ImagePath}`} />
    <Card.Body>
      <Card.Title>{movie.Title}</Card.Title>
      <Card.Text>{movie.Description}</Card.Text>
    </Card.Body>
    <Button className="m-4" onClick={onBackClick}>Back</Button>
  </Card>
);

MovieView.propTypes = {
  movie: PropTypes.PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default MovieView;
