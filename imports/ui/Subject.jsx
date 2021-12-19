import React from 'react';

export const Subject = ({ subject, onDeleteClick}) => {
    return (
        <li align="left">
            <button type="day">{subject.day}</button>
            <span>
                <div class="row"> {subject.name} ({subject.code})</div>
                <div class="row"> <i class="fa fa-user"></i> {subject.teach}</div>
            </span>
            <button type="info"><a href={subject.link} target="_blank"><i class="fa fa-book"></i></a></button>
            <button type="submit" onClick={() => onDeleteClick(subject)}><i class="fa fa-trash"></i></button>
        </li>
    );
};