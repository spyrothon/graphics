import * as React from "react";
import { Header, Stack } from "@spyrothon/sparx";

import useSafeDispatch from "@admin/hooks/useDispatch";
import { useSafeSelector } from "@admin/Store";

import NewsletterEditor from "./NewsletterEditor";
import { fetchNewsletter } from "./PublishingActions";
import * as PublishingStore from "./PublishingStore";

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
  }, [dispatch, newsletterId]);

  if (newsletter == null) return null;

  return (
    <Stack spacing="space-lg">
      <Header tag="h1">Editing {newsletter.title}</Header>

      <NewsletterEditor newsletterId={newsletterId} />
    </Stack>
  );
}
