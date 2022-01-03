import React, { useState, useRef } from 'react';
import { Button } from 'reactstrap';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import Highlight from '../../components/Highlight';

import axios from 'axios';

function External() {
  const searchUserTextRef = useRef();

  const [state, setState] = useState({ isLoading: false, response: undefined, error: undefined });
  const [collaborators, setCollaborators] = useState([]);

  const { isLoading, response, error } = state;
  const searchUser = async () => {
    axios
      .post('/api/users', {
        crudOption: 'find',
        email: searchCredentialTextRef.current.value.trim().toLowerCase()
      })
      .then(function (response) {
        console.log(response);
        setCollaborators(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const callApi = async () => {
    setState(previous => ({ ...previous, isLoading: true }));

    try {
      const response = await fetch('/api/shows');
      const data = await response.json();

      setState(previous => ({ ...previous, response: data, error: undefined }));
    } catch (error) {
      setState(previous => ({ ...previous, response: undefined, error }));
    } finally {
      setState(previous => ({ ...previous, isLoading: false }));
    }
  };

  const handle = (event, fn) => {
    event.preventDefault();
    fn();
  };

  return (
    <>
      <div className="mb-5 d-flex justify-content-between  align-items-center" data-testid="external">
        <h1 className=" font-weight-bold" data-testid="external-title">
          Create Project
        </h1>
        <Button
          color="primary"
          className="text-white mb-2 font-weight-bold"
          onClick={e => handle(e, callApi)}
          data-testid="external-action">
          Create Project
        </Button>
      </div>
      <section>
        <form>
          <div className="form-group">
            <label htmlFor="inputName">Name</label>
            <input type="text" className="form-control" id="inputName" placeholder="Project Name" />
          </div>
          <div className="form-group">
            <label htmlFor="inputDescription">Description</label>
            <input
              type="text"
              className="form-control"
              id="inputDescription"
              placeholder="Describe your Project - Eg. An app to book unicorn rides 🦄"
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputUrl">URL</label>
            <input
              type="text"
              className="form-control"
              id="inputUrl"
              placeholder="You app's URL - Eg. https://www.book-unicorns.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputSearchUser">Add Collaborators to this project</label>

            <input
              id="inputSearchUser"
              type="text"
              placeholder="Search Collaborators"
              className={'p-3 d-flex bg-dark text-white focus-none'}
              style={{ width: '100%' }}
              ref={searchUserTextRef}
              onKeyUp={e => e.key === 'Enter' && searchUser()}
              // onChange={searchUser}
            />
          </div>
        </form>
        <Highlight>{JSON.stringify(collaborators, null, 2)}</Highlight>
      </section>

      <div className="result-block-container">
        {isLoading && <Loading />}
        {(error || response) && (
          <div className="result-block" data-testid="external-result">
            <h6 className="muted">Result</h6>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
            {response && <Highlight>{JSON.stringify(response, null, 2)}</Highlight>}
          </div>
        )}
      </div>
    </>
  );
}

export default withPageAuthRequired(External, {
  onRedirecting: () => <Loading />,
  onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});
