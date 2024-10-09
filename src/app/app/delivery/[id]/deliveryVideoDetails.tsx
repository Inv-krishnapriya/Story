"use client";

import { Box, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import PlayerControls from "./playerControls";
import screenfull from "screenfull";
import MonitorDeliveryDetails from "./monitorDeliveryDetails";
import { researchService } from "@/common/apiUrls";
import { useSelector } from "react-redux";
import { accessTokenSelector } from "@/stores/global/selector";
import { useParams } from "next/navigation";
import { IVideo } from "../interface";

const DeliveryVideoDetails = ({ data }: { data: IVideo }) => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const videoRef = useRef(null);
  const videoContainerRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const tokenSelector = useSelector(accessTokenSelector);
  const [url, setUrl] = useState<string>("");
  const [monitorScreeningData, setMonitorScreeningData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (screenfull.isEnabled) {
    screenfull.on("change", () => {
      setIsFullscreen(screenfull.isFullscreen);
    });
  }



  const config = {
    file: {
      hlsOptions: {
        forceHLS: false,
        debug: false,
        xhrSetup: function (xhr: any, url: any) {
          if (url.includes(process.env.NEXT_PUBLIC_API_ENDPOINT)) {
            xhr.setRequestHeader("Authorization", `Bearer ${tokenSelector}`);
          }
        },
      },
    },
  };

  useEffect(() => {
    if (data?.monitorId) {
      setPlaying(false)
      // setMuted(true)
      const videoUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT}customers/researches/delivery/${id}/download?key=${data?.recordingLink}`;
      setUrl(videoUrl);
      console.log(data);
      const screeningId = data.screeningId;
      getMonitorScreeningDetails( screeningId);
    }
  }, [data]);

  const getMonitorScreeningDetails = async (
    screeningId: string
  ) => {
    setLoading(true);
    if (screeningId){

      const queryParams ={
        screeningId: screeningId,
        monitorId : data?.monitorId
      } 
  
      await researchService
        .getMonitorScreeningDetails(id, queryParams)
        .then((res:any) => {
          setLoading(false);
          console.log(res.data);
          setMonitorScreeningData(res.data.data);
        })
        .catch((error:any) => {
          console.log(error);
        });
    }
    else{
      setLoading(false);

    }
  };

  const fullScreenToggle = () => {
    if (videoContainerRef.current) {
      screenfull.toggle(videoContainerRef.current);
    }
  };
  const onPlayerEnded = () => {
    setPlaying(false);
    // setPlayedSeconds(0)
    setTimeout(() => {
      setPlayedSeconds(0);
    }, 1000);
  };

  return (
    <Box
      bgcolor={theme.mint.color.background.containerBg.layer1}
      borderRadius={theme.mint.cornerRadius.s}
      padding={theme.mint.spacing.s}
      width={"100%"}
    >
      <Box height={isFullscreen ? "100%" : "384px"} id = "video-player-container">
        <Box position={"relative"} ref={videoContainerRef} id = "video-player">
          
            <ReactPlayer
              className="react-player"
              ref={videoRef}
              onEnded={onPlayerEnded}
              key = {url}
              url={url}
              config={config}
              onProgress={({ playedSeconds }) =>
                setPlayedSeconds(playedSeconds)
              }
              muted={muted}
              onDuration={setDurationSeconds}
              width="100%"
              // controls={true}
              // height={"100%"}
              height={isFullscreen ? "93%" : "384px"}
              playing={playing}
            />
          
          <PlayerControls
            playing={playing}
            setPlaying={setPlaying}
            setMuted={setMuted}
            muted={muted}
            playedSeconds={playedSeconds}
            duration={durationSeconds}
            ref={videoRef}
            isFullScreen={isFullscreen}
            fullScreenToggle={fullScreenToggle}
          />
        </Box>
      </Box>
      {data && (
        <MonitorDeliveryDetails
          loading={loading}
          campaignData={data}
          monitorScreeningDetails={monitorScreeningData}
        />
      )}
    </Box>
  );
};

export default DeliveryVideoDetails;
