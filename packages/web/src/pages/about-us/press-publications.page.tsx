import React from "react";

import { Container, Divider, Text, Title } from "@mantine/core";

import { BasePage } from "@lib/shared";

import { LayoutDefault } from "@components/layouts";
import { FeatureItem, FeatureList } from "@components/display/list";

type PageProps = {
  page_data: BasePage;
  press_publications: (FeatureItem & BasePage)[];
};

export const Page = ({
  page_data: { heading, content },
  press_publications,
}: PageProps) => {
  return (
    <>
      <Container>
        <Title color="brand-red">{heading}</Title>
      </Container>
      <Container>
        <Text dangerouslySetInnerHTML={{ __html: content }} />
        <Divider sx={{ margin: "8px 0px" }} />
        <FeatureList
          items={press_publications.map((x) => ({
            ...x,
            name: x.heading,
            hide_link: true,
          }))}
        />
      </Container>
    </>
  );
};

export const query = {
  page_data: { model: "items/press_publications" },
  press_publications: { model: "items/press_publications_list" },
};

Page.getLayout = (page: React.ReactNode) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};
