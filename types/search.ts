import { Song } from "./song";

// mirror of db response
export interface ApiSearch {
  id: number;
  song_id: number;
  searched_at: string;
  song: Song;
}

// domain model
export interface Search {
  id: number;
  songId: number;
  searchedAt: string;
  song: Song;
}

// map data transfer object (ApiSearch) to domain model (Search)
export const toSearch = (dto: ApiSearch): Search => {
  return {
    id: dto.id,
    songId: dto.song_id,
    searchedAt: dto.searched_at,
    song: dto.song,
  };
};

//return domain formatted list of playlists
export const toSearchs = (list: ApiSearch[]): Search[] => {
  return list.map(toSearch);
};
