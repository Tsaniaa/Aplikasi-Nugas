import { check } from 'meteor/check';
import { SubjectsCollection } from '/imports/db/SubjectsCollection';

Meteor.methods({
    'subjects.insert'(teach, name, code, link, day) {
        check(teach, String);
        check(name, String);
        check(code, String);
        check(link, String);
        check(day, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        SubjectsCollection.insert({
            teach,
            name,
            code,
            link,
            day,
            status: "belum dibaca",
            createdAt: new Date,
            userId: this.userId,
        })
    },

    'subjects.remove'(subjectId) {
        check(subjectId, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const subject = SubjectsCollection.findOne({ _id: subjectId, userId: this.userId });

        if (!subject) {
            throw new Meteor.Error('Access denied.');
        }

        SubjectsCollection.remove(subjectId);
    },

    'subjects.setUpdate'(subjectId) {
        check(subjectId, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const subject = SubjectsCollection.findOne({ _id: assignmentId, userId: this.userId });

        if (!subject) {
            throw new Meteor.Error('Access denied.');
        }

        SubjectsCollection.update(subjectId, {
            $setStatus: "sudah dibaca",
        });
    },
});