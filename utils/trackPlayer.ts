import TrackPlayer from "react-native-track-player";
import { useSongsStore } from "./songsStore";
import { useAuthStore } from "./authStore";
import { DEFAULT_ARTWORK_URI } from "constants/globalStyles";
import { Song } from "schemas/song";

 const loadPlay = async (index: number) => {
    const {songs} = useSongsStore();
    const {serverUrl, accessToken} = useAuthStore();

    const song: Song = songs[index]

    await TrackPlayer.reset();

    try {
      // instant stream original quality
      await TrackPlayer.add({
        id: String(song.id),
        url: `${serverUrl}/api/stream/${song.id}`, // progressive original
        title: song.title || "Unknown Title",
        artist: song.artist || "Unknown Artist",
        artwork: song.cover_url || DEFAULT_ARTWORK_URI,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      await TrackPlayer.play();
      console.log("playing original quality");
    } catch (e) {
      console.log("Progressive failed, retrying with HLS fallback", e);
      await TrackPlayer.reset();
      // hls fallback aac 160k bitrate in the backend
      await TrackPlayer.add({
        id: String(song.id),
        url: `${serverUrl}/api/stream/${song.id}/index.m3u8`, // master
        title: song.title || "Unknown Title",
        artist: song.artist || "Unknown Artist",
        artwork: song.cover_url || undefined,
        headers: { Authorization: `Bearer ${accessToken}` }, // for master only; variants/segments use token
      });
      await TrackPlayer.play();
      console.log("playing aac quality");
    }
  };