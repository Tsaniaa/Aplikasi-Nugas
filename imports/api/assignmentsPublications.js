import { Meteor } from 'meteor/meteor';
import { AssignmentsCollection } from '/imports/db/AssignmentsCollection';

Meteor.publish('assignments', function publishAssignments() {
    return AssignmentsCollection.find({ userId: this.userId });
});