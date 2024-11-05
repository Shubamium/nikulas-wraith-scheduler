"use client";
import { useEffect, useState } from "react";
import "./home.scss";
import { sendNotification } from "./db/client";

export default function Home() {
  const [activeSchedules, setActiveSchedules] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [messages, setMessages] = useState("");

  const fetchScheduleList = async () => {
    const res = await fetch("/api/schedules");
    const req = await res.json();
    console.log(req);
    setActiveSchedules(req.items);
  };

  const removeAlert = async (id: string) => {
    const res = await fetch("/api/schedules?id=" + id, {
      method: "DELETE",
    });
    const filtered = activeSchedules.filter((x) => x.id !== id);
    setActiveSchedules(filtered);
  };

  useEffect(() => {
    fetchScheduleList();
  }, []);

  const sendDirect = () => {
    if (messages === "" && title === "") {
      alert("Please fill out the title and message");
      return;
    }
    sendNotification(title, messages);
  };

  return (
    <main className={"scheduler"}>
      <h1>Alert Scheduler</h1>

      <form action="/api/schedules" method="POST" className="schedule-form">
        <div className="input-field">
          <label htmlFor="title">Alert Title</label>
          <input
            type="string"
            required
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="date">Send At - Timezone[AMERICA/CHICAGO]</label>
          <input type="datetime-local" required name="date" id="date" />
        </div>
        <div className="input-field">
          <label htmlFor="date">Alert Messages:</label>
          <textarea
            name="message"
            required
            id="message"
            value={messages}
            onChange={(e) => setMessages(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn-sub"
          name={"sched"}
          value={"schedule"}
        >
          Schedule
        </button>
        <button className="btn-sub" type="button" onClick={sendDirect}>
          Send Alert Directly
        </button>
      </form>
      <div className="active-sched">
        <h2>Schedule List (Max 5)</h2>
        <p>
          Please remove the old alerts when it has been sent or has a status of
          succeded .
        </p>
        <div className="list">
          {activeSchedules.map((schedule) => {
            return (
              <div
                className={`schedule-list ${schedule.status}`}
                key={schedule.id}
              >
                <h3>
                  {schedule.title} - <span>{schedule.status}</span>
                </h3>
                <p>{new Date(schedule.runAt).toUTCString()}</p>
                <p className="message">
                  {schedule.payload && JSON.parse(schedule.payload).message}
                </p>
                <button
                  className="btn remove"
                  onClick={() => {
                    removeAlert(schedule.id);
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

//  {/* <div className="subscribed-list">
//         <h2>Subscribed Numbers</h2>
//         <div className="numbers">
//           {registeredNumbers.map((num: string) => {
//             return <p key={num}>{num}</p>;
//           })}
//         </div>
//       </div> */}
