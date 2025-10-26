// mirror of db response
export interface ApiUser {
  id: number;
  username: string;
  display_name: string;
}

// domain model
export interface User {
  id: number;
  username: string;
  displayName: string;
}

// map data transfer object to domain model
export const toUser = (dto: ApiUser): User => {
  return {
    id: dto.id,
    username: dto.username,
    displayName: dto.display_name,
  };
};

//return domain formatted list of songs
export const toUsers = (list: ApiUser[]): User[] => {
  return list.map(toUser);
};
