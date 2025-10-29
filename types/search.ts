// mirror of db response
export interface ApiSearch {
  id: number;
  song_id: number;
  searched_at: string;
}

// domain model
export interface Search {
  id: number;
  songId: number;
  searchedAt: string;
}

// map data transfer object (ApiSearch) to domain model (Search)
export const toSearch = (dto: ApiSearch): Search => {
  return {
    id: dto.id,
    songId: dto.song_id,
    searchedAt: dto.searched_at,
  };
};

//return domain formatted list of playlists
export const toSearchs = (list: ApiSearch[]): Search[] => {
  return list.map(toSearch);
};
