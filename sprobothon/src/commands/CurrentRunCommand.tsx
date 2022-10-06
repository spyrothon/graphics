import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Interview, Run, ScheduleEntry, ScheduleResponse } from "@spyrothon/api";

import API from "../API";
import { humanizedDateTime } from "../util/DateTimeUtil";
import { formatDuration } from "../util/DurationUtils";
import type { ChatCommand } from "./CommandTypes";

function addDurationToTime(date: Date, seconds: number): Date {
  return new Date(date.getTime() + seconds * 1000);
}

function getTimesForEntry(
  schedule: ScheduleResponse,
  targetEntry: ScheduleEntry,
): { actual: [Date, Date]; estimated: [Date, Date] } {
  let lastEstimatedStartTime = schedule.startTime;

  const runsById: Record<string, Run> = schedule.runs.reduce((acc, run) => {
    acc[run.id] = run;
    return acc;
  }, {});
  const interviewsById: Record<string, Interview> = schedule.interviews.reduce((acc, interview) => {
    acc[interview.id] = interview;
    return acc;
  }, {});

  for (const entry of schedule.scheduleEntries) {
    const setupTime = entry.setupSeconds ?? 0;
    const nextEstimatedStartTime = addDurationToTime(lastEstimatedStartTime, setupTime);
    const entryEstimatedSeconds =
      (runsById[entry.runId]?.estimateSeconds ?? 0) +
      (interviewsById[entry.interviewId]?.estimateSeconds ?? 0);

    lastEstimatedStartTime = addDurationToTime(
      nextEstimatedStartTime,
      entryEstimatedSeconds + setupTime,
    );

    if (entry.id === targetEntry.id) {
      return {
        actual: [entry.enteredAt, runsById[entry.runId]?.finishedAt ?? entry.exitedAt],
        estimated: [
          nextEstimatedStartTime,
          addDurationToTime(nextEstimatedStartTime, entryEstimatedSeconds),
        ],
      };
    }
  }
}

function buildRunEmbed(run: Run, entry: ScheduleEntry, schedule: ScheduleResponse) {
  const runTitle = `${run.gameName} - ${run.categoryName} by ${run.runners
    .map((runner) => runner.displayName)
    .join(", ")}`;
  const { actual, estimated } = getTimesForEntry(schedule, entry);
  const [started, finished] = actual;
  const [estStarted] = estimated;

  return new EmbedBuilder()
    .setTitle(runTitle)
    .setAuthor({ name: schedule.name })
    .setDescription(`Watch it live now on ${schedule.twitchUrl}`)
    .setFields(
      {
        name: started != null ? "Started at" : "Starts at",
        value: started != null ? humanizedDateTime(started) : humanizedDateTime(estStarted),
      },
      {
        name: finished != null ? "Final time" : "Estimate",
        inline: true,
        value:
          finished != null
            ? formatDuration(run.actualSeconds)
            : formatDuration(run.estimateSeconds),
      },
      {
        name: "Platform",
        inline: true,
        value: run.platform ?? "Not Set",
      },
      {
        name: "Release Year",
        inline: true,
        value: run.releaseYear ?? "Not Set",
      },
    );
}

function buildInterviewEmbed(
  interview: Interview,
  entry: ScheduleEntry,
  schedule: ScheduleResponse,
) {
  const interviewTitle = `An interview with ${interview.interviewees.join(", ")}`;
  const { actual, estimated } = getTimesForEntry(schedule, entry);
  const [started, finished] = actual;
  const [estStarted, estFinished] = estimated;

  return new EmbedBuilder()
    .setTitle(interviewTitle)
    .setAuthor({ name: schedule.name })
    .setFields(
      {
        name: started != null ? "Started at" : "Starts at",
        value:
          started != null
            ? `${humanizedDateTime(started)}\n_estimated ${humanizedDateTime(estStarted)}_`
            : humanizedDateTime(estStarted),
      },
      {
        name: finished != null ? "Ended at" : "Estimated ending time",
        value:
          finished != null
            ? `${humanizedDateTime(finished)}\n_estimated ${humanizedDateTime(estFinished)}_`
            : humanizedDateTime(estFinished),
      },
    );
}

function getCurrentEntryEmbed(schedule: ScheduleResponse) {
  const { currentEntryId, scheduleEntries, runs, interviews } = schedule;

  const currentEntry = scheduleEntries.find((entry) => entry.id === currentEntryId);
  if (currentEntry.runId != null) {
    const run = runs.find((run) => run.id === currentEntry.runId);
    return buildRunEmbed(run, currentEntry, schedule);
  } else if (currentEntry.interviewId != null) {
    const interview = interviews.find((interview) => interview.id === currentEntry.interviewId);
    return buildInterviewEmbed(interview, currentEntry, schedule);
  }
}

const CurrentRunCommand: ChatCommand = {
  name: "current-run",
  get data() {
    return new SlashCommandBuilder()
      .setName("current-run")
      .setDescription("Get information about the run happening right now on Spyrothon");
  },
  async action(interaction) {
    const { scheduleId } = await API.init.fetchInit();
    const schedule = await API.schedules.fetchSchedule(scheduleId);

    const entryEmbed = getCurrentEntryEmbed(schedule);
    await interaction.reply({ embeds: [entryEmbed] });
  },
};

export default CurrentRunCommand;
