import React from "react";
import { Label } from "semantic-ui-react";

const NameAvatar = ({ name }) => {
  const initials = name
    ? name
        .split("/")
        .map((word) => word[0])
        .join("")
    : "C";

  return (
    <Label
      circular
      size="big"
      style={{ backgroundColor: "#fb923c", color: "white" }}
    >
      {initials}
    </Label>
  );
};

export default NameAvatar;
