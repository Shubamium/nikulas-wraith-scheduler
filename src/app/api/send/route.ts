import { Twilio } from "twilio";

const sid = process.env.TWILIO_SID;
const auth = process.env.TWILIO_AUTH;

const client = new Twilio(sid, auth);

export async function GET(request: Request) {
  const param = new URL(request.url);
  // const body = new Payload
  // const data = await request.json();
  // console.log(data);
  const result = await client.messages.create({
    body: "hello",
    to: "+62895330038025",
    from: "+13203739054",
  });
  const res = result.sid;
  console.log(param);
  console.log("messsage sent");
  return new Response(res, {
    status: 200,
  });
}
