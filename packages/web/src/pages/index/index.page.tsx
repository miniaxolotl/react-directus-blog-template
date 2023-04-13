import React from "react";

import { LayoutDefault } from "@components/layouts";
import { Stande } from "@lib/stande";
import { web_config } from "@lib/config";
import { Box, Container, Image, Title } from "@mantine/core";

type MastheadValues = {
  cover: string;
  cover_caption: string;
  heading: string;
  preview: string;
  body: string;
};

type PageProps = MastheadValues;

export const Page = ({ cover, cover_caption, heading, body }: PageProps) => {
  return (
    <>
      <Container>
        <Title color="brand-red">{heading}</Title>
      </Container>
      <Container>
        <Image
          src={`https://${web_config.cms_host}/assets/${cover}?key=large-cover`}
          alt={cover_caption}
          caption={cover_caption}
          style={{
            overflow: "hidden",
            borderRadius: 4,
          }}
        />

        <Box sx={{ display: "flex", gap: 16 }}>
          <Box
            dangerouslySetInnerHTML={{ __html: body }}
            sx={{ flexBasis: 12, flexGrow: 1 }}
          />
          {/* TODO - last 3 articles (article list) */}
          <Box sx={{ flexBasis: 240, flexGrow: 0 }}>
            TODO: Put last 3 articles here
          </Box>
        </Box>
      </Container>
    </>
  );
};

export const onBeforeRender = async () => {
  const { get } = new Stande({
    base_url: web_config.cms_host,
    api_token: web_config.directus.public_api_token,
    api_token_type: "Bearer",
  });
  const response = await get<{ data: MastheadValues }>("items/masthead", {
    parameters: {},
  });
  if (!response.ok) return null;
  return {
    pageContext: { pageProps: { ...response.data.data } },
  };
};

Page.getLayout = (page: React.ReactNode) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};
