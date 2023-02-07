import Link from 'next/link';
import React from 'react';
import { Button } from 'react-bootstrap';

export default function PlaylistsPage() {
  const handleClick = () => {
    console.warn('You clicked the Create Playlist Button');
  };
  return (
    <div className="text-center">
      <h1>PlaylistsPage</h1>
      <Link passHref href="./playlist/new">
        <Button type="button" onClick={handleClick}>Create Playlist</Button>
      </Link>
    </div>
  );
}
