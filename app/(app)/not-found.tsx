import Container from "@/components/common/container";
import NotFoundView from "@/components/common/not-found-view";

export default function AppNotFound() {
  return (
    <Container className="max-w-3xl">
      <NotFoundView className="py-24" />
    </Container>
  );
}
