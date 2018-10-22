import React from 'react';
import './TodoInput.css';

function submit(props, event) {
  if (event.key === 'Enter') {
    if (event.target.value.trim() !== '') {
      props.onSubmit(event);
    }
  }
}

function changeTitle(props, event) {
  props.onChange(event);
}

export default function(props) {
  return (
    <input type="text"
      className="TodoInput"
      value={props.content}
      onKeyPress={submit.bind(null, props)}
      onChange={changeTitle.bind(null, props)} />
  )
}