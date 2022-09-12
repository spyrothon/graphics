export interface InitPayload {
  scheduleId: string;
  currentUser?: User;
}

export interface Interview {
  id: string;
  topic: string;
  notes: string;
  estimateSeconds: number;
  interviewees: RunParticipant[];
  interviewers: RunParticipant[];
  questions: InterviewQuestion[];
  currentQuestion?: string;
}

export interface InitialInterview {
  topic?: string;
  notes?: string;
  interviewees?: RunParticipant[];
  interviewers?: RunParticipant[];
}

export interface InterviewQuestion {
  question: string;
  answer?: string;
  category?: string;
  image?: string;
  hint?: string;
  score?: number;
  showQuestion: boolean;
  showHint: boolean;
  showAnswer: boolean;
}

export interface Schedule {
  id: string;
  scheduleEntries: ScheduleEntry[];
  name: string;
  series: string;
  startTime: Date;
  endTime?: Date;
  logoUrl?: string;
  twitchUrl?: string;

  runTitleTemplate?: string;
  interviewTitleTemplate?: string;
  breakTitleTemplate?: string;
  rtmpHost?: string;

  currentEntryId?: string;
  debug: boolean;

  breakLeftTitle?: string;
  breakLeftSubtitle?: string;
  breakRightTitle?: string;
  breakRightSubtitle?: string;
  outroTitle?: string;
  outroSubtitle?: string;
}

export interface ScheduleResponse extends Schedule {
  runs: Run[];
  interviews: Interview[];
}

export interface InitialSchedule {
  name?: string;
  series?: string;
  startTime?: Date;
  endTime?: Date;
  logoUrl?: string;
  twitchUrl?: string;
}

export interface ScheduleEntry {
  id: string;
  scheduleId: string;
  position: number;
  setupSeconds?: number;
  actualSetupSeconds?: number;
  enteredAt?: Date;
  exitedAt?: Date;
  durationSeconds?: number;
  enterTransitionSet?: TransitionSet;
  exitTransitionSet?: TransitionSet;
  obsSceneName?: string;
  runId?: string;
  interviewId?: string;
}

export interface InitialScheduleEntry {
  id?: string;
  scheduleId?: string;
  position?: number;
  setupSeconds?: number;
  runId?: string;
  interviewId?: string;
  obsSceneName?: string;
  enterTransitionSet?: InitialTransitionSet;
  exitTransitionSet?: InitialTransitionSet;
}

export enum ScheduleEntryType {
  RUN = "run",
  INTERVIEW = "interview",
}

export enum TransitionState {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}

export interface TransitionSet {
  id: string;
  state: TransitionState;
  transitions: Transition[];
}

export interface Transition {
  id: string;
  obsTransitionInName: string;
  transitionDuration: number;
  obsSceneName: string;
  sceneDuration?: number;
  obsMediaSourceName?: string;
  state?: TransitionState;
}

export type InitialTransition = Partial<Transition>;

export interface InitialTransitionSet {
  id?: string;
  state?: TransitionState;
  transitions: InitialTransition[];
}

export interface Run {
  id: string;
  gameName?: string;
  gameNameFormatted?: string;
  categoryName?: string;
  estimateSeconds: number;
  platform?: string;
  releaseYear?: string;
  notes?: string;
  startedAt?: Date;
  finishedAt?: Date;
  pausedAt?: Date;
  finished: boolean;
  actualSeconds?: number;
  pauseSeconds?: number;
  runners: RunParticipant[];
  commentators: RunParticipant[];
}

export interface InitialRun {
  gameName?: string;
  categoryName?: string;
  estimateSeconds?: number;
  platform?: string;
  releaseYear?: string;
  notes?: string;
  actualTime?: number;
  finished?: boolean;
  runners?: RunParticipant[];
  commentators?: RunParticipant[];
}

export interface CropTransform {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface RunParticipant {
  id: string;
  displayName: string;
  twitchName?: string;
  twitterName?: string;
  pronouns?: string;
  hasWebcam: boolean;
  visible: boolean;
  // Run fields
  finishedAt?: Date;
  actualSeconds?: number;
  // Interview fields
  score?: number;
  gameplayIngestUrl?: string;
  gameplayCropTransform?: CropTransform;
  webcamIngestUrl?: string;
  webcamCropTransform?: CropTransform;
}

export interface OBSWebsocketConfig {
  id?: string;
  name?: string;
  host: string;
  port: number;
  password: string;
}

export interface User {
  id: string;
  name: string;
  role?: string;
}

export interface SessionToken {
  userId: string;
  token: string;
  expiresAt: Date;
}

export type InitialArticle = Partial<Article>;

export interface Article {
  id: string;
  title: string;
  content: string;
  authorName?: string;
  publishedAt?: Date;
  insertedAt: Date;
  updatedAt: Date;
}

export type InitialPublication = Partial<Publication>;

export interface Publication {
  id: string;
  articleId: string;
  newsletterId: string;
  priority: number;
}

export interface Newsletter {
  id: string;
  title: string;
  introduction: string;
  published?: boolean;
  publishedAt?: Date;
  publications: Publication[];
  articles: Article[];
  insertedAt: Date;
  updatedAt: Date;
}

export interface InitialNewsletter {
  id?: string;
  title?: string;
  introduction?: string;
  published?: boolean;
  publishedAt?: Date;
  publications?: InitialPublication[];
}
