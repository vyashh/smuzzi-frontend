// utils/trackPlayer.ts
import TrackPlayer, { Track } from "react-native-track-player";
import type { Song } from "../types/song";
import { useAuthStore } from "./authStore";
import { useSongsStore } from "./songsStore";

const buildTrack = (
  song: Song,
  serverUrl: string,
  token: string,
  hls = false
): Track => {
  const common = {
    id: String(song.id),
    title: song.title,
    artist: song.artist,
    artwork: song.coverUrl,
    headers: { Authorization: `Bearer ${token}` },
  } as const;

  return hls
    ? {
        ...common,
        url: `${serverUrl}/api/stream/${song.id}/index.m3u8`,
        contentType: "application/x-mpegURL",
      }
    : { ...common, url: `${serverUrl}/api/stream/${song.id}` };
};

export const loadPlay = async (index: number) => {
  const { serverUrl, accessToken } = useAuthStore.getState();
  const { songs } = useSongsStore.getState();

  const songsFromIndex = songs.slice(index);

  await TrackPlayer.reset();

  songsFromIndex.map(async (song: Song) => {
    try {
      await TrackPlayer.add(buildTrack(song, serverUrl, accessToken));
      await TrackPlayer.play();
    } catch (e) {
      await TrackPlayer.reset();
      await TrackPlayer.add(buildTrack(song, serverUrl, accessToken, true));
      await TrackPlayer.play();
    }
  });
};
