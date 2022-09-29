import * as React from "react";

import FeedArea from "@graphics/uikit/FeedArea";

type BingoBoardProps = React.ComponentProps<typeof FeedArea>;

export default function BingoBoard(props: BingoBoardProps) {
  return <FeedArea {...props} />;
}
