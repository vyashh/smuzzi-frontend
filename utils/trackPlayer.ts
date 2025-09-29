// utils/trackPlayer.ts
import TrackPlayer, { Track } from "react-native-track-player";
import type { Song } from "../types/song";
import { useAuthStore } from "./authStore";
import { useSongsStore } from "./songsStore";
import { shuffle } from "../helpers/misc";
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

export const loadPlay = async ({
  songIndex = 0,
  shuffled = false,
}: {
  songIndex?: number;
  shuffled?: boolean;
}) => {
  const { serverUrl, accessToken } = useAuthStore.getState();
  const { songs } = useSongsStore.getState();

  const songsFromIndex = songs.slice(songIndex);
  const songsShuffled = shuffle(songs); // shuffle later
  const queue = songsFromIndex;

  await TrackPlayer.reset();

  queue.map(async (song: Song) => {
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
