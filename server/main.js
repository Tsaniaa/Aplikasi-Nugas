import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { AssignmentsCollection } from '/imports/db/AssignmentsCollection';
import '/imports/api/assignmentsMethods';
import '/imports/api/assignmentsPublications';
import { SubjectsCollection } from '/imports/db/SubjectsCollection';
import '/imports/api/subjectsMethods';
import '/imports/api/subjectsPublications';

const SEED_USERNAME = 'saya';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

});