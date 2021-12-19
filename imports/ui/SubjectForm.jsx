import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { SubjectsCollection } from '/imports/db/SubjectsCollection';
import { AssignmentsCollection } from '/imports/db/AssignmentsCollection';
import { Assignment } from './Assignment';

export const SubjectForm = () => {
    const [teach, setTeach] = useState('');
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [link, setLink] = useState('');
    const [day, setDay] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        if (!teach) return;
        if (!name) return;
        if (!code) return;
        if (!link) return;
        if (!day) return;

        Meteor.call('subjects.insert', teach, name, code, link, day);

        setTeach('');
        setName('');
        setCode('');
        setLink('');
        setDay('');
    };

    return (
            <form className="subject-form" onSubmit={handleSubmit}>
                <center><h4>Tambah Pelajaran Baru</h4></center>
                <label class="form-label">Mata Kuliah / Pelajaran</label>
                <input
                    type="text"
                    placeholder="Tuliskan Mata Kuliah / Pelajaran"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label class="form-label">Nama Dosen / Guru</label>
                <input
                    type="text"
                    placeholder="Tuliskan Nama Dosen"
                    value={teach}
                    onChange={(e) => setTeach(e.target.value)}
                />
                <label class="form-label">Kode Matkul / Mapel</label>
                <input
                    type="text"
                    placeholder="Tuliskan Kode Matkul / Mapel"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <label class="form-label">Link Referensi / Materi</label>
                <input
                    type="text"
                    placeholder="Masukkan Link Referensi Materi"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <label class="form-label">Hari</label>
                <select value={day} onChange={(e) => setDay(e.target.value)}>
                    <option>Pilih Hari</option>
                    <option>-0- Minggu</option>
                    <option>-1- Senin</option>
                    <option>-2- Selasa</option>
                    <option>-3- Rabu</option>
                    <option>-4- Kamis</option>
                    <option>-5- Jumat</option>
                    <option>-6- Sabtu</option>
                </select>
              <button type="submit"><i class="fa fa-plus"></i></button>
            </form>
    );
};