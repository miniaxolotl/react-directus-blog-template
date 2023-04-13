import React, { useEffect } from "react";

import { Stande } from "@lib/stande";
import { web_config } from "@lib/config";

import { usePageContext } from "@renderer/hooks";
import {
  DesktopNavigation,
  DesktopNavigationDropdown,
  DesktopNavigationDropdownItem,
  DesktopNavigationItem,
} from "@components/navigation/desktop-navigation";
import { Box } from "@mantine/core";
import { Link } from "@components/core";

export type LayoutDefaultProps = {
  children?: React.ReactNode;
};

export type NavigationItem = {
  slug: string;
  display_name: string;
  children?: NavigationItem[];
};

export type GlobalAppData = {
  title?: string;
  description?: string;
  navigation_bar: NavigationItem[];
};

export const Layout = ({
  children,
}: // navigation_items,
{
  children: React.ReactNode;
  // navigation_items: NavigationItem[];
}) => {
  return (
    <Box
      px={52}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <Box py={24}>
        <DesktopNavigation title={web_config.app_title}>
          <DesktopNavigationDropdown title="Conference">
            <DesktopNavigationDropdownItem>
              <Link href="/conference/overview">Conference Overview</Link>
            </DesktopNavigationDropdownItem>
            <DesktopNavigationDropdownItem>
              <Link href="/conference/itinerary">Conference Itinerary</Link>
            </DesktopNavigationDropdownItem>
            <DesktopNavigationDropdownItem>
              <Link href="/conference/vendors">Vendors</Link>
            </DesktopNavigationDropdownItem>
            <DesktopNavigationDropdownItem>
              <Link href="/conference/get-involved">Get Involved</Link>
            </DesktopNavigationDropdownItem>
          </DesktopNavigationDropdown>

          <DesktopNavigationItem>
            <Link href="/articles">Articles</Link>
          </DesktopNavigationItem>

          <DesktopNavigationDropdown title="About Us">
            <DesktopNavigationDropdownItem>
              <Link href="/about-us/our-story">Our Story</Link>
            </DesktopNavigationDropdownItem>
            <DesktopNavigationDropdownItem>
              <Link href="/about-us/our-sponsors">Our Sponsors</Link>
            </DesktopNavigationDropdownItem>
            <DesktopNavigationDropdownItem>
              <Link href="/about-us/press-publications">
                Press & Publications
              </Link>
            </DesktopNavigationDropdownItem>
            <DesktopNavigationDropdownItem>
              <Link href="/about-us/financial-reports">Financial Reports</Link>
            </DesktopNavigationDropdownItem>
          </DesktopNavigationDropdown>

          <DesktopNavigationItem>
            <Link href="/contact-us">Contact Us</Link>
          </DesktopNavigationItem>
        </DesktopNavigation>
      </Box>
      <Box py={24}>{children}</Box>
    </Box>
  );
};

export const Content = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export const LayoutDefault = (props: LayoutDefaultProps) => {
  const { exports } = usePageContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const get_global_app_data = async () => {
    const { get } = new Stande({
      base_url: web_config.cms_host,
    });

    const res = await get<{ data: GlobalAppData }>("items/global", {
      parameters: {},
    });
    if (res.ok) return res.data.data;
    return null;
  };

  useEffect(() => {
    const load_page_data = async () => {
      const global_app_data = await get_global_app_data();
      if (!global_app_data) return;
      if (global_app_data?.title)
        exports.documentProps.title = global_app_data.title;
      if (global_app_data?.description)
        exports.documentProps.description = global_app_data.description;
    };

    load_page_data();
  }, []);

  return (
    <Layout>
      {/* TODO - ADD SEO Here */}
      <Content>{props.children}</Content>
    </Layout>
  );
};
