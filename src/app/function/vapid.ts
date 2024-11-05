"use server";
import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:shuba.dev313@gmail.com",
  process.env.WEBPUSH_PUBLIC ?? "",
  process.env.WEBPUSH_PRIVATE ?? ""
);

// export const generateVapid = () => {
//   let vapid = generateVAPIDKeys();
//   console.log(vapid);
// };

export const webPushNotification = async (subscribtion: any, messages: any) => {
  const payload = JSON.stringify(messages);
  try {
    await webpush.sendNotification(subscribtion, payload);
    return true;
  } catch (err: any) {
    console.error(err);
    if ("statusCode" in err && err.statusCode) {
      if (err.statusCode === "404" || err.statusCode === "410") {
        return false;
      }
    }
  }
};
