/** @format */

import axios from "axios";

const getPlayList = async (playlistId, pageToken = "", result = []) => {
  const KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const URL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails,snippet&playlistId=${playlistId}&key=${KEY}&maxResults=50&pageToken=${pageToken}`;

  const { data } = await axios.get(URL);
  result = [...result, ...data.items];

  if (data.nextPageToken) {
    result = getPlayList(playlistId, data.nextPageToken, result);
  }
  return result;
};

export default getPlayList;
