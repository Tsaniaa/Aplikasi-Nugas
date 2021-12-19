import { check } from 'meteor/check';
import { AssignmentsCollection } from '/imports/db/AssignmentsCollection';

Meteor.methods({
    'assignments.insert'(deadline, text, link, subject) {
        check(deadline, String);
        check(text, String);
        check(link, String);
        check(subject, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        AssignmentsCollection.insert({
            deadline,
            text,
            link,
            subject,
            createdAt: new Date,
            userId: this.userId,
        })
    },

    'assignments.remove'(assignmentId) {
        check(assignmentId, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const assignment = AssignmentsCollection.findOne({ _id: assignmentId, userId: this.userId });

        if (!assignment) {
            throw new Meteor.Error('Access denied.');
        }

        AssignmentsCollection.remove(assignmentId);
    },

    'assignments.setIsChecked'(assignmentId, isChecked) {
        check(assignmentId, String);
        check(isChecked, Boolean);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const assignment = AssignmentsCollection.findOne({ _id: assignmentId, userId: this.userId });

        if (!assignment) {
            throw new Meteor.Error('Access denied.');
        }

        AssignmentsCollection.update(assignmentId, {
            $set: {
                isChecked,
            },
        });
    },

});