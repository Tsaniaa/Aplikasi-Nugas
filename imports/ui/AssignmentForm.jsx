import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { AssignmentsCollection } from '/imports/db/AssignmentsCollection';
import { SubjectsCollection } from '/imports/db/SubjectsCollection';

export const AssignmentForm = () => {
    const subjects = SubjectsCollection.find({}).fetch();

    const [deadline, setDeadline] = useState('');
    const [text, setText] = useState('');
    const [link, setLink] = useState('');
    const [subject, setSubject] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        if (!deadline) return;
        if (!text) return;
        if (!link) return;
        if (!subject) return;

        Meteor.call('assignments.insert', deadline, text, link, subject);

        setDeadline('');
        setText('');
        setLink('');
    };

    return (
        
            <form className="assignment-form" onSubmit={handleSubmit}>
                <center><h4>Tambah Tugas Baru</h4><p>*Isi mata kuliah atau mata pelajaran terlebih dahulu</p></center>
                <label class="form-label">Kode Mata Kuliah / Pelajaran</label>
                <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                    <option>
                            pilih tugas
                    </option>
                    {subjects.map(subject => (
                    <option
                            key={subject._id}
                            subject={subject.code}
                            >
                            {subject.code}
                    </option>
                    ))}
                </select>
                <label for="email" class="form-label">Deadline Tugas</label>
                <input
                    type="date"
                    placeholder="Deadline Tugas"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
                <label for="email" class="form-label">Nama Tugas</label>
                <input
                    type="text"
                    placeholder="Tuliskan Nama Tugas"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <label for="email" class="form-label">Link Pengumpulan</label>
                <input
                    type="text"
                    placeholder="Tukiskan Link Pengumpulan"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <button type="submit"><i class="fa fa-plus"></i></button>
            </form>
    );
};