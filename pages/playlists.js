/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getPlaylists } from '../API/playlistData';
import PlaylistCard from '../components/PlaylistCard';
import { useAuth } from '../utils/context/authContext';

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState([]);
  const { user } = useAuth();

  const getAllPlaylists = () => {
    getPlaylists(user.uid).then(setPlaylists);
  };
  useEffect(() => {
    getAllPlaylists();
  }, []);
  return (
    <>
      <Head>
        <title>{user.displayName}'s Playlists</title>
      </Head>
      <div className="text-center mt-4">
        <h1 className="mb-4">{user.displayName}'s Playlists</h1>
        <Link passHref href="./playlist/new">
          <Button type="button">Create Playlist</Button>
        </Link>
      </div>
      <div className="d-flex flex-wrap justify-content-center mt-5">
        {playlists.map((item) => <PlaylistCard key={item.firebaseKey} playlistObj={item} onUpdate={getAllPlaylists} />)}
      </div>
    </>
  );
}
