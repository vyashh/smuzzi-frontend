export interface PlayStart {
  track_id: number;
  context_type: string; //  example => "playlist", "library", "home",
  context_id: string; // example => "pl:2", "home"
  source_label: string; // example => "My cool playlist" aka the playlist name or "Library"
  position_start_sec: number;
  device: "web";
}

export interface PlayEnd {
  event_id: number;
  position_end_sec: number;
}
