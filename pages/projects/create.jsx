import React, { useState, useRef } from "react";
import { Button } from "reactstrap";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import Highlight from "../../components/Highlight";

import axios from "axios";

function External() {
  const searchUserTextRef = useRef();

  const [collaborators, setCollaborators] = useState([]);
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);

  const searchUser = () => {
    axios
      .post("/api/users", {
        crudOption: "read",
        user: searchUserTextRef.current.value.trim().toLowerCase(),
      })
      .then(function (response) {
        setCollaborators(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function addCollaborator(id) {
    console.log(id);
    if (selectedCollaborators.includes(id)) {
      console.log(selectedCollaborators);
    } else {
      var newCollaborators = selectedCollaborators;
      setSelectedCollaborators(newCollaborators.push(id));
    }
  }

  return (
    <>
      <div
        className="mb-5 d-flex justify-content-between  align-items-center"
        data-testid="external"
      >
        <h1 className="font-weight-bold" data-testid="external-title">
          Create Project
        </h1>
        <Button
          color="primary"
          className="text-white mb-2 font-weight-bold"
          data-testid="external-action"
        >
          Create Project
        </Button>
      </div>
      <section className="pb-5 mb-5">
        <form>
          <div className="form-group">
            <label htmlFor="inputName">Name</label>
            <input
              type="text"
              className="p-3 d-flex bg-dark text-white  rounded focus-none"
              style={{ width: "100%" }}
              id="inputName"
              placeholder="Project Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputDescription">Description</label>
            <input
              type="text"
              className={"p-3 d-flex bg-dark text-white  rounded focus-none"}
              style={{ width: "100%" }}
              id="inputDescription"
              placeholder="Describe your Project - Eg. An app to book unicorn rides 🦄"
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputUrl">URL</label>
            <input
              type="text"
              className={"p-3 d-flex bg-dark text-white  rounded focus-none"}
              style={{ width: "100%" }}
              id="inputUrl"
              placeholder="You app's URL - Eg. https://www.book-unicorns.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputSearchUser">
              Add Collaborators to this project
            </label>

            <input
              id="inputSearchUser"
              type="text"
              placeholder="Search Collaborators with mail"
              className={"p-3 d-flex bg-dark text-white rounded focus-none"}
              style={{ width: "100%" }}
              ref={searchUserTextRef}
              onKeyUp={(e) => e.key === "Enter" && searchUser()}
              // onChange={searchUser}
            />
          </div>
        </form>

        <div className="text-right">
          <h6 className="text-secondary mb-3">
            Search and Add them to the project.
          </h6>
          {collaborators.length > 0 ? (
            collaborators.map((user) => (
              <button
                onClick={() => addCollaborator(user._id)}
                className="btn btn-primary text-white font-weight-bold"
                key={user._id}
              >
                {user.fullName}&nbsp;+
              </button>
            ))
          ) : (
            <div className="text-secondary">
              We couldn't find any user with that email. Please ask them to
              signup in racoon, first.
            </div>
          )}

          {selectedCollaborators.length > 0 ? (
            selectedCollaborators.map((user) => (
              <button
                onClick={() => addCollaborator(user._id)}
                className="btn btn-info text-white font-weight-bold"
                key={user._id}
              >
                {user.fullName}&nbsp;+
              </button>
            ))
          ) : (
            <div className="text-secondary">
              We couldn't find any user with that email. Please ask them to
              signup in racoon, first.
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default withPageAuthRequired(External, {
  onRedirecting: () => <Loading />,
  onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});
