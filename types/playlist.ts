import { DEFAULT_ARTWORK_URI } from "constants/global";

// mirror of db response
export interface ApiPlaylist {
  id: number;
  name: string;
  user_id: string | null;
  created_at: string;
}

// domain model
export interface Playlist {
  id: number;
  name: string;
  userId: string | null;
  createdAt: string;
}

// map data transfer object (ApiPlaylist) to domain model (Playlist)
export const toPlaylist = (dto: ApiPlaylist): Playlist => {
  return {
    id: dto.id,
    name: dto.name,
    userId: dto.user_id,
    createdAt: dto.created_at,
  };
};

//return domain formatted list of playlists
export const toPlaylists = (list: ApiPlaylist[]): Playlist[] => {
  return list.map(toPlaylist);
};
