import React from "react";

import { Container, Image, Text, Title } from "@mantine/core";

import { LayoutDefault } from "@components/layouts";
import { BasePage } from "@lib/shared";
import { web_config } from "@lib/config";

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
  page_data: { model: "items/our_story" },
};

Page.getLayout = (page: React.ReactNode) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};
