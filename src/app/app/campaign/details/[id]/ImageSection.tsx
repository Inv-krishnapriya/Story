import { Box, CircularProgress } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

function ImageSection({ imageData }: { imageData: any }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      <Image
        src={imageData.fileUrl}
        alt="404"
        height={500}
        width={100}
        style={{
          width: "auto",
          borderRadius: 0,
          maxWidth: "100%",
          objectFit: "contain",
          opacity: isLoaded ? 1 : 0,
          height: "auto",
          overflow: "hidden",
          maxHeight: "88vh",
          aspectRatio: "auto",
        }}
        loading="lazy"
        unoptimized
        onLoad={() => {
          setIsLoaded(true);
        }}
      />
      {!isLoaded && (
        <Box
          width={"50vh"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          position={"absolute"}
          top={0}
          bottom={0}
        >
          <CircularProgress size={100} />
        </Box>
      )}
    </>
  );
}

export default ImageSection;
