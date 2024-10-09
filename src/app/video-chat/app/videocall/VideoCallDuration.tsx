"use client";
import React, { useEffect, useState } from "react";
import { MintTypography } from "@/design-system";
import { useTheme } from "@mui/material";
import moment from "moment";

interface ITimerProps {
  startTime: string;
  duration: number;
}
const VideoCallDuration: React.FC<ITimerProps> = React.memo(
  function Timer(props) {
    const { startTime, duration } = props;
    const theme = useTheme();

    const [elapsedTime, setElapsedTime] = useState(moment.duration(0));

    useEffect(() => {
      const interval = setInterval(() => {
        const currentTime = moment();
        const timeDifference = moment.duration(currentTime.diff(startTime));
        setElapsedTime(timeDifference);
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    const hours = elapsedTime.hours();
    const minutes = elapsedTime.minutes();
    const totalMinutes = hours * 60 + minutes;
    const seconds = elapsedTime.seconds();
    const formattedTime = `${hours > 0 ? hours + ":" : ""}${
      minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    return (
      <MintTypography
        weight="400"
        size="caption"
        color={
          totalMinutes > duration
            ? theme.mint.color.system.error.error
            : theme.mint.color.system.info.info
        }
      >
        {formattedTime}
      </MintTypography>
    );
  }
);
export default VideoCallDuration;
