import React from 'react';
import PropTypes from 'prop-types';

const AddBottle = ({ wid }) => (
  <>
    <h1>Add Bottle</h1>
    <p>{wid}</p>
  </>
);

export default AddBottle;

AddBottle.propTypes = {
  wid: PropTypes.string,
};
