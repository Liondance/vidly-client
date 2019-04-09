import React from "react";

function handleSave(props) {
  props.history.replace("/movies");
}

const MovieForm = props => {
  return (
    <div>
      <h1>Movie {props.match.params.id}</h1>
      <button className="btn btn-primary" onClick={() => handleSave(props)}>
        Save
      </button>
    </div>
  );
};

export default MovieForm;
