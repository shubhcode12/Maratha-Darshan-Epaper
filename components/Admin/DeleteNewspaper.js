import React, { useState } from "react";
import DateInput from "../DateInput";
import NewsPaper from "../Newspaper";
import firebase from "../../utils/firebase";
import getDate from "../../utils/getDate";

export default function DeleteNewspaper() {
  const defaultDate = getDate();
  const [date, setDate] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchDate = async (ev) => {
    if (ev) ev.preventDefault();
    setLoading(true);
    try {
      const query = await firebase
        .database()
        .ref("/papers")
        .orderByChild("date")
        .equalTo(date || defaultDate)
        .limitToFirst(2)
        .once("value")
        .then((data) => data.val());
      if (!query) {
        setError("No results found.");
      } else {
        setResult(Object.entries(query).map((val) => ({ key: val[0], ...val[1] })));
      }
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  const deleteDate = async () => {
    setLoading(true);
    try {
      await firebase
        .database()
        .ref("/papers/" + result[0].key)
        .remove();
      setResult(null);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="search">
      <div className="login-card">
        <div className="login-card-content">
          <form onSubmit={searchDate}>
            <DateInput id="date" name="date" label="Pick a date" value={date || defaultDate} onChangeValue={setDate} required />
            <div className="card-action">
              <button className={`btn${loading ? " loading" : ""}`} disabled={loading} type="submit">
                Get paper
              </button>
              {result && (
                <button className={`btn${loading ? " loading" : ""}`} disabled={loading} onClick={deleteDate}>
                  Delete paper
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <div style={{ marginTop: "24px" }}>
        {error && <div style={{ marginTop: "12px", color: "red", textAlign: "center" }}>{error}</div>}
        {result && result.length > 0 && result.map((data, i) => <NewsPaper key={i} data={data} />)}
      </div>
    </div>
  );
}
