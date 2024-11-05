import { sendNotification } from "@/app/db/client";

export async function POST(request: Request) {
  const payload = await request.json();
  const title = payload.title ?? "No title provided";
  const message = payload.message ?? "Message Unavailble";
  try {
    console.log(payload);
    await sendNotification(title, message);
  } catch (err) {
    console.error(err);
  }
  return new Response(
    JSON.stringify({ message: "Notification has been sent" })
  );
}

// Deprecated
// =================================== Not using twillio anymore
// import { Twilio } from "twilio";

// export async function POST(request: Request) {
//   const payload = await request.json();
//   const message = payload.message ?? "Message Unavailble";
//   const sid = process.env.TWILIO_SID;
//   const auth = process.env.TWILIO_AUTH;

//   const numbers = [process.env.TEST_NUM ?? "+1234567890"];
//   const client = new Twilio(sid, auth);

//   const sids = [];
//   for (let i = 0; i < numbers.length; i++) {
//     try {
//       const result = await client.messages.create({
//         body: message,
//         from: process.env.TWILIO_NUM,
//         // messagingServiceSid: process.env.TWILIO_MSID,
//         to: numbers[i],
//         // from: process.env.TWILIO_NUM,
//       });
//       const res = result.sid;
//       sids.push(res);
//     } catch (err) {
//       sids.push(err);
//     }
//   }
//   // console.log(param);
//   console.log("messsage sent");
//   return new Response(JSON.stringify({ sids }), {
//     status: 200,
//   });
// }
