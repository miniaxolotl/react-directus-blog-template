import React from "react";

import { Box, Container, Image, Title } from "@mantine/core";

import { web_config } from "@lib/config";
import { BasePage } from "@lib/shared";

import { LayoutDefault } from "@components/layouts";

type PageProps = BasePage;

export const Page = ({
  cover_image,
  cover_image_caption,
  heading,
  content,
}: PageProps) => {
  return (
    <>
      <Container>
        <Title color="brand-red">{heading}</Title>
      </Container>
      <Container>
        <Image
          src={`https://${web_config.cms_host}/assets/${cover_image}?key=large-cover`}
          alt={cover_image_caption}
          caption={cover_image_caption}
          style={{
            overflow: "hidden",
            borderRadius: 4,
          }}
        />

        <Box sx={{ display: "flex", gap: 16 }}>
          <Box
            dangerouslySetInnerHTML={{ __html: content }}
            sx={{ flexBasis: 12, flexGrow: 1 }}
          />
          {/* TODO - last 3 blog posts (blog list) */}
          <Box sx={{ flexBasis: 240, flexGrow: 0 }}>
            TODO: Put last 3 blog posts here
          </Box>
        </Box>
      </Container>
    </>
  );
};

export const query = {
  model: "items/landing_page",
};

Page.getLayout = (page: React.ReactNode) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};
