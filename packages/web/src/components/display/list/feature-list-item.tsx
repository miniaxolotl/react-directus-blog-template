import React from "react";

import { Box, Card, Image, Text, Title } from "@mantine/core";

import { BaseCoverImage } from "@lib/shared";
import { web_config } from "@lib/config";

import { Link } from "@components/core";

export type FeatureItem = BaseCoverImage & {
  cover_image: string;
  cover_image_caption?: string;
  name: string;
  email?: string;
  website_link?: string;
  info?: string;
  date_created?: string;
  date_updated?: string;
  hide_link?: boolean;
};

export type FeatureListItemProps = {
  children?: React.ReactNode;
  item: FeatureItem;
};

export const FeatureListItem = ({
  item: { cover_image, name, email, website_link, info, hide_link = false },
}: FeatureListItemProps) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "stretch",
        height: "100%",
      }}
    >
      <Card.Section>
        <Link href={`https://${website_link}`}>
          <Image
            src={`https://${web_config.cms_host}/assets/${cover_image}?key=large-cover`}
            radius={4}
          />
        </Link>
      </Card.Section>
      <Box mt={8} mb={4} sx={{ flexGrow: 1 }}>
        <Title size="h3" order={3} color="brand-red">
          {name}
        </Title>
        {website_link && !hide_link && (
          <Text>
            {/* {`Website: `} */}
            <Link href={`https://${website_link}`}>{website_link}</Link>
          </Text>
        )}
        {email && (
          <Text>
            {/* {`Email: `} */}
            <Link href={`mailto:${email}`}>{email}</Link>
          </Text>
        )}
        {info && <Text size="sm">{info}</Text>}
      </Box>
    </Card>
  );
};
