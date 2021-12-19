import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { AssignmentsCollection } from '/imports/db/AssignmentsCollection';
import { Assignment } from './Assignment';
import { AssignmentForm } from './AssignmentForm';
import { LoginForm } from './LoginForm';
import { SubjectsCollection } from '/imports/db/SubjectsCollection';
import { Subject } from './Subject';
import { SubjectForm } from './SubjectForm';

const toggleChecked = ({ _id, isChecked }) =>
  Meteor.call('assignments.setIsChecked', _id, !isChecked);

const deleteAssignment = ({ _id }) => Meteor.call('assignments.remove', _id);

const deleteSubject = ({ _id }) => Meteor.call('subjects.remove', _id);
const updateSubject = ({ _id }) => Meteor.call('subjects.setUpdate', _id);

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const [hideCompleted, setHideCompleted] = useState(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const logout = () => Meteor.logout();

  const { assignments, pendingAssignmentsCount, subjects, isLoading } = useTracker(() => {
    const noDataAvailable = { assignments: [], pendingAssignmentsCount: 0, subjects: [] };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('assignments');
    const handler2 = Meteor.subscribe('subjects');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    if (!handler2.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const assignments = AssignmentsCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { deadline: 1 },
      }
    ).fetch();
    const pendingAssignmentsCount = AssignmentsCollection.find(pendingOnlyFilter).count();

    const subjects = SubjectsCollection.find(
      userFilter,
      {
        sort: { day: 1 },
      }
    ).fetch();

    return { assignments, pendingAssignmentsCount, subjects};

    
    
  });


  const pendingAssignmentsTitle = `${pendingAssignmentsCount ? ` (${pendingAssignmentsCount})` : ''
    }`;

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <center>
              <h1>
                <i class="fa fa-graduation-cap"> </i> Nugas
              </h1>
              <i><p>Belajar Dan Mengerjakan Tugas Dengan Lebih Mudah Disini!</p></i>
            </center>
          </div>
        </div>
      </header >

      <div className="main">
        {user ? (
          <Fragment>
            <div className="container-fluid mt-3">
              <div class="row">
                <div class="col-sm-10 p-3">
                  <button><i class="fa fa-user"></i> {user.username}</button>
                </div>
                <div class="col-sm-2 p-3">
                  <div className="user" onClick={logout}>
                  <center><div>keluar <i class="fa fa-sign-out"></i></div></center>
                  </div>
                </div>
              </div>
            </div>
           
            <div className="container-fluid mt-3">
              <div class="row">
                <div class="col-sm-4 p-3">
                  <SubjectForm /> 
                  <AssignmentForm />
                </div>
                <div class="col-sm-8 p-3">
                  <center><h5>Pelajaran</h5></center>
                  <div className="subjects">
                  {subjects.map(subject => (
                  <Subject
                        key={subject._id}
                        subject={subject}
                        onDeleteClick={deleteSubject}
                      />
                  ))}
                </div>
                <center><h5>Tugasmu Saat Ini {pendingAssignmentsTitle}</h5></center>
                  <div className="filter">
                    <button onClick={() => setHideCompleted(!hideCompleted)}>
                      {hideCompleted ? 'tampilkan semua tugas' : 'tampilkan hanya yang belum selesai'}
                    </button>
                  </div>

                  {isLoading && <div className="loading">loading...</div>}

                  <ul className="assignments">
                    {assignments.map(assignment => (

                      <Assignment
                        key={assignment._id}
                        assignment={assignment}
                        onCheckboxClick={toggleChecked}
                        onDeleteClick={deleteAssignment}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>

  );
};