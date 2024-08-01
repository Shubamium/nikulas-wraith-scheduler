import { Twilio } from "twilio";

export async function POST(request: Request) {
  const payload = await request.json();
  const message = payload.message ?? "Message Unavailble";
  const sid = process.env.TWILIO_SID;
  const auth = process.env.TWILIO_AUTH;

  const numbers = ["+62895330038025", "+12819374192"];
  const client = new Twilio(sid, auth);

  const sids = [];
  for (let i = 0; i < numbers.length; i++) {
    try {
      const result = await client.messages.create({
        body: message,
        to: numbers[i],
        from: "+13203739054",
      });
      const res = result.sid;
      sids.push(res);
    } catch (err) {
      sids.push(err);
    }
  }
  // console.log(param);
  console.log("messsage sent");
  return new Response(JSON.stringify({ sids }), {
    status: 200,
  });
}
