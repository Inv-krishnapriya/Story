import {
  ChevronLeftOutlinedIcon,
  ChevronRightOutlinedIcon,
  CrossOutlinedIcon,
  DownloadOutlinedIcon,
  MintIconButton,
  MintTypography,
} from "@/design-system";
import { Box, Dialog, useTheme } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

import ImageSection from "./ImageSection";

function ImagePreviewModal({
  open,
  onClose,
  data,
  handleDownloadFile,
  activeCarousalIndex,
}: {
  open: boolean;
  onClose: () => void;
  data: { fileUrl: string; fileName: string }[];
  handleDownloadFile: (fileUrl: string, fileName: string) => void;
  activeCarousalIndex: number;
}) {
  const theme = useTheme();
  const swiperRef = useRef<any>(null);
  const [swiper, setSwiper] = useState<any>(null);

  useEffect(() => {
    if (swiper && activeCarousalIndex !== 0) {
      swiper.slideTo(activeCarousalIndex);
    }
  }, [swiper, activeCarousalIndex]);

  const handlePrev = useCallback(() => {
    const currentSlider = swiperRef.current;
    if (currentSlider && "swiper" in currentSlider) {
      currentSlider.swiper.slidePrev();
    }
  }, []);

  const handleNext = useCallback(() => {
    const currentSlider = swiperRef.current;
    if (currentSlider && "swiper" in currentSlider) {
      currentSlider.swiper.slideNext();
    }
  }, [swiper]);

  const [navigationStatus, setNavigationStatus] = useState({
    disableStart: true,
    disableEnd: false,
    activeIndex: 0,
  });
  const activeFile = data[navigationStatus?.activeIndex ?? 0];
  return (
    <Dialog
      open={open}
      sx={{
        ".MuiDialog-container": {
          alignItems: "normal",
          ".MuiDialog-paper": {
            width: "100%",
            margin: 0,
            height: "100%",
            maxHeight: "100%",
            bgcolor: (theme) => theme.mint.color.pallet.blackCommon,
            maxWidth: "100%",
            color: (theme) => theme.mint.color.background.containerBg.layer1,
          },
        },
      }}
    >
      <Box
        pt={`${theme.mint.spacing.m}`}
        id="previewArea"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          height: "100%",
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"end"}
          pr={`${theme.mint.spacing.s}`}
          gap={`${theme.mint.spacing.s}`}
        >
          {activeFile?.fileUrl && activeFile?.fileName && (
            <MintIconButton
              sx={{ p: 0 }}
              disableRipple
              onClick={() => {
                handleDownloadFile(activeFile?.fileUrl, activeFile?.fileName);
              }}
            >
              <DownloadOutlinedIcon
                color={theme.mint.color.background.containerBg.layer1}
                size={20}
              />
            </MintIconButton>
          )}

          <Box onClick={onClose} sx={{ display: "flex" }}>
            <CrossOutlinedIcon
              color={theme.mint.color.background.containerBg.layer1}
              size={20}
            />
          </Box>
        </Box>
        <Box
          pt={`${theme.mint.spacing.m}px`}
          flexGrow={1}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <Box display={"flex"}>
            <Box
              display={"flex"}
              alignItems={"center"}
              onClick={handlePrev}
              width={"32px"}
              justifyContent={"center"}
              data-testid="prev-button"
            >
              {data?.length > 1 && (
                <ChevronLeftOutlinedIcon
                  color={
                    navigationStatus?.disableStart
                      ? "grey"
                      : theme.mint.color.background.containerBg.layer1
                  }
                  size={20}
                />
              )}
            </Box>
            <Box display={"contents"}>
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={(swiper) => {
                  setNavigationStatus({
                    activeIndex: swiper.activeIndex,
                    disableStart: swiper.activeIndex === 0,
                    disableEnd: swiper.activeIndex === data?.length - 1,
                  });
                }}
                modules={[Navigation, Autoplay]}
                ref={swiperRef}
                autoplay={false}
                onSwiper={setSwiper}
              >
                {data?.map((imageData, index) => {
                  return (
                    <SwiperSlide
                      key={index}
                      style={{
                        display: "flex",
                        height: "auto",
                      }}
                    >
                      <Box display={"flex"} width={"100%"}>
                        <Box
                          flexGrow={1}
                          display={"flex"}
                          justifyContent={"center"}
                          position={"relative"}
                        >
                          <ImageSection imageData={imageData} />
                        </Box>
                      </Box>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              onClick={handleNext}
              width={"32px"}
              justifyContent={"center"}
              data-testid="next-button"
            >
              {data?.length > 1 && (
                <ChevronRightOutlinedIcon
                  color={
                    navigationStatus?.disableEnd
                      ? "grey"
                      : theme.mint.color.background.containerBg.layer1
                  }
                  size={20}
                />
              )}
            </Box>
          </Box>

          {data?.length > 1 && (
            <Box
              display={"flex"}
              justifyContent={"center"}
              mt={`${theme.mint.spacing.xxs}px`}
            >
              <MintTypography size="body" weight="400" lineHeight={"150%"}>
                {navigationStatus.activeIndex + 1}/{data.length}
              </MintTypography>
            </Box>
          )}
        </Box>
        {data?.length > 1 && (
          <Box
            display={"flex"}
            justifyContent={"center"}
            mt={`${theme.mint.spacing.xxs}px`}
          >
            <MintTypography size="body" weight="400" lineHeight={"150%"}>
              {navigationStatus?.activeIndex + 1}/{data?.length}
            </MintTypography>
          </Box>
        )}
      </Box>
    </Dialog>
  );
}

export default ImagePreviewModal;
