import { Badge, Box, ButtonBase, Divider, styled } from "@mui/material";
import FlexBox from "../../../components/FlexBox";
import { H6, Small, Tiny } from "../../../components/Typography";
import UkoAvatar from "../../../components/UkoAvatar";
import useAuth from "../../../hooks/useAuth";
import { FC, Fragment, useRef, useState } from "react";
import toast from "react-hot-toast";
import PopoverLayout from "./PopoverLayout";
import { useRouter } from "next/router";

// styled components
const StyledSmall = styled(Small)(({ theme }) => ({
  display: "block",
  padding: "5px 1rem",
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary[100],
  },
}));

const ProfilePopover: FC = () => {
  const navigate = useRouter();
  const anchorRef = useRef(null);
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <ButtonBase disableRipple ref={anchorRef} onClick={() => setOpen(true)}>
        <Badge
          overlap="circular"
          variant="dot"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          sx={{
            "& .MuiBadge-badge": {
              width: 11,
              height: 11,
              right: "7%",
              borderRadius: "50%",
              border: "2px solid #fff",
              backgroundColor: "success.main",
            },
          }}
        >
          <UkoAvatar
            src="/static/avatar/001-man.svg"
            sx={{ width: 30, height: 30, ml: 1 }}
          />
        </Badge>
      </ButtonBase>

      <PopoverLayout
        hiddenViewButton
        maxWidth={230}
        minWidth={200}
        popoverOpen={open}
        anchorRef={anchorRef}
        popoverClose={() => setOpen(false)}
        title={
          <FlexBox alignItems="center">
            <UkoAvatar src={user?.avatar} sx={{ width: 35, height: 35 }} />

            <Box ml={1}>
              <H6>{user?.name }</H6>
            </Box>
          </FlexBox>
        }
      >
        <Box pt={1}>
          {/* <StyledSmall>Set Status</StyledSmall>

          <StyledSmall>Profile & Account</StyledSmall>
          <StyledSmall>Settings</StyledSmall>
          <StyledSmall>Manage Team</StyledSmall> */}

          {/* <Divider sx={{ my: 1 }} /> */}
          <StyledSmall
            onClick={() => {
              logout(user);
              toast.error("You Logout Successfully");
              navigate.reload();
            }}
          >
            Sign Out
          </StyledSmall>
        </Box>
      </PopoverLayout>
    </Fragment>
  );
};

export default ProfilePopover;
