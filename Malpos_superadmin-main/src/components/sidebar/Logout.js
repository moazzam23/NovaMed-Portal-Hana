import React from "react";
import { Box, Anchor } from "../elements";

export default function Logout({ data }) {
  return (
    <Box className="">
      <Anchor
        href={data?.path}
        icon={data?.icon}
        text={data?.text}
        className="mc-btn primary sm"
      />
    </Box>
  );
}
