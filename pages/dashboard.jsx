import React from 'react';
import Link from 'next/link';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import Highlight from '../components/Highlight';

export default function Dashboard({ user, isLoading }) {
  const router = useRouter();

  const projects = {
    owned: [
      {
        _id: { $oid: '61d6b44a28e5e5da130fe004' },
        name: 'Unicorn Go',
        createdBy: 'fabianferno.23it@licet.ac.in',
        description: 'An app to book Unicorn rides',
        url: 'https://book.unicorns.com',
        collabs: [
          {
            _id: { $oid: '61d298ea96b536401023db06' },
            email: 'ferno@ades.in',
            auth0: 'google-oauth2|104148729436290888777',
            fullName: 'ADES - Ferno Susai A',
            role: 'collab'
          }
        ],
        admins: [
          {
            _id: { $oid: '61d1f954e8cefd0e3b470bac' },
            fullName: 'Fabian Ferno',
            email: 'fabianferno@gmail.com',
            auth0: 'google-oauth2|103060808963170302351',
            role: 'admin'
          }
        ]
      }
    ],
    assigned: [
      {
        _id: { $oid: '61d6b44a28e5e5da130fe004' },
        name: 'Unicorn Go',
        createdBy: 'fabianferno.23it@licet.ac.in',
        description: 'An app to book Unicorn rides',
        url: 'https://book.unicorns.com',
        collabs: [
          {
            _id: { $oid: '61d298ea96b536401023db06' },
            email: 'ferno@ades.in',
            auth0: 'google-oauth2|104148729436290888777',
            fullName: 'ADES - Ferno Susai A',
            role: 'collab'
          }
        ],
        admins: [
          {
            _id: { $oid: '61d1f954e8cefd0e3b470bac' },
            fullName: 'Fabian Ferno',
            email: 'fabianferno@gmail.com',
            auth0: 'google-oauth2|103060808963170302351',
            role: 'admin'
          }
        ]
      }
    ]
  };
  return (
    <>
      {isLoading && <Loading />}
      {user && (
        <main>
          <div>
            <section id="owned projects">
              <div className="d-flex align-items-center justify-content-between">
                <h1 className="font-weight-bold">Projects Owned By You</h1>{' '}
                <Link href="/projects/create">
                  <div className=" btn-lg btn btn-outline-primary">Create a Project ⚡</div>
                </Link>
              </div>
              {projects.owned.map(project => (
                <div className="mt-4 btn text-right card card-body bg-primary text-white rounded col-3">
                  <Link href={`/projects/${project._id.$oid}`} key={project._id.$oid}>
                    <div>
                      <h2 className="bg-dark p-2 rounded font-weight-bold">{project.name}</h2>
                      <h5 className="p-2">{project.description}</h5>
                      <p className="p-2 badge ">{project.url}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </section>
          </div>
          <div>
            <section id="owned projects" className="mt-5">
              <div className="d-flex align-items-center justify-content-between">
                <h1 className="font-weight-bold">Projects you are assigned to</h1>{' '}
              </div>
              {projects.assigned.map(project => (
                <div className="mt-4 btn text-right card card-body bg-primary text-white rounded col-3">
                  <Link href={`/projects/${project._id.$oid}`} key={project._id.$oid}>
                    <div>
                      <h2 className="bg-dark p-2 rounded font-weight-bold">{project.name}</h2>
                      <h5 className="p-2">{project.description}</h5>
                      <p className="p-2 badge ">{project.url}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </section>
          </div>
        </main>
      )}
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();
