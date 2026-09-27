import { type Lab, labs } from "@/lib/labs";
import { getDb } from "@/lib/mongodb";

export async function getLabs(): Promise<Lab[]> {
  try {
    const db = await getDb();
    if (!db) return labs;

    const storedLabs = await db.collection<Lab>("labs").find({}).sort({ order: 1 }).toArray();
    return storedLabs.length > 0 ? storedLabs.map(({ _id, ...lab }) => lab as Lab) : labs;
  } catch (error) {
    console.warn("Falling back to local lab data:", error);
    return labs;
  }
}

export async function getLab(slug: string): Promise<Lab | undefined> {
  const allLabs = await getLabs();
  return allLabs.find((lab) => lab.slug === slug);
}
