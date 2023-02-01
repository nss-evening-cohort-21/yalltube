import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleVideo } from '../../../API/videoData';
import VideoForm from '../../../components/forms/VideoForm';

export default function EditVideoPage() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleVideo(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <VideoForm obj={editItem} />
  );
}
