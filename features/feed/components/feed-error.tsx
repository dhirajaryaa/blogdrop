import ErrorView from "./error-view";

//? feed-load (backwards-compatible re-export so existing feed imports keep working)
function FeedErrorView() {
  return <ErrorView />;
}

export { FeedErrorView as FeedError };

export { default } from "./error-view";
