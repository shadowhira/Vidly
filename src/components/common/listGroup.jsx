import React from "react";

const ListGroup = ({ items: genres, textProperty, valueProperty, onItemSelect, selectedItem }) => {
  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          key={genre[valueProperty]}
          className={
            genre[textProperty] === selectedItem
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onItemSelect(genre[textProperty])}
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
