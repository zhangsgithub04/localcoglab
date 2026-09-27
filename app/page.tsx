import { Catalog } from "@/components/catalog";
import { getLabs } from "@/lib/data";

export default async function Home() {
  const labs = await getLabs();
  return <Catalog labs={labs} />;
}
