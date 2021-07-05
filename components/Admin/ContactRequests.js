import React, { useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import config from "../../config";

const contactCSV = "https://us-central1-" + config.firebaseConfig.projectId + ".cloudfunctions.net/contactCSV";

export default function ContactRequests() {
  const [loading, setLoading] = useState(true);
  const [end, setEnd] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const limit = 16;

  useEffect(() => {
    (async () => {
      try {
        const query = await firebase
          .database()
          .ref("/contact-requests")
          .orderByChild("timestamp")
          .limitToLast(limit)
          .once("value")
          .then((snap) => snap.val());
        const data = Object.entries(query).map((val) => val[1]);
        data.sort((a, b) => b.timestamp - a.timestamp);
        setData(data);
        if (data.length < limit) setEnd(true);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    })();
  }, []);

  const loadMore = async () => {
    try {
      setLoading(true);
      const query = await firebase
        .database()
        .ref("/contact-requests")
        .orderByChild("timestamp")
        .endAt(data[data.length - 1].timestamp)
        .limitToLast(limit + 1)
        .once("value")
        .then((snap) => snap.val());
      const queryData = Object.entries(query).map((val) => val[1]);
      queryData.pop();
      const newData = [...data, ...queryData];
      newData.sort((a, b) => b.timestamp - a.timestamp);
      setData(newData);
      if (queryData.length < limit) setEnd(true);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <div className="contact-requests">
      <h2>Contact Requests</h2>
      <a href={contactCSV}>Download as CSV</a>
      <div className="contact-requests-feed">
        {data &&
          data.map((item, i) => {
            const date = new Date(item.timestamp);
            return (
              <div key={i} className="contact-req-card">
                <h3>{item.name}</h3>
                <h4>{item.email}</h4>
                <h4>{item.phone}</h4>
                <p>{item.message}</p>
                <h4>{date.toLocaleString()}</h4>
              </div>
            );
          })}
      </div>
      {loading && <div className="loader" />}
      {error && <div style={{ color: "red", textAlign: "center", marginTop: "18px" }}>{error}</div>}
      {end && <div style={{ color: "red", textAlign: "center", marginTop: "18px" }}>You've reached the end</div>}
      {!loading && !end && (
        <button className="btn" onClick={loadMore}>
          Load more
        </button>
      )}
    </div>
  );
}
