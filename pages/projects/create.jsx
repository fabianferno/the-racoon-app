import React, { useState, useRef } from 'react';
import { Button } from 'reactstrap';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import Highlight from '../../components/Highlight';
import removeByAttr from '../../utils/helpers';

import axios from 'axios';

function External() {
  const searchUserTextRef = useRef();
  const [collaboratorAuth, setCollaboratorAuth] = useState(false);

  const [projectName, setProjectName] = useState({});
  const [description, setDescription] = useState({});
  const [url, setUrl] = useState({});

  const [collaborator, setCollaborator] = useState([]); // A User object from the database
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);

  const searchUser = () => {
    axios
      .get('/api/users', {
        params: {
          email: searchUserTextRef.current.value.trim().toLowerCase()
        }
      })
      .then(function (response) {
        setCollaborator(response.data);
        setCollaboratorAuth(true);
      })
      .catch(function (error) {
        setCollaboratorAuth(false);
        console.log(error);
      });
  };

  function addCollaborator(user) {
    if (!selectedCollaborators.some(c => c._id === user._id)) {
      var newCollaborators = selectedCollaborators;
      newCollaborators.push(user);
      setSelectedCollaborators(newCollaborators);
      searchUserTextRef.current.value = '';
      setCollaboratorAuth(false); // remove the collaborator from the list
    }
  }
  function removeCollaborator(id) {
    var updatedList = selectedCollaborators.filter(user => user._id !== id);
    console.log(updatedList);
    setSelectedCollaborators(updatedList);
  }

  return (
    <>
      <div className="mb-5 d-flex justify-content-between  align-items-center" data-testid="external">
        <h1 className="font-weight-bold" data-testid="external-title">
          Create Project
        </h1>
      </div>
      <section className="pb-5 mb-5">
        <form>
          <div className="form-group">
            <label htmlFor="inputName">Name</label>
            <input
              type="text"
              className="p-3 d-flex bg-dark text-white  rounded focus-none"
              style={{ width: '100%' }}
              id="inputName"
              placeholder="Project Name"
              onChange={e => {
                setProjectName(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputDescription">Description</label>
            <input
              type="text"
              className={'p-3 d-flex bg-dark text-white  rounded focus-none'}
              style={{ width: '100%' }}
              id="inputDescription"
              placeholder="Describe your Project - Eg. An app to book unicorn rides 🦄"
              onChange={e => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputUrl">URL</label>
            <input
              type="text"
              className={'p-3 d-flex bg-dark text-white  rounded focus-none'}
              style={{ width: '100%' }}
              id="inputUrl"
              placeholder="You app's URL - Eg. https://www.book-unicorns.com"
              onChange={e => {
                setUrl(e.target.value);
              }}
            />
          </div>
          <div className="form-group text-right">
            <label htmlFor="inputSearchUser">Add Collaborators to this project</label>

            <div className="input-group mb-3 ">
              <input
                id="inputSearchUser"
                ref={searchUserTextRef}
                type="text"
                className="d-flex text-white p-3 bg-dark"
                placeholder="Search Collaborators with mail"
                aria-label="Search Collaborators with mail"
              />

              <div className="input-group-append">
                <button className="btn btn-outline-primary" onClick={searchUser} type="button">
                  Search
                </button>
                {collaboratorAuth ? (
                  <button
                    type="button"
                    onClick={() => addCollaborator(collaborator)}
                    className="btn btn-primary text-white font-weight-bold"
                    key={collaborator._id}>
                    Add Collab&nbsp;+
                  </button>
                ) : null}
              </div>
            </div>
          </div>
          <div></div>
        </form>

        <div className="text-right">
          <h6 className="text-secondary mb-3">Search and Add them to the project.</h6>
          {console.log(selectedCollaborators)}
          {selectedCollaborators.length > 0 ? (
            selectedCollaborators.map(user => (
              <div className="text-right btn btn-primary mx-2" key={user._id}>
                <span className="h3 font-weight-bold text-white">{user.fullName} </span>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input text-dark"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckChecked"
                  />
                  <label className="form-check-label text-white" htmlFor="flexSwitchCheckChecked">
                    Super Collab?
                  </label>
                </div>
                <div
                  type="button"
                  onClick={() => removeCollaborator(user._id)}
                  className="mt-2 badge rounded-pill  bg-dark">
                  Remove ❌
                </div>
              </div>
            ))
          ) : (
            <div className="text-secondary">
              We couldn't find any user with that email. Please ask them to signup in racoon, first.
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default withPageAuthRequired(External, {
  onRedirecting: () => <Loading />,
  onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});
