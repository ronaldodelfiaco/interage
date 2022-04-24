import { Clear } from "@mui/icons-material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  styled,
} from "@mui/material";
import FlexBox from "../../../components/FlexBox";
import { H5, Tiny } from "../../../components/Typography";
import ActivityIcon from "../../../icons/ActivityIcon";
import { FC, Fragment, useState } from "react";
import ScrollBar from "simplebar-react";

// styled component
const StyledTimelineItem = styled(TimelineItem)(() => ({
  "&:before": { padding: 0, flex: "none" },
}));

const StyledTimelineDot = styled(TimelineDot)(() => ({
  margin: 0,
  padding: 0,
  borderWidth: 0,
  borderStyle: "none",
  boxShadow: "none",
}));

const StyledTimelineConnector = styled(TimelineConnector)(({ theme }) => ({
  backgroundColor: theme.palette.divider,
}));

const ActivityPopover: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <IconButton onClick={() => setOpen(true)}>
        <Badge color="error" badgeContent={0}>
          <ActivityIcon fontSize="small" sx={{ color: "text.disabled" }} />
        </Badge>
      </IconButton>

      <Drawer
        open={open}
        elevation={0}
        anchor="right"
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiPaper-root": {
            width: 300,
          },
          zIndex: (theme) => theme.zIndex.drawer + 111,
        }}
      >
        <FlexBox alignItems="center" justifyContent="space-between" p={2}>
          <H5>Activity</H5>
          <IconButton onClick={() => setOpen(false)} size="small" sx={{ p: 0 }}>
            <Clear />
          </IconButton>
        </FlexBox>

        <Divider />

        <ScrollBar
          style={{
            height: "calc(100% - (54px + 75px))",
            overflow: "auto",
          }}
        >
          <Timeline position="right">
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
              <StyledTimelineItem key={item}>
                <TimelineSeparator>
                  <StyledTimelineDot>
                    <Avatar
                      src="/static/avatar/001-man.svg"
                      sx={{ width: 30, height: 30 }}
                    />
                  </StyledTimelineDot>
                  <StyledTimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ pr: 0 }}>
                  <H5>Iana Robinson</H5>
                  <Tiny
                    mb={2}
                    display="block"
                    fontWeight={500}
                    color="text.disabled"
                  >
                    Added 2 files to task FD-7
                  </Tiny>

                  <Grid
                    container
                    sx={{
                      padding: 1,
                      borderRadius: 1,
                      backgroundColor: "secondary.300",
                    }}
                  >
                    <Grid item xs={6}>
                      <FlexBox alignItems="center">
                        <img
                          src="/static/file-type/jpg.svg"
                          width="25px"
                          alt=""
                        />
                        <Box
                          sx={{
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontWeight: 500,
                            overflow: "hidden",
                            marginLeft: "5px",
                          }}
                        >
                          <Tiny sx={{ whiteSpace: "nowrap" }}>
                            weekly-reports.jpg
                          </Tiny>
                          <Tiny
                            sx={{
                              display: "block",
                              fontSize: 8,
                              color: "text.disabled",
                            }}
                          >
                            12kb
                          </Tiny>
                        </Box>
                      </FlexBox>
                    </Grid>

                    <Grid item xs={6}>
                      <FlexBox>
                        <img
                          src="/static/file-type/jpg.svg"
                          width="25px"
                          alt=""
                        />
                        <Box
                          sx={{
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontWeight: 500,
                            overflow: "hidden",
                            marginLeft: "5px",
                          }}
                        >
                          <Tiny sx={{ whiteSpace: "nowrap" }}>
                            weekly-reports.jpg
                          </Tiny>
                          <Tiny
                            sx={{
                              display: "block",
                              fontSize: 8,
                              color: "text.disabled",
                            }}
                          >
                            12kb
                          </Tiny>
                        </Box>
                      </FlexBox>
                    </Grid>
                  </Grid>

                  <Tiny
                    mt={1}
                    display="block"
                    color="text.disabled"
                    fontWeight={500}
                  >
                    Now
                  </Tiny>
                </TimelineContent>
              </StyledTimelineItem>
            ))}
          </Timeline>
        </ScrollBar>

        <Box p={2}>
          <Button
            fullWidth
            variant="outlined"
            sx={{ fontSize: 12, fontWeight: 400 }}
          >
            View all
          </Button>
        </Box>
      </Drawer>
    </Fragment>
  );
};

export default ActivityPopover;
