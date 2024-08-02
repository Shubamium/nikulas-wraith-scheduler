"use server";
import { createClient } from "next-sanity";

const client = createClient({
  projectId: "6l12l23f",
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: false,
});

const config = {
  next: {
    revalidate: 5,
  },
};
export async function fetchData<T>(grocQuery: string) {
  const res = await client.fetch<T>(grocQuery, {}, { ...config });
  return res;
}
