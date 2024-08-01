import "./home.scss";
export default function Home() {
  return (
    <main className={"scheduler"}>
      <h1>Alert Scheduler</h1>

      <form action="#" className="schedule-form">
        <div className="input-field">
          <label htmlFor="date">Send At - Timezone[AMERICA/NEW_YORK]</label>
          <input type="datetime-local" name="date" id="date" />
        </div>
        <div className="input-field">
          <label htmlFor="date">Alert Messages:</label>
          <textarea name="message" id="message"></textarea>
        </div>
        <button type="submit" className="btn-sub">
          Schedule
        </button>
      </form>
      <div className="subscribed-list">
        <h2>Subscribed Numbers</h2>
        <p>+62895330038025</p>
      </div>
    </main>
  );
}
