import { Meteor } from 'meteor/meteor';
import { SubjectsCollection } from '/imports/db/SubjectsCollection';

Meteor.publish('subjects', function publishSubjects() {
    return SubjectsCollection.find({ userId: this.userId });
});