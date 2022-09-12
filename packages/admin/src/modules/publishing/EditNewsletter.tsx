import * as React from "react";
import { Header } from "@spyrothon/uikit";

import { useSafeSelector } from "@admin/Store";
import useSafeDispatch from "@admin/hooks/useDispatch";
import { fetchNewsletter } from "./PublishingActions";
import * as PublishingStore from "./PublishingStore";
import NewsletterEditor from "./NewsletterEditor";

interface EditNewsletterProps {
  newsletterId: string;
}

export default function EditNewsletter(props: EditNewsletterProps) {
  const dispatch = useSafeDispatch();
  const { newsletterId } = props;

  const newsletter = useSafeSelector((state) =>
    PublishingStore.getNewsletter(state, { newsletterId }),
  );

  React.useEffect(() => {
    dispatch(fetchNewsletter(newsletterId));
  }, [newsletterId]);

  if (newsletter == null) return null;

  return (
    <div>
      <Header size={Header.Sizes.H1}>Editing {newsletter.title}</Header>

      <NewsletterEditor newsletterId={newsletterId} />
    </div>
  );
}
