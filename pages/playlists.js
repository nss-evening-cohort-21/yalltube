/* eslint-disable react-hooks/exhaustive-deps */
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
      <div className="text-center">
        <h1>PlaylistsPage</h1>
        <Link passHref href="./playlist/new">
          <Button type="button">Create Playlist</Button>
        </Link>
      </div>
      <div>
        {playlists.map((item) => <PlaylistCard key={item.firebaseKey} playlistObj={item} onUpdate={getAllPlaylists} />)}
      </div>
    </>
  );
}
