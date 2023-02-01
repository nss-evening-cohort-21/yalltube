/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getHomeVideos } from '../../API/videoData';
import VideoCard from '../../components/VideoCard';
import { useAuth } from '../../utils/context/authContext';

export default function SearchPage() {
  const [videos, setVideos] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { searchInput } = router.query;

  const getSearchedVideos = () => {
    getHomeVideos(user.uid).then((arr) => {
      const filteredVideos = arr.filter((item) => item.video_title.toLowerCase().includes(searchInput)
        || item.username.toLowerCase().includes(searchInput)
        || item.description.toLowerCase().includes(searchInput));
      setVideos(filteredVideos);
    });
  };

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) getSearchedVideos();
    return () => {
      isCancelled = true;
    };
  }, [searchInput]);
  return (
    <>
      <h4>Search for videos containing: "{searchInput}"</h4>
      <div className="d-flex flex-wrap">
        {videos.map((item) => <VideoCard key={item.firebaseKey} videoObj={item} onUpdate={getSearchedVideos} />)}
      </div>
    </>
  );
}
