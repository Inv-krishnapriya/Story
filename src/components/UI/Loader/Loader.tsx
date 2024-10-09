"use client";
import { useEffect } from "react";
import { Typography } from "@mui/material";

const LoadingOverlay = () => {
  useEffect(() => {
    // Disable scrolling when the loading overlay is active
    document.body.style.overflow = "hidden";

    return () => {
      // Enable scrolling when the component is unmounted
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <Typography
      component={"div"}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: (theme) => theme.zIndex.modal + 1,
        "& svg": {
          width: "5.25em",
          transformOrigin: "center",
          animation: "rotate4 2s linear infinite",
        },
        "& circle": {
          fill: "none",
          stroke: "hsl(214, 97%, 59%)",
          strokeWidth: 3,
          strokeDasharray: "1, 200",
          strokeDashoffset: 0,
          strokeLinecap: "round",
          animation: "dash4 1.5s ease-in-out infinite",
        },
        "@keyframes rotate4": {
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        "@keyframes dash4": {
          "0%": {
            strokeDasharray: "1, 200",
            strokeDashoffset: 0,
          },
          "50%": {
            strokeDasharray: "90, 200",
            strokeDashoffset: "-35px",
          },
          "100%": {
            strokeDashoffset: "-125px",
          },
        },
      }}
    >
      <svg viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </Typography>
  );
};

export default LoadingOverlay;
