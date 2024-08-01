"use client";
import { useEffect, useState } from "react";
import "./home.scss";
import { useRouter } from "next/navigation";
export default function Home() {
  const [activeSchedules, setActiveSchedules] = useState<any[]>([]);
  const router = useRouter();
  const [changes, setChanges] = useState(true);
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
  return (
    <main className={"scheduler"}>
      <h1>Alert Scheduler</h1>

      <form action="/api/schedules" method="POST" className="schedule-form">
        <div className="input-field">
          <label htmlFor="title">Alert Title</label>
          <input type="string" required name="title" id="title" />
        </div>
        <div className="input-field">
          <label htmlFor="date">Send At - Timezone[AMERICA/CHICAGO]</label>
          <input type="datetime-local" required name="date" id="date" />
        </div>
        <div className="input-field">
          <label htmlFor="date">Alert Messages:</label>
          <textarea name="message" required id="message"></textarea>
        </div>
        <button type="submit" className="btn-sub">
          Schedule
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
      <div className="subscribed-list">
        <h2>Subscribed Numbers [IN PROGRESS]</h2>
        <p>+62895330038025</p>
      </div>
    </main>
  );
}
