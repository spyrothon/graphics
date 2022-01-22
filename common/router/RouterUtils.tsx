import { createBrowserHistory } from "history";
import queryString from "query-string";

export function getHostname() {
  return window.location.hostname;
}

export function getCurrentPath() {
  return window.location.pathname;
}

export function getSearchParams() {
  return queryString.parse(window.location.search);
}

export function isLocalUrl(url: string) {
  return !/(?:^[a-z][a-z0-9+.-]*:|\/\/)/.test(url);
}

export const history = createBrowserHistory();
// Re-apply browser-standard scrolling behavior on route transitions
history.listen((_location, action) => {
  // If the user is navigating backwards, don't reset scroll.
  if (action === "POP") return;
  window.scrollTo(0, 0);
});

type NavigateOptions = {
  replace?: boolean;
  forceReload?: boolean;
  query?: object;
  hash?: string;
  state?: object;
};

export function navigateTo(pathname: string, options: NavigateOptions = {}) {
  const { replace = false, forceReload = false, query, hash, state } = options;

  const navigate = replace ? history.replace : history.push;

  let fullPath = pathname;
  if (query != null) {
    fullPath += `?${queryString.stringify(query)}`;
  }
  if (hash != null) {
    fullPath += `#${hash}`;
  }

  navigate(fullPath, state);

  if (forceReload) {
    window.location.reload();
  }
}

export default {
  history,
  getHostname,
  getCurrentPath,
  getSearchParams,
  isLocalUrl,
  navigateTo,
};
