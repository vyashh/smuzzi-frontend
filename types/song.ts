import { DEFAULT_ARTWORK_URI } from "constants/globalStyles";

// mirror of db response
export interface ApiSong {
  id: number;
  title: string;
  artist: string | null;
  album: string | null;
  filename: string;
  cover_url: string | null;
  spotify_id: string | null;
}

// domain model
export interface Song {
  id: number;
  title: string;
  artist?: string;
  album?: string;
  filename: string;
  coverUrl?: string;
  spotify_id?: string;
}

// map data transfer object (ApiSong) to domain model (Song)
export const toSong = (dto: ApiSong): Song => {
  return {
    id: dto.id,
    title: dto.title,
    artist: dto.artist ?? "Unknown Artist",
    album: dto.album ?? undefined,
    filename: dto.filename,
    coverUrl: dto.cover_url ?? DEFAULT_ARTWORK_URI,
    spotify_id: dto.spotify_id ?? undefined,
  };
};

//return domain formatted list of songs
export const toSongs = (list: ApiSong[]): Song[] => {
  return list.map(toSong);
};
