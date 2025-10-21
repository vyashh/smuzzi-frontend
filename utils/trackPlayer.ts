import TrackPlayer, { Event, Track } from "react-native-track-player";
import type { Song } from "../types/song";
import { useAuthStore } from "./authStore";
import { shuffle } from "../helpers/misc";
import { useSongsStore } from "./songsStore";
import type { PlayStart, PlayEndPayload } from "./songsStore";
import { ContextType } from "types/playback";

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

const allowed: ContextType[] = ["playlist", "likes", "library", "unknown"];

const getPositionSec = async (): Promise<number> => {
  try {
    const pos = (await TrackPlayer.getProgress()).position;
    return Math.max(0, Math.floor(pos ?? 0));
  } catch {
    return 0;
  }
};

export const loadPlay = async ({
  songIndex = 0,
  shuffled = false,
  list,
  shuffleMode = "keepSelectionFirst",
  context_type,
  context_id,
  source_label,
  device = "web",
}: {
  songIndex?: number;
  shuffled?: boolean;
  list: ReadonlyArray<Song> | [];
  shuffleMode?: "keepSelectionFirst" | "randomStart";
  context_type?: ContextType;
  context_id?: string;
  source_label?: string;
  device?: string;
}) => {
  const { serverUrl, accessToken } = useAuthStore.getState();

  let ordered = list;
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
    await TrackPlayer.skip(songIndex);

    const selectedSong = ordered[songIndex];
    const position_start_sec = await getPositionSec();

    const startPayload: PlayStart = {
      track_id: Number(selectedSong.id),
      context_type: context_type ?? "unknown",
      context_id: context_id ?? null,
      source_label: source_label ?? null,
      position_start_sec,
      device,
    };

    await useSongsStore.getState().setStartPlay(startPayload);
    await TrackPlayer.play();
  } catch {
    await TrackPlayer.reset();
    const first = ordered[songIndex];
    await TrackPlayer.add([buildTrack(first, serverUrl, accessToken, true)]);

    const position_start_sec = await getPositionSec();
    const startPayload: PlayStart = {
      track_id: Number(first.id),
      context_type: context_type,
      context_id: context_id ?? null,
      source_label: source_label ?? null,
      position_start_sec,
      device,
    };
    await useSongsStore.getState().setStartPlay(startPayload);
    await TrackPlayer.play();
  }
};

export const stopPlay = async () => {
  const position_end_sec = await getPositionSec();
  await TrackPlayer.stop();
  const payload: PlayEndPayload = { position_end_sec };
  await useSongsStore.getState().setEndPlay(payload);
};

export const registerPlaybackListeners = () => {
  TrackPlayer.addEventListener(Event.PlaybackState, async () => {
    const position_end_sec = await getPositionSec();
    await useSongsStore.getState().setEndPlay({ position_end_sec });
  });
  TrackPlayer.addEventListener(Event.PlaybackError, async () => {
    const position_end_sec = await getPositionSec();
    await useSongsStore.getState().setEndPlay({ position_end_sec });
  });
};
