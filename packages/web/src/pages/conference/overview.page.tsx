import React from "react";

import { Container, Image, Text, Title } from "@mantine/core";

import { BasePage } from "@lib/shared";
import { web_config } from "@lib/config";

import { LayoutDefault } from "@components/layouts";

type PageProps = {
  page_data: BasePage;
};

export const Page = ({
  page_data: { cover_image, heading, content },
}: PageProps) => {
  return (
    <>
      <Container>
        <Title color="brand-red">{heading}</Title>
      </Container>
      <Container>
        <Image
          src={`https://${web_config.cms_host}/assets/${cover_image}?key=large-cover`}
          radius={4}
        />
        <Text dangerouslySetInnerHTML={{ __html: content }} />
      </Container>
    </>
  );
};

export const query = {
  page_data: { model: "items/conference_overview" },
};

Page.getLayout = (page: React.ReactNode) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};
