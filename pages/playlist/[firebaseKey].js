import { useRouter } from 'next/router';
import React from 'react';

export default function ViewPlaylistPage() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  return (
    <h1>Playlist: {firebaseKey}</h1>
  );
}
