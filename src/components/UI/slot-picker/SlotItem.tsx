import { MintTooltip, MintTypography } from "@/design-system";
import { Box, Stack, useTheme } from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import SlotTimeColumn from "./SlotTimeColumn";

function SlotItem({
  dayNameJapanese,
  dayNumber,
  timeResult,
  calculateEndTime,
  index,
  slotDuration,
  checkEven,
  activeSlots,
  date,
  onSetActiveSlot,
  elRefs,
  futureDatesArray,
  onRemoveActiveSlot,
}: {
  dayNameJapanese: string;
  dayNumber: string;
  timeResult: string[];
  calculateEndTime: (startTime: string, appendTime: number) => string;
  index: number;
  slotDuration: number;
  checkEven: (value: number) => boolean;
  activeSlots: {
    scheduledDate: string;
    startTime: string;
    endTime: string;
    id?: string;
  }[];
  date: string;
  onRemoveActiveSlot: (
    date: string,
    startTime: string,
    endTime: string
  ) => void;
  onSetActiveSlot: (date: string, startTime: string, endTime: string) => void;
  elRefs: any;
  futureDatesArray: string[];
}) {
  const theme = useTheme();
  const [selectedSlot, setSelectedSlot] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });
  const timeColumnRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (selectedSlot.date && selectedSlot.startTime && selectedSlot.endTime) {
      onSetActiveSlot(
        selectedSlot.date,
        selectedSlot.startTime,
        selectedSlot.endTime
      );
      setSelectedSlot({
        date: "",
        startTime: "",
        endTime: "",
      });
    }
  }, [selectedSlot]);

  const slotHeight: any = {
    60: "54px",
    30: "27px",
    90: "81px",
    120: "108px",
  };
  let totalLineLength = useMemo(
    () => 59 * futureDatesArray.length,
    [futureDatesArray]
  );
  const optimizedIndex = useMemo(() => index, [index]);
  const optimizedOnSetActiveSlot = useCallback(
    (date: string, startTime: string, endTime: string) => {
      setSelectedSlot({
        date,
        startTime,
        endTime,
      });
      //
    },
    []
  );
  const optimizedCheckEven = useCallback(
    (value: number) => checkEven(value),
    []
  );

  return (
    <Stack
      sx={{
        width: "59px",
        minWidth: "59px",
      }}
    >
      <Stack height={"47px"}>
        <MintTypography
          size="caption"
          weight="400"
          lineHeight={"150%"}
          color={theme.mint.color.text.low}
        >
          {dayNameJapanese}
        </MintTypography>
        <MintTypography
          size="head-xs"
          weight="700"
          lineHeight={"150%"}
          color={theme.mint.color.text.medium}
        >
          {dayNumber}
        </MintTypography>
      </Stack>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: "1 0 0",
          alignSelf: "stretch",
          position: "relative",
        }}
        ref={timeColumnRef}
        id={`slotColum-${index}`}
      >
        {activeSlots?.map((slot, activeIndex) => {
          const dateIndex = futureDatesArray.findIndex(
            (value) => value === slot.scheduledDate
          );
          const timeIndex = timeResult?.findIndex(
            (value) => value === slot.startTime
          );
          const activeSlotId = `${dateIndex}-${timeIndex}`;

          if (dateIndex === index) {
            const parentElement = document.getElementById(`slotColum-${index}`);
            const childElement = document.getElementById(activeSlotId);

            // Get the bounding rectangles of both elements
            if (parentElement && childElement) {
              const parentRect = parentElement.getBoundingClientRect();
              const childRect = childElement.getBoundingClientRect();

              // Calculate the vertical space between child and parent
              const verticalSpace = childRect.top - parentRect.top;
              return (
                <Box
                  sx={{
                    height: slotHeight[slotDuration] ?? 0,
                    width: "100%",
                    position: "absolute",
                    top: `${verticalSpace}px`,
                    zIndex: 101,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    onRemoveActiveSlot(date, slot.startTime, slot?.endTime);
                  }}
                  data-testid={`active-slot-${activeIndex}`}
                >
                  <Box
                    sx={{
                      borderRadius: "4px",
                      border: "1px solid #162987",
                      background: "rgba(16, 78, 232, 0.11)",
                      height: "97%",
                      width: "97%",
                    }}
                  ></Box>
                </Box>
              );
            }
          }
        })}
        <SlotTimeColumn
          timeResult={timeResult}
          index={optimizedIndex}
          calculateEndTime={calculateEndTime}
          slotDuration={slotDuration}
          checkEven={optimizedCheckEven}
          date={date}
          elRefs={elRefs}
          onSetActiveSlot={optimizedOnSetActiveSlot}
          totalLineLength={totalLineLength}
          futureDatesArray={futureDatesArray}
        />
      </Stack>
    </Stack>
  );
}

export default React.memo(SlotItem);
