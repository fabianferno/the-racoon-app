import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'reactstrap';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import Highlight from '../../components/Highlight';
import removeByAttr from '../../utils/helpers';

import axios from 'axios';

function Project() {
  const router = useRouter();

  const [project, setProject] = useState({});
  const [projectLoading, setProjectLoading] = useState(false);

  const { user, error, isLoading } = useUser();

  useEffect(() => {
    axios
      .get(`/api/projects`, {
        params: {
          _id: router.query._id
        }
      })
      .then(function (response) {
        console.log(response);
        if (response.data) {
          setProject(response.data);
        } else {
          // router.push('/projects');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {user && (
        <>
          <div className="mb-5 d-flex justify-content-between  align-items-center">
            <h1 className="font-weight-bold">{project.name}</h1>
            <h6 children="text-secondary">{project.description}</h6>
          </div>
          <section className="pb-5 mb-5">
            <div className="text-right">
              <h6 className="text-secondary mb-3">Search and Add them to the project to display below.</h6>
              {projectLoading && project.collabs.length > 0
                ? project.collabs.map(item => (
                    <div className="text-right btn btn-primary mx-2" key={item._id}>
                      <span className="h3 font-weight-bold text-white">{item.fullName} </span>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input text-dark"
                          type="checkbox"
                          role="switch"
                          id="roleToggle"
                          onChange={e => changeRole(item._id, e)}
                        />
                        <label className="form-check-label text-white" htmlFor="flexSwitchCheckChecked">
                          Super Collab?
                        </label>
                      </div>
                      <div
                        type="button"
                        onClick={() => removeCollaborator(item._id)}
                        className="mt-2 badge rounded-pill  bg-dark">
                        Remove ❌
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default withPageAuthRequired(Project, {
  onRedirecting: () => <Loading />,
  onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});
