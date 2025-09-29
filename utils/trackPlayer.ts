// utils/trackPlayer.ts
import TrackPlayer, { Track } from "react-native-track-player";
import type { Song } from "../types/song";

const buildTrack = (song: Song, serverUrl: string, token: string, hls = false): Track => {
  const common = {
    id: String(song.id),
    title: song.title,
    artist: song.artist,                            
    artwork: song.coverUrl,
    headers: { Authorization: `Bearer ${token}` },
  } as const;

  return hls
    ? { ...common, url: `${serverUrl}/api/stream/${song.id}/index.m3u8`, contentType: "application/x-mpegURL" }
    : { ...common, url: `${serverUrl}/api/stream/${song.id}` };
};

export const loadPlay = async (song: Song, serverUrl: string, accessToken: string) => {
  await TrackPlayer.reset();
  try {
    await TrackPlayer.add(buildTrack(song, serverUrl, accessToken));
    await TrackPlayer.play();
  } catch (e) {
    await TrackPlayer.reset();
    await TrackPlayer.add(buildTrack(song, serverUrl, accessToken, true));
    await TrackPlayer.play();
  }
};
