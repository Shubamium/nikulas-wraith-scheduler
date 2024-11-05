export async function GET(request: Request) {
  try {
    const res = await fetch(
      "https://api.cronhooks.io/schedules?skip=0&limit=5",
      {
        headers: {
          Authorization: `Bearer ${process.env.CRONHOOK_API}`,
        },
      }
    );
    const data = await res.json();
    return Response.json(data);
  } catch (er: any) {
    console.log(er);
    return new Response(er, {
      status: 400,
    });
  }
}

export async function POST(request: Request) {
  const form = await request.formData();
  console.log(form);
  const title = form.get("title");
  const date = form.get("date");
  const message = form.get("message");

  const newSchedule = {
    title: title,
    url: "https://nikulas-wraith-scheduler.vercel.app/api/send",
    timezone: "America/Chicago",
    method: "POST",
    contentType: "application/json; charset=utf-8",
    isRecurring: false,
    runAt: date,
    sendCronhookObject: true,
    sendFailureAlert: false,
    cronExpression: "",
    payload: {
      message: message,
    },
  };
  const req = await fetch("https://api.cronhooks.io/schedules", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CRONHOOK_API}`,
    },
    body: JSON.stringify(newSchedule),
  });
  const res = await req.json();
  console.log(res);
  return Response.redirect(new URL("/", request.url));
  // return new Response("Called", {
  //   status: 200,
  // });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);

  try {
    const res = await fetch(
      "https://api.cronhooks.io/schedules/" + searchParams.get("id"),
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.CRONHOOK_API}`,
        },
      }
    );
    const data = await res.json();
    return Response.json(data);
  } catch (er: any) {
    console.log(er);
    return new Response(er, {
      status: 400,
    });
  }
}
