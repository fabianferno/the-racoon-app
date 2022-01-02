import React, { useState, useEffect } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { supabase } from '../utils/initSupabase';

const ProjectCard = ({ name, summary }) => (
  <div className="col-md-4 m-2 col-12 bg-secondary card card-body">
    <div className="d-flex justify-content-between align-items-center">
      <h3 className="card-title font-weight-bold ">{name}</h3>
    </div>
    <p className="card-text">{summary}</p>
  </div>
);

export default withPageAuthRequired(function DashBoard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
    console.log(projects);
  }, []);

  const fetchProjects = async () => {
    let { data: projects, error } = await supabase.from('projects').select('*');
    if (error) console.log('error', error);
    else setProjects(projects);
  };

  return (
    <>
      <div className="mb-5">
        <h1 className="font-weight-bold">Projects owned by you.</h1>
        <div className="d-flex pt-4 justify-content-between align-items-center">
          <ProjectCard name="stretch inc." summary="Stretch Booking System with automatic time slot suggestions." />
          <ProjectCard name="stretch inc." summary="Stretch Booking System with automatic time slot suggestions." />
          <ProjectCard name="stretch inc." summary="Stretch Booking System with automatic time slot suggestions." />
          <ProjectCard name="stretch inc." summary="Stretch Booking System with automatic time slot suggestions." />
        </div>
        <h1 className="font-weight-bold mt-5">Projects assigned to you.</h1>
        <div className="d-flex pt-4 justify-content-between align-items-center">
          <ProjectCard name="stretch inc." summary="Stretch Booking System with automatic time slot suggestions." />
          <ProjectCard name="stretch inc." summary="Stretch Booking System with automatic time slot suggestions." />
          <ProjectCard name="stretch inc." summary="Stretch Booking System with automatic time slot suggestions." />
          <ProjectCard name="stretch inc." summary="Stretch Booking System with automatic time slot suggestions." />
        </div>
      </div>
    </>
  );
});
