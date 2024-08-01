import { Twilio } from "twilio";

export async function POST(request: Request) {
  const payload = await request.json();
  // const sid = process.env.TWILIO_SID;
  // const auth = process.env.TWILIO_AUTH;

  // const numbers = ["+62895330038025"];
  // const client = new Twilio(sid, auth);
  // const message = param.searchParams.get("message");
  const message = payload;
  console.log(payload);
  return Response.json(payload);
  // const body = new Payload
  // const data = await request.json();
  // console.log(data);
  // const result = await client.messages.create({
  //   body: "hello",
  //   to: "+62895330038025",
  //   from: "+13203739054",
  // });
  // const res = result.sid;
  // console.log(param);
  // console.log("messsage sent");
  // return new Response(res, {
  //   status: 200,
  // });
}
