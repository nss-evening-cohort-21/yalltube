import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSinglePlaylist } from '../../../API/playlistData';
import PlaylistForm from '../../../components/forms/PlaylistForm';

export default function EditPlaylistPage() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePlaylist(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>Edit Playlist</title>
      </Head>
      <PlaylistForm obj={editItem} />
    </>
  );
}
