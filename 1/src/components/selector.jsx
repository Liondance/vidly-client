import React from "react";

export default function Selector(props) {
  const { items, key, value, selected, select } = props;
  return (
    <ul className="list-group">
      <button
        key=""
        className={
          "list-group-item list-group-item-action " +
          (selected === null ? "active" : "")
        }
        onClick={() => select(null)}
      >
        All
      </button>
      {items.map(item => (
        <button
          key={item[key]}
          className={
            "list-group-item list-group-item-action " +
            (selected === item ? "active" : "")
          }
          onClick={() => select(item)}
        >
          {item[value]}
        </button>
      ))}
    </ul>
  );
}

Selector.defaultProps = {
  key: "_id",
  value: "name"
};
