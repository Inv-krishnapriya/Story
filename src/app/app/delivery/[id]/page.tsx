"use client";

import { ChevronLeftOutlinedIcon, MintTypography } from "@/design-system";
import { Box, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CampaignDetails from "./campaignDetails";
import DeliveryVIdeoList from "./deliveryVIdeoList";
import DeliveryVideoDetails from "./deliveryVideoDetails";
import { useParams, useRouter } from "next/navigation";
import { videoChatService } from "@/common/apiUrls";
import { IDeliveryDetails, IVideo } from "../interface";
import LoadingOverlay from "@/components/UI/Loader/Loader";


const DeliveryDetailsPage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const params = useParams<{ id: string }>();
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<any>("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IDeliveryDetails>({
    videos: [],
  });
  const router = useRouter();
  const goToDeliveyPage = () => {
    router.push("/app/delivery");
  };

  useEffect(() => {
    getDeliveryDetails();
  }, []);

  const getDeliveryDetails = async () => {
    await videoChatService
      .getDeliveryDetails(params.id)
      .then((res) => {
        setData(res.data.data);
        setLoading(false)
        console.log("ds",res.data.data);
      })
      .catch((error) => {
        setLoading(false)
      });
  };

  useEffect(() => {
    if (data?.videos?.length > 0 && !selectedVideo) {
      setSelectedVideoId(data.videos[0]?.recordingId);
      setSelectedVideo(data.videos[0]);
    }
  }, [data]);

  useEffect(() => {
    const res = data.videos.find(
      (res: IVideo) => res.recordingId == selectedVideoId
    );
    setSelectedVideo(res);
  }, [selectedVideoId]);

  const selectVideo = (id: any) => {
    console.log(id);
    setSelectedVideoId(id);
  };
  return (
    <Box>
      <Box display={"flex"} alignItems={"center"} gap={theme.mint.spacing.x3s}>
        <ChevronLeftOutlinedIcon color={theme.mint.color.text.link} size={16} />
        <MintTypography
          id = "delivery-details-back"
          size="body"
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
          color={theme.mint.color.text.link}
          onClick={() => goToDeliveyPage()}
        >
          インタビュー動画一覧に戻る
        </MintTypography>
      </Box>
      {loading ? (
        <LoadingOverlay />
      ) : (
        <Box>
          <CampaignDetails data={data?.basics} />
          <Box
            display={"flex"}
            width={"100%"}
            id ="delivery-container"
            gap={theme.mint.spacing.m}
            marginTop={theme.mint.spacing.s}
          >
            <DeliveryVIdeoList
              data={data?.videos}
              selectVideo={selectVideo}
              selectedVideoId={selectedVideoId}
            />
            {selectedVideo && <DeliveryVideoDetails data={selectedVideo} />}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DeliveryDetailsPage;
