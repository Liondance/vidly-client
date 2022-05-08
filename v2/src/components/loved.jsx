import React from "react";

export default function Loved(props) {
  return (
    <i
      className={"fa " + (props.loved ? "fa-heart" : "fa-heart-o")}
      aria-hidden="true"
      style={{ cursor: "pointer" }}
      onClick={() => props.toggle()}
    />
  );
}
