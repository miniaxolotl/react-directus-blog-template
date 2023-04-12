import React from "react";

import { LayoutDefault } from "@components/layouts";

export const Page = () => {
  return <div>{/* <h1>{web_config.app_title}</h1> */}</div>;
};

// export const onBeforeRender = async () => {};

Page.getLayout = (page: React.ReactNode) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};
