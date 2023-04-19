import React from "react";

import { FeatureItem, FeatureListItem } from ".";
import { Box } from "@mantine/core";

export type FeatureListProps = {
  children?: React.ReactNode;
  items: FeatureItem[];
};

export const FeatureList = ({ items }: FeatureListProps) => {
  return (
    <Box
      sx={{
        display: "grid",
        "grid-template-columns": `repeat(3, 1fr)`,
        columnGap: 8,
        rowGap: 12,
        "@media (max-width: 980px)": {
          "grid-template-columns": `repeat(2, 1fr)`,
        },
        "@media (max-width: 720px)": {
          "grid-template-columns": `repeat(1, 1fr)`,
        },
      }}
    >
      {items.map((item) => (
        <FeatureListItem key={item.name} item={item} />
      ))}
    </Box>
  );
};
