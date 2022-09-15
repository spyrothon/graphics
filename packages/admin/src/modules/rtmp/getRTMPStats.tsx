import {APIClient} from "@spyrothon/api";

const DOM_PARSER = new DOMParser();

interface RTMPClient {}

export interface RTMPStream {
  streamKey: string;
  uptimeMillis?: number;
  videoBitrate?: number;
  audioBitrate?: number;
  videoHeight: number;
  videoWidth: number;
  frameRate: number;
  clients?: RTMPClient[];
}

export default async function getRTMPStats(scheduleId: string): Promise<RTMPStream[]> {
  const response = await APIClient.fetchScheduleRTMPStat(scheduleId);
  const parsed = DOM_PARSER.parseFromString(response, "application/xml");

  const liveStreams = Array.from(parsed.querySelectorAll("application")).filter(
    (app) => app.querySelector("name")?.innerHTML === "live",
  )[0];

  const streams = liveStreams?.querySelectorAll("stream");
  return Array.from(streams)
    .map((stream): RTMPStream | undefined => {
      const key = stream.querySelector("name")?.innerHTML;
      const uptime = stream.querySelector("time")?.innerHTML;
      const videoBitrate = stream.querySelector("bw_video")?.innerHTML;
      const audioBitrate = stream.querySelector("bw_audio")?.innerHTML;
      const videoMeta = stream.querySelector("meta video");
      const videoHeight = videoMeta?.querySelector("height")?.innerHTML;
      const videoWidth = videoMeta?.querySelector("width")?.innerHTML;
      const frameRate = videoMeta?.querySelector("frame_rate")?.innerHTML;

      if (
        key == null ||
        uptime == null ||
        videoBitrate == null ||
        audioBitrate == null ||
        videoHeight == null ||
        videoWidth == null ||
        frameRate == null
      ) {
        return undefined;
      }

      return {
        streamKey: key,
        uptimeMillis: parseInt(uptime),
        videoBitrate: parseInt(videoBitrate),
        audioBitrate: parseInt(audioBitrate),
        videoHeight: parseInt(videoHeight),
        videoWidth: parseInt(videoWidth),
        frameRate: parseInt(frameRate),
      };
    })
    .filter((stream): stream is RTMPStream => stream != null);
}
