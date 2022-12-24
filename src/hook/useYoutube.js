/** @format */

import { useState } from "react";
import getPlayList from "../api";

const useYoutube = () => {
  const [state, setState] = useState({
    playlists: {},
    recentPlaylists: [],
    favoriteLists: [],
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const addPlaylistById = async (playlistId) => {
    let result;
    try {
      setLoading(true);
      result = await getPlayList(playlistId);
      setError("");
    } catch (e) {
      setError(e.response.data.error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
    let cid, ct;
    result = result.map((item) => {
      const {
        title,
        description,
        thumbnails: { medium },
        channelId,
        channelTitle,
      } = item.snippet;

      if (!cid) {
        cid = channelId;
      }
      if (!ct) {
        ct = channelTitle;
      }
      return {
        title,
        description,
        thumbnail: medium,
        contentDetails: item.contentDetails,
      };
    });

    setState((prev) => ({
      ...prev,
      playlists: {
        ...prev.playlists,
        [playlistId]: {
          items: result,
          playlistId: playlistId,
          channelId: cid,
          channelTitle: ct,
        },
      },
    }));
  };

  const addToFavorite = (playlistId) => {
    setState((prev) => ({
      ...prev,
      favoriteLists: [...state.favoriteLists, playlistId],
    }));
  };
  const addToRecent = (playlistId) => {
    setState((prev) => ({
      ...prev,
      recentPlaylists: [...state.recentPlaylists, playlistId],
    }));
  };
  const getPlaylistsByIds = (ids = []) => {
    return ids.map((id) => state.playlists[id]);
  };

  return {
    playlists: state.playlists,
    favoriteLists: getPlaylistsByIds(state.favoriteLists),
    recentPlaylists: getPlaylistsByIds(state.recentPlaylists),
    error,
    loading,
    addPlaylistById,
    addToFavorite,
    addToRecent,
  };
};

export default useYoutube;
