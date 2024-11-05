"use server";
import { createClient } from "next-sanity";
import { webPushNotification } from "../function/vapid";

const client = createClient({
  projectId: "6l12l23f",
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
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

export async function getSubsList() {
  const subs = await fetchData<any[]>(`*[_type == 'subscribtion']{...}`);
  return subs;
}

export async function removeRecipient(id: string) {
  console.log("removing recipient");
  await client.delete(id);
}

export async function sendNotification(title: string, message: string) {
  const recipients = await getSubsList();
  console.log(recipients);
  for (let recipient of recipients) {
    let subs = {
      ...recipient,
    };
    let success = await webPushNotification(subs, {
      title: title ?? "Title",
      body: message ?? "This is a test notification",
    });
    if (!success) {
      // Delete recipient from database;
      await removeRecipient(recipient._id);
    }
  }
}
