import React from "react";

import { Container, Text, Title } from "@mantine/core";

import { LayoutDefault } from "@components/layouts";
import { BasePage } from "@lib/shared";

type PageProps = {
  page_data: BasePage;
};

export const Page = ({ page_data: { heading, content } }: PageProps) => {
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

export const query = {
  page_data: { model: "items/conference_get_involved" },
};

Page.getLayout = (page: React.ReactNode) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};
