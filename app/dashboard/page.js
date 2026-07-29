import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getLinksAction } from "@/actions/links";
import DashboardClient from "@/components/DashboardClient";

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    const links = await getLinksAction();

    return <DashboardClient session={session} initialLinks={links} />;
}