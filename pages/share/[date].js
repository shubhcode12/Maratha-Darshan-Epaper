import React from "react";
import firebase from "../../utils/firebase";
import NewsPaper from "../../components/Newspaper";

export default function Share({ paper, notfound }) {
  return notfound ? (
    <div style={{ marginTop: "12px", color: "red", textAlign: "center" }}>Cannot find what you're looking for</div>
  ) : (
    <div className="home">
      <NewsPaper data={paper} />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { date } = ctx.query;
  let props = { paper: null, notfound: true };

  const query = await firebase
    .database()
    .ref("/papers")
    .orderByChild("date")
    .equalTo(date)
    .limitToFirst(2)
    .once("value")
    .then((data) => data.val());
  if (query) {
    props = { paper: Object.entries(query).map((val) => val[1])[0], notfound: false };
  }

  return {
    props: { ...props },
  };
}
