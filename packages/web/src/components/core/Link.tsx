import React from "react";

import { Anchor, AnchorProps } from "@mantine/core";

import { usePageContext } from "@renderer/hooks";

type LinkProps = AnchorProps & {
  href?: string;
  className?: string;
  children?: React.ReactNode;
};

export const Link = (props: LinkProps) => {
  const pageContext = usePageContext();
  const isActive = pageContext.urlPathname === props.href && "is-active";
  const className = [isActive, props.className].filter(Boolean).join(" ");
  return (
    <Anchor
      {...props}
      className={className}
      weight={600}
      sx={{
        ...props.sx,
        "&:hover": { textDecoration: "none" },
      }}
    >
      {props.children}
    </Anchor>
  );
};
