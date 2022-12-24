/** @format */
import { useEffect } from "react";
import useYoutube from "./hook/useYoutube";

const App = () => {
  const {
    playlists,
    addPlaylistById,
    addToFavorite,
    addToRecent,
    favoriteLists,
    recentPlaylists,
    error,
    loading,
  } = useYoutube();

  useEffect(() => {
    addPlaylistById("PL_XxuZqN0xVDm9HkiP4h_76qNBZix6XME");
    addToFavorite("PLD8nQCAhR3tT3ehpyOpoYeUj3KHDEVK9h");
  }, []);
  console.log("Playlists", playlists);
  console.log("Error", error);
  console.log("Loading", loading);
  return (
    <div>
      <h2>Clean YouTube</h2>
    </div>
  );
};

export default App;
