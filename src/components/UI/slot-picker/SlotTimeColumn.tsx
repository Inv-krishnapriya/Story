import { MintTooltip } from "@/design-system";
import { Box, useTheme } from "@mui/material";
import moment from "moment";
import React from "react";

function SlotTimeColumn({
  timeResult,
  index,
  calculateEndTime,
  slotDuration,
  checkEven,
  date,
  elRefs,
  onSetActiveSlot,
  totalLineLength,
  futureDatesArray,
}: {
  timeResult: string[];
  index: number;
  calculateEndTime: (startTime: string, appendTime: number) => string;
  slotDuration: number;
  checkEven: (value: number) => boolean;
  date: string;
  elRefs: any;
  onSetActiveSlot: (date: string, startTime: string, endTime: string) => void;
  futureDatesArray: string[];
  totalLineLength: number;
}) {
  const theme = useTheme();
  const dateToCheck = moment(date, "DD-MM-YYYY");
  const currentDate = moment();
  console.log(timeResult, date, "SlotTimeColumn");

  return (
    <>
      {timeResult?.map((time, slotIndex) => {
        const dragIndex = parseInt(`${index !== 0 ? index : ""}${slotIndex}`);

        const endTime = calculateEndTime(time, slotDuration);
        const isEven = checkEven(slotIndex + 1);
        const dateTime = moment(
          `${dateToCheck.format("YYYY-MM-DD")} ${time}`,
          "YYYY-MM-DD HH:mm"
        );
        const timeExceeded = dateTime.isBefore(currentDate);
        if (timeResult?.length - 1 !== slotIndex) {
          return (
            <Box
              sx={{
                display: "flex",
                height: "24px",
                padding: "1px",
                alignItems: "center",
                gap: "8px",
                marginTop: "3px",
                alignSelf: "stretch",
                borderLeft: `1px solid ${theme.mint.color.border.lowOpacity}`,
                position: "relative",
                zIndex: `100 !important`,
                cursor: timeExceeded ? "not-allowed" : "pointer",
                transform: "none !important",
              }}
              key={slotIndex}
              onClick={() => {
                if (timeResult.includes(endTime) && !timeExceeded) {
                  onSetActiveSlot(date, time, endTime);
                }
              }}
              id={`${index}-${slotIndex}`}
              data-testid={`${index}-${slotIndex}`}
              ref={(el) => {
                if (!timeExceeded) {
                  elRefs.current = [...elRefs.current, el];
                }
              }}
            >
              {timeExceeded && (
                <Box
                  sx={{
                    backgroundColor:
                      theme.mint.color.surfaceGray.disabled.disabled,
                    height: "100%",
                    width: "100%",
                  }}
                ></Box>
              )}

              {index === 0 && (
                <Box
                  sx={{
                    position: "absolute",
                    left: "-10px",
                    top: "-9px",
                    zIndex: 1,
                  }}
                  style={{
                    pointerEvents: "none",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      height: "19px",
                      alignItems: "center",
                      gap: isEven ? "4px" : "0px",
                      flexShrink: "0",
                      alignSelf: "stretch",
                      width: `${totalLineLength}px`,
                    }}
                  >
                    {[
                      ...futureDatesArray,
                      ...futureDatesArray,
                      ...futureDatesArray,
                      ...futureDatesArray,
                    ]?.map((_, index) => (
                      <Box
                        key={index}
                        sx={{
                          height: "1px",
                          flex: "1 0 0",
                          background:
                            "var(--UI-colors-border-low-opacity, #EBECEE)",
                        }}
                      ></Box>
                    ))}

                    <Box
                      sx={{
                        height: "1px",
                        flex: "1 0 0",
                        background:
                          "var(--UI-colors-border-low-opacity, #EBECEE)",
                      }}
                    ></Box>
                  </Box>
                </Box>
              )}
              {index === 0 && timeResult?.length - 2 === slotIndex && (
                <Box
                  sx={{
                    position: "absolute",
                    left: "-10px",
                    bottom: "-9px",
                  }}
                  style={{
                    pointerEvents: "none",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      height: "19px",
                      alignItems: "center",
                      gap: isEven ? "0px" : "4px",
                      flexShrink: "0",
                      alignSelf: "stretch",
                      width: `${totalLineLength}px`,
                    }}
                  >
                    {[
                      ...futureDatesArray,
                      ...futureDatesArray,
                      ...futureDatesArray,
                      ...futureDatesArray,
                    ]?.map((_, index) => (
                      <Box
                        key={index}
                        sx={{
                          height: "1px",
                          flex: "1 0 0",
                          background:
                            "var(--UI-colors-border-low-opacity, #EBECEE)",
                        }}
                      ></Box>
                    ))}

                    <Box
                      sx={{
                        height: "1px",
                        flex: "1 0 0",
                        background:
                          "var(--UI-colors-border-low-opacity, #EBECEE)",
                      }}
                    ></Box>
                  </Box>
                </Box>
              )}
            </Box>
          );
        }
      })}
    </>
  );
}

export default React.memo(SlotTimeColumn);
