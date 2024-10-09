"use client;";

import {
  VolumeIcon,
  PlayIcon,
  FullScreenExitOutlinedIcon,
  MintIconButton,
  VolumeOffIcon,
  PauseIcon,
  FullScreenIcon,
} from "@/design-system";

import { Box, Slider, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

const PlayerControls = React.forwardRef((props: any, ref: any) => {
  const theme = useTheme();
  const videRef = ref.current;
  const [playedSecond, setPlayedSecond] = useState(props.playedSeconds);

  useEffect(() => {
    setPlayedSecond(props.playedSeconds);
  }, [props.playedSeconds]);

  const seek = (e: any) => {
    videRef.seekTo(+e.target.value, "seconds");
    setPlayedSecond(+e.target.value);
  };
  const handleVideo = () => {
    props.setPlaying(!props.playing);
  };

  const handleAudio = () => {
    props.setMuted(!props.muted);
  };
  const handleFullScreen = () => {
    props.fullScreenToggle();
  };

  return (
    <React.Fragment>
      {!props.isFullScreen ? (
        <Box
          display={"flex"}
          position={"absolute"}
          flexDirection={"column"}
          bottom={"-19px"}
          width={"100%"}
        >
          <Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              px={theme.mint.spacing.xxs}
            >
              <Box display={"flex"} gap={theme.mint.spacing.s}>
                <MintIconButton onClick={handleVideo} sx={{ padding: 0 }} id="play-pause-button">
                  {props.playing ? (
                    <PauseIcon
                      color={theme.mint.color.background.containerBg.layer1}
                    />
                  ) : (
                    <PlayIcon
                      color={theme.mint.color.background.containerBg.layer1}
                    />
                  )}
                </MintIconButton>
                <MintIconButton onClick={handleAudio} sx={{ padding: 0 }} id="volume-button">
                  {props.muted ? (
                    <VolumeOffIcon
                      color={theme.mint.color.background.containerBg.layer1}
                    />
                  ) : (
                    <VolumeIcon
                      color={theme.mint.color.background.containerBg.layer1}
                    />
                  )}
                </MintIconButton>
              </Box>
              <Box>
                <MintIconButton data-testid = "make-fullscreen" id="full-screen-button" onClick={handleFullScreen} sx={{ padding: 0 }}>
                  <FullScreenIcon
                    color={theme.mint.color.background.containerBg.layer1}
                  />
                </MintIconButton>
              </Box>
            </Box>
            <Box id = "slider-container">
              <Slider
                id="slider-track"
                size="small"
                sx={{
                  "& .MuiSlider-thumb": {
                    backgroundColor: theme.mint.color.pallet.redBrilliant400,
                  },
                  "& .MuiSlider-track": {
                    backgroundColor: theme.mint.color.pallet.redBrilliant400,
                    color: theme.mint.color.pallet.redBrilliant400,
                  },
                  "& .MuiSlider-rail": {
                    backgroundColor:
                      theme.mint.color.background.containerBg.layer1,
                  },
                }}
                value={playedSecond}
                min={0}
                max={props.duration}
                onChange={(e) => seek(e)}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          display={"flex"}
          py={theme.mint.spacing.s}
          px={theme.mint.spacing.m}
          bgcolor={"black"}
          gap={theme.mint.spacing.s}
        >
          <MintIconButton onClick={handleVideo} sx={{ padding: 0 }}>
            {props.playing ? (
              <PauseIcon
                color={theme.mint.color.background.containerBg.layer1}
              />
            ) : (
              <PlayIcon
                color={theme.mint.color.background.containerBg.layer1}
              />
            )}
          </MintIconButton>
          <MintIconButton onClick={handleAudio} sx={{ padding: 0 }}>
            {props.muted ? (
              <VolumeOffIcon
                color={theme.mint.color.background.containerBg.layer1}
              />
            ) : (
              <VolumeIcon
                color={theme.mint.color.background.containerBg.layer1}
              />
            )}
          </MintIconButton>
          <Slider
            size="small"
            sx={{
              "& .MuiSlider-thumb": {
                backgroundColor: theme.mint.color.pallet.redBrilliant400,
                "&:hover": {
                  boxShadow: "none",
                },
              },
              "& .MuiSlider-track": {
                backgroundColor: theme.mint.color.pallet.redBrilliant400,
                color: theme.mint.color.pallet.redBrilliant400,
              },
              "& .MuiSlider-rail": {
                backgroundColor: theme.mint.color.background.containerBg.layer1,
              },
            }}
            value={playedSecond}
            min={0}
            max={props.duration}
            onChange={(e) => seek(e)}
          />
          <MintIconButton onClick={handleFullScreen} data-testid = "make-fullscreen" sx={{ padding: 0 }}>
            <FullScreenExitOutlinedIcon
              color={theme.mint.color.background.containerBg.layer1}
            />
          </MintIconButton>
        </Box>
      )}
    </React.Fragment>
  );
});

export default PlayerControls;
