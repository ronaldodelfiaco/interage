import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    styled,
    Theme,
    Tooltip,
    useMediaQuery,
  } from "@mui/material";
  import UIAccordion from "../../components/accordion/UIAccordion";
  import { H3, Small } from "../../components/Typography";
  import UkoAvatar from "../../components/UkoAvatar";
  import useAuth from "../../hooks/useAuth";
  import { useRouter } from "next/router";
  import { FC, Fragment, SyntheticEvent, useEffect, useState } from "react";
  import ScrollBar from "simplebar-react";
  import FlexBox from "../FlexBox";
  import topMenuList from "./topMenuList";
  
  // root component interface
  interface SideNavBarProps {
    showSideBar: boolean;
    showMobileSideBar: boolean;
    closeMobileSideBar: () => void;
  }
  
  // custom styled components
  const MainMenu = styled(Box)<{ show: boolean }>(({ theme, show }) => ({
    width: 80,
    height: "100%",
    position: "fixed",
    left: show ? 0 : -80,
    boxShadow: theme.shadows[2],
    zIndex: theme.zIndex.drawer + 11,
    transition: "left 0.4s ease-in-out",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down("md")]: { left: -80 },
    "& .simplebar-track.simplebar-vertical": { width: 7 },
    "& .simplebar-scrollbar:before": {
      background: theme.palette.text.primary,
    },
  }));
  
  const SecondarySideBar = styled(Drawer)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    "& .MuiPaper-root": { left: 80 },
  }));
  
  const StyledListItemButton = styled(ListItemButton)(() => ({
    marginBottom: "1rem",
    justifyContent: "center",
    "&:hover": { backgroundColor: "transparent" },
  }));
  
  const Dot = styled(Box)(() => ({
    width: 4,
    height: 4,
    marginRight: 10,
    borderRadius: "50%",
  }));
  
  const SubMenuItem = styled(FlexBox)<{ active?: boolean }>(
    ({ theme, active }) => ({
      cursor: "pointer",
      alignItems: "center",
      padding: "0.6rem 1rem",
      "& div": {
        backgroundColor: active
          ? theme.palette.primary.main
          : theme.palette.text.disabled,
      },
      "& small": {
        color: active ? theme.palette.primary.main : theme.palette.secondary[400],
      },
      "&:hover": {
        backgroundColor:
          theme.palette.mode === "light"
            ? theme.palette.primary[100]
            : theme.palette.divider,
        "& div": { backgroundColor: theme.palette.primary.main },
        "& small": { color: theme.palette.primary.main },
      },
    })
  );
  
  // root component
  const DashboardSideBar: FC<SideNavBarProps> = ({
    showSideBar,
    showMobileSideBar,
    closeMobileSideBar,
  }) => {
    const { user } = useAuth();
    const router = useRouter();
  
    const [active, setActive] = useState("Dashboard");
    const [activeSubMenuItem, setActiveSubMenuItem] = useState("");
    const [openSecondarySideBar, setOpenSecondarySideBar] = useState(false);
    const [categoryMenus, setCategoryMenus] = useState(initialCategoryMenus);
    const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  
    const handleActiveMainMenu = (menuItem: any) => () => {
      setActive(menuItem.title);
  
      if (menuItem.children && menuItem.children.length > 0) {
        setCategoryMenus(menuItem.children);
        if (openSecondarySideBar && active === menuItem.title) {
          setOpenSecondarySideBar(false);
        } else {
          setOpenSecondarySideBar(true);
        }
      } else {
        router.push(menuItem.path);
        closeMobileSideBar();
        setOpenSecondarySideBar(false);
      }
    };
    // accordion
    const [expanded, setExpanded] = useState<string | boolean>("");
  
    useEffect(() => {
      setExpanded(categoryMenus[0].subTitle);
    }, [categoryMenus]);
  
    const handleAccordionChange =
      (panel: string) => (_: SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
      };
  
    const handleSubMenuItem = (path: string) => {
      router.push(path);
      setActiveSubMenuItem(path);
      setOpenSecondarySideBar(false);
      closeMobileSideBar();
    };
  
    // main menus content
    const mainSideBarContent = (
      <List sx={{ height: "100%" }}>
        <StyledListItemButton disableRipple>
          <img src="/static/logo/logo.svg" alt="UKO Logo" width={31} />
        </StyledListItemButton>
  
        <ScrollBar style={{ maxHeight: "calc(100% - 50px)" }}>
          {topMenuList.map((nav, index) => (
            <Tooltip title={nav.title} placement="right" key={index}>
              <StyledListItemButton
                disableRipple
                onClick={handleActiveMainMenu(nav)}
              >
                <nav.Icon
                  sx={{
                    color:
                      active === nav.title ? "primary.main" : "secondary.400",
                  }}
                />
              </StyledListItemButton>
            </Tooltip>
          ))}
        </ScrollBar>
      </List>
    );
  
    // secondary side bars content
    const secondarySideBarContent = (
      <Fragment>
        <ListItem sx={{ py: 2 }}>
          <UkoAvatar alt="Travis Howard" src={user?.avatar} />
          <H3 ml={1}>{user?.name}</H3>
        </ListItem>
  
        {categoryMenus.map((item, index) =>
          item.subCategories ? (
            <UIAccordion
              key={index}
              expandedItem={expanded}
              accordionHeader={item.subTitle}
              handleChange={handleAccordionChange}
            >
              {item.subCategories.map((sub) => (
                <SubMenuItem
                  key={sub.name}
                  active={sub.path === activeSubMenuItem}
                  onClick={() => handleSubMenuItem(sub.path)}
                >
                  <Dot />
                  <Small color="secondary.400">{sub.name}</Small>
                </SubMenuItem>
              ))}
            </UIAccordion>
          ) : (
            <SubMenuItem
              key={item.subTitle}
              active={item.path === activeSubMenuItem}
              onClick={() => handleSubMenuItem(item.path)}
            >
              <Dot />
              <Small color="secondary.400">{item.subTitle}</Small>
            </SubMenuItem>
          )
        )}
      </Fragment>
    );
  
    // for mobile device
    if (downMd) {
      const handleClose = () => {
        return openSecondarySideBar
          ? setOpenSecondarySideBar(false)
          : closeMobileSideBar();
      };
  
      return (
        <Fragment>
          <Drawer
            anchor="left"
            onClose={handleClose}
            open={showMobileSideBar}
            PaperProps={{ sx: { width: 80 } }}
          >
            <Box
              sx={{
                height: "100%",
                display: "flex",
                width: "inherit",
                position: "fixed",
                overflow: "hidden",
                flexDirection: "column",
                zIndex: (theme) => theme.zIndex.drawer + 3,
                backgroundColor: (theme) => theme.palette.background.paper,
                boxShadow: (theme) => theme.shadows[1],
                "& .simplebar-track.simplebar-vertical": { width: 7 },
                "& .simplebar-scrollbar:before": {
                  background: (theme) => theme.palette.text.primary,
                },
              }}
            >
              {mainSideBarContent}
            </Box>
  
            <Box
              sx={{
                height: "100%",
                position: "fixed",
                backgroundColor: "white",
                transition: "all 0.4s ease-in-out",
                left: openSecondarySideBar ? 80 : -250,
              }}
            >
              {secondarySideBarContent}
            </Box>
          </Drawer>
        </Fragment>
      );
    }
  
    return (
      <Fragment>
        <MainMenu show={showSideBar}>{mainSideBarContent}</MainMenu>
  
        <SecondarySideBar
          open={openSecondarySideBar}
          onClose={() => setOpenSecondarySideBar(false)}
        >
          {secondarySideBarContent}
        </SecondarySideBar>
      </Fragment>
    );
  };
  
  const initialCategoryMenus = [
    {
      subTitle: "Dashboards",
      subCategories: [
        { name: "Saas", path: "/dashboard/saas" },
        { name: "Sales", path: "/dashboard/sales" },
        {
          name: "Project Management",
          path: "/dashboard/project-management",
        },
        {
          name: "Project Management V2",
          path: "/dashboard/project-management-v2",
        },
      ],
      path: "",
    },
  ];
  
  export default DashboardSideBar;