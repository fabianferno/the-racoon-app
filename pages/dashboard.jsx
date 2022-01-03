import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useSWR from 'swr';
import Highlight from '../components/Highlight';

export default function SSRPage({ user }) {
  // const { data, error } = useSWR('/api/create', (...args) => fetch(...args).then(res => res.json()));

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  return <div>hello !</div>;
}

export const getServerSideProps = withPageAuthRequired();
