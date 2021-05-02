import React from "react";
import { useByeQuery } from "../generated/graphql";

interface Props {}

export const Bye: React.FC<Props> = () => {
  const { data, loading, error } = useByeQuery({
    variables: {},
    fetchPolicy: "network-only",
  });

  if (loading) {
    return <div style={{ marginTop: "10vw", fontSize: "2vw" }}>loading...</div>;
  }

  if (error) {
    return (
      <div style={{ marginTop: "10vw", fontSize: "2vw" }}>{error.message}</div>
    );
  }

  if (!data) {
    return <div style={{ marginTop: "10vw", fontSize: "2vw" }}>no data</div>;
  }

  return (
    <div style={{ marginTop: "10vw", fontSize: "2vw" }}>
      {data.bye.id} and {data.bye.name}
    </div>
  );
};
