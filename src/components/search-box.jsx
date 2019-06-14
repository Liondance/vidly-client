import React from "react";

export default function SearchBox({ value, onChange }) {
  return (
    <input
      type="text"
      name="pattern"
      placeholder="search..."
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
      className="form-control my-4"
    />
  );
}
