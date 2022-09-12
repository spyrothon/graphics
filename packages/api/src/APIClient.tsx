import * as auth from "./routes/auth";
import * as init from "./routes/init";
import * as interviews from "./routes/interviews";
import * as publishing from "./routes/publishing";
import * as runs from "./routes/runs";
import * as schedules from "./routes/schedules";
import * as transitions from "./routes/transitions";

export default {
  ...auth,
  ...init,
  ...interviews,
  ...publishing,
  ...runs,
  ...schedules,
  ...transitions,
};
