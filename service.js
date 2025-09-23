await TrackPlayer.updateOptions({
  stopWithApp: true,
  capabilities: [
    Capability.Play,
    Capability.Pause,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
  ],
  compactCapabilities: [Capability.Play, Capability.Pause],
});
