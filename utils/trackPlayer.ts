// utils/trackPlayer.ts
import TrackPlayer, { Track } from "react-native-track-player";
import type { Song } from "../types/song";
import { useAuthStore } from "./authStore";
import { shuffle } from "../helpers/misc";
import { PlaylistType } from "constants/global";

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
  list,
  shuffleMode = "keepSelectionFirst",
}: {
  songIndex?: number;
  shuffled?: boolean;
  list: ReadonlyArray<Song> | [];
  shuffleMode?: "keepSelectionFirst" | "randomStart";
}) => {
  const { serverUrl, accessToken } = useAuthStore.getState();

  let ordered = list;
  if (shuffled) {
    const selected = list[songIndex];
    const rest = [...list.slice(0, songIndex), ...list.slice(songIndex + 1)];
    ordered = [selected, ...shuffle(rest)];
    songIndex = 0;
  }

  if (shuffled && shuffleMode === "keepSelectionFirst") {
    const selected = list[songIndex];
    const rest = [...list.slice(0, songIndex), ...list.slice(songIndex + 1)];
    ordered = [selected, ...shuffle(rest)];
    songIndex = 0;
  } else if (shuffled && shuffleMode === "randomStart") {
    ordered = shuffle(list.slice());
    songIndex = Math.floor(Math.random() * ordered.length);
  }

  const tracks = ordered.map((s) => buildTrack(s, serverUrl, accessToken));

  await TrackPlayer.reset();

  try {
    await TrackPlayer.add(tracks);

    // playing original track
    await TrackPlayer.skip(songIndex);
    await TrackPlayer.play();
  } catch {
    // hls fallback
    await TrackPlayer.reset();
    const first = ordered[songIndex];
    await TrackPlayer.add([buildTrack(first, serverUrl, accessToken, true)]);
    await TrackPlayer.play();
  }
};
