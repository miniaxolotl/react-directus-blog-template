import React from "react";

import { Container, Text, Title } from "@mantine/core";

import { web_config } from "@lib/config";
import { Stande } from "@lib/stande";

import { LayoutDefault } from "@components/layouts";
import { BasePage } from "@lib/shared";

type PageData = BasePage;

type PageProps = BasePage;

export const Page = ({ heading, content }: PageProps) => {
  return (
    <>
      <Container>
        <Title color="brand-red">{heading}</Title>
      </Container>
      <Container>
        <Text dangerouslySetInnerHTML={{ __html: content }} />
      </Container>
    </>
  );
};

export const onBeforeRender = async () => {
  const { search } = new Stande({
    base_url: web_config.cms_host,
    api_token: web_config.directus.public_api_token,
    api_token_type: "Bearer",
  });
  const response = await search<{ data: PageData }>("items/volunteer_page", {});
  if (!response.ok) return null;
  return {
    pageContext: { pageProps: { ...response.data.data } },
  };
};

Page.getLayout = (page: React.ReactNode) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};
