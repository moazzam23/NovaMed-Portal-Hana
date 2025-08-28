import React from "react";
import DotsMenu from "../DotsMenu";
import { AnalyticsChart } from "../charts";
import { Box, Text, Heading } from "../elements";

export default function AnalyticsCard({
  digit,
  label,
  variant,
  dataSet,
  dataKey,
  dotsMenu,
  total,
  percentage,
}) {
  return (
    <Box className={`mc-analytics-card ${variant.name}`}>
      <Box className="mc-analytics-card-group">
        <Box className="mc-analytics-card-content">
          <Text>{label}</Text>
          <Heading>{digit}</Heading>
        </Box>
        {/* <DotsMenu dots={dotsMenu.icon} dropdown={dotsMenu.menu} /> */}
      </Box>
      <AnalyticsChart
        dataSet={dataSet}
        dataKey={dataKey}
        variant={variant.color}
      />
      <div className="cardAnyls">
        <div className="cardAnyls-left">
          <text>{total}</text>
        </div>
        <div className="cardAnyls-right">
          <text>{percentage}</text>
        </div>
      </div>
    </Box>
  );
}
