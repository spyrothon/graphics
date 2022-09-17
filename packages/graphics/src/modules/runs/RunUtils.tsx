import { Run,RunParticipant } from "@spyrothon/api";

function getVisibleParticipants(participants: RunParticipant[]) {
  return participants.filter((participant) => participant.visible);
}

function hasAnyWebcam(run?: Run) {
  if (run == null) return false;

  return (
    run.runners.some((runner) => runner.hasWebcam) ||
    run.commentators.some((commentator) => commentator.hasWebcam)
  );
}

export default {
  getVisibleParticipants,
  hasAnyWebcam,
};
