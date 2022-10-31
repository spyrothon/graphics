import { Commentator, Run, Runner } from "@spyrothon/api";

function getVisibleParticipants(participants: Array<Runner | Commentator>) {
  return participants.filter((participant) => participant.visible);
}

function hasAnyWebcam(run?: Run) {
  if (run == null) return false;

  return (
    run.runners.some((runner) => runner.webcamVisible) ||
    run.commentators.some((commentator) => commentator.webcamVisible)
  );
}

export default {
  getVisibleParticipants,
  hasAnyWebcam,
};
