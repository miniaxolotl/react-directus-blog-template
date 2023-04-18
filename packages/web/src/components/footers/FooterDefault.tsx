import React from "react";
import { Box } from "@mantine/core";
import { MdCopyright } from "react-icons/md";
import { FiFacebook, FiInstagram, FiMail } from "react-icons/fi";

import { social_links } from "@data";

// import { Stande } from "@lib/stande";
import { web_config } from "@lib/config";

import { Link } from "@components/core";

export type FooterDefaultProps = {
  children?: React.ReactNode;
};

export const FooterDefault = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <Box my={24}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
            aria-label="instagram link"
          >
            <FiInstagram />
            <Link href={social_links.instagram.link}>
              @ssyofcanada
              {/* instagram */}
            </Link>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
            aria-label="facebook link"
          >
            <FiFacebook />
            <Link href="https://www.facebook.com/SouthSudaneseYouthOfCanada">
              facebook
            </Link>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
            aria-label="email link"
          >
            <FiMail />
            <Link href="email:ssyouthofcanada@gmail.com">
              ssyouthofcanada@gmail.com
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <MdCopyright />
          {web_config.app_title} {new Date().getFullYear()}
        </Box>
        {children}
      </Box>
    </Box>
  );
};
