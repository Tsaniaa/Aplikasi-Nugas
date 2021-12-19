import React from 'react';

export const Assignment = ({ assignment, onCheckboxClick, onDeleteClick}) => {
    return (
        <li>
            <input
                type="checkbox"
                checked={!!assignment.isChecked}
                onClick={() => onCheckboxClick(assignment)}
                onChange={this.updateInputValue}
            />
            <span >{assignment.deadline} : ({assignment.subject}) {assignment.text}</span>
            <button type="info"><a href={assignment.link} target="_blank">kumpulkan</a></button>
            <button onClick={() => onDeleteClick(assignment)}>hapus &times; </button>
        </li>
    );
};