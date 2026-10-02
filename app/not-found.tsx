import Container from "@/components/common/container";
import NotFoundView from "@/components/common/not-found-view";

//? catches any URL that doesn't map to a route, for both the marketing pages
//? and the signed-in app. the (app) group ships its own copy so that a dead
//? link from inside the feed keeps the sidebar around.
export default function NotFound() {
  return (
    <main className="relative">
      <Container className="flex min-h-svh flex-col justify-center">
        <NotFoundView />
      </Container>
    </main>
  );
}
