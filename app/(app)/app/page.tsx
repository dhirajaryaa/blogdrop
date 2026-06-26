import { ensureAuthUser } from "@/lib/auth/get-user";

async function  AppPage() {

  await ensureAuthUser();

  return (
    <div>
      app route
    </div>
  )
}

export default AppPage;
