import { Box, Stack, useTheme } from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./slotpicker.css";
import moment from "moment";
import "moment/locale/ja";
import DoubleScrollbar from "@/components/UI/scrollbar/DoubleScrollbar";
import TimeItem from "./TimeItem";
import SlotItem from "./SlotItem";
import { useDragSelect } from "./drag/DragProvider";
import { MintTooltip } from "@/design-system";
import { useTranslation } from "react-i18next";

interface ActiveSlot {
  scheduledDate: string;
  startTime: string;
  endTime: string;
}
interface TimeSlot {
  startTime: string;
  endTime: string;
}
export interface ITimeSlotPicker {
  minDate: string;
  maxDate: string;
  slotDuration: number;
  eventsSlots: { scheduledDate: string; startTime: string; endTime: string }[];
  maxSlots: number;
  handleSlotChange: (data: any) => void;
  handleResetAll: (data: any) => void;
  targetRef: any;
}

function TimeSlotContainer(props: ITimeSlotPicker) {
  const {
    minDate,
    maxDate,
    slotDuration,
    eventsSlots,
    maxSlots,
    handleSlotChange,
    handleResetAll,
    targetRef,
  } = props;
  const theme = useTheme();
  const [hasScrollBar, setScrollBar] = useState<boolean>(false);
  const [hasInArrowClick, setHasInArrowClick] = useState<boolean>(false);
  const [activeSlots, setActiveSlot] = useState<
    { scheduledDate: string; startTime: string; endTime: string }[]
  >([]);
  const { t } = useTranslation();
  const slotStartingTime = "08:00";
  const slotEndingTime = "22:00";
  const slotInterval = 30;
  const optimizedSlots = useMemo(() => activeSlots, [activeSlots]);
  useEffect(() => {
    if (eventsSlots?.length > 0 && activeSlots?.length === 0) {
      setActiveSlot(eventsSlots);
    }
    if (eventsSlots?.length === 0) {
      setActiveSlot([]);
    }
  }, [eventsSlots]);

  const onSetActiveSlot = useCallback(
    (date: string, startTime: string, endTime: string) => {
      const isAlreadyActiveSlot = activeSlots?.some((slot) => {
        return slot.startTime === startTime && slot.scheduledDate === date;
      });

      const selectedDateTimeStart = moment(
        `${date} ${startTime}`,
        "DD-MM-YYYY HH:mm"
      );
      const selectedDateTimeEnd = moment(
        `${date} ${endTime}`,
        "DD-MM-YYYY HH:mm"
      );

      // Check for overlapping time slots
      const overlappingSlot = activeSlots?.find((slot) => {
        const slotStartTime = moment(
          `${slot.scheduledDate} ${slot.startTime}`,
          "DD-MM-YYYY HH:mm"
        );
        const slotEndTime = moment(
          `${slot.scheduledDate} ${slot.endTime}`,
          "DD-MM-YYYY HH:mm"
        );

        return (
          selectedDateTimeStart.isBetween(slotStartTime, slotEndTime) ||
          selectedDateTimeEnd.isBetween(slotStartTime, slotEndTime) ||
          slotStartTime.isBetween(selectedDateTimeStart, selectedDateTimeEnd) ||
          slotEndTime.isBetween(selectedDateTimeStart, selectedDateTimeEnd)
        );
      });

      if (
        activeSlots?.length < maxSlots &&
        !isAlreadyActiveSlot &&
        !overlappingSlot
      ) {
        setActiveSlot((prev) => [
          ...prev,
          {
            scheduledDate: date,
            startTime: startTime,
            endTime: endTime,
          },
        ]);
        handleSlotChange({
          scheduledDate: date,
          start: startTime,
          end: endTime,
        });
      }
    },
    [activeSlots, maxSlots]
  );
  const onRemoveActiveSlot = (
    date: string,
    startTime: string,
    endTime: string
  ) => {
    const isAlreadyActiveSlot = activeSlots?.some((slot) => {
      return (
        slot.startTime === startTime &&
        slot.endTime === endTime &&
        slot.scheduledDate === date
      );
    });

    if (isAlreadyActiveSlot) {
      const updateData: ActiveSlot[] = removeActiveSlot(
        date,
        startTime,
        endTime,
        activeSlots
      );

      setActiveSlot(updateData);
      handleResetAll(updateData);
    }
  };
  const [slotReady, setSlotReady] = useState({
    dsReady: false,
    childReady: false,
  });
  const ds = useDragSelect();
  const elRefs = useRef<any>([]);

  // useEffect(() => {
  //   if (ds && slotReady.dsReady) {
  //     ds?.setSettings({
  //       area: targetRef?.current,
  //       draggability: false,

  //       // selectables: elRefs?.current,
  //     });
  //   }
  // }, [ds, minDate, maxDate, slotDuration, slotReady.dsReady]);
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    let timeoutId: NodeJS.Timeout | null = null;
    let childId: NodeJS.Timeout | null = null;

    const handleInterval = () => {
      if (ds) {
        ds?.setSettings({
          area: targetRef?.current,
          draggability: false,
          // selectables: elRefs?.current,
        });
      }
    };

    if (intervalId) clearInterval(intervalId);
    if (timeoutId) clearTimeout(timeoutId);
    if (childId) clearTimeout(childId);

    intervalId = setInterval(handleInterval, 300);

    timeoutId = setTimeout(() => {
      if (intervalId) clearInterval(intervalId); // Clear the interval after 3 seconds
    }, 6000);
    childId = setTimeout(() => {
      if (childId) clearInterval(childId); // Clear the interval after 3 seconds
      setSlotReady((prev) => ({
        ...prev,
        childReady: true,
      }));
    }, 100);

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
      if (childId) clearTimeout(childId);
    };
  }, [ds, targetRef, minDate, maxDate, slotDuration]);
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const handleInterval = () => {
      const element = elRefs?.current as unknown as HTMLElement;
      if (!element || !ds) return;
      if (slotReady.childReady) {
        ds.addSelectables(element);
      }
    };

    if (intervalId) clearInterval(intervalId);
    if (timeoutId) clearTimeout(timeoutId);
    if (slotReady.childReady) {
      intervalId = setInterval(handleInterval, 300);

      timeoutId = setTimeout(() => {
        if (intervalId) clearInterval(intervalId); // Clear the interval after 3 seconds
        setSlotReady((prev) => ({
          ...prev,
          childReady: true,
        }));
      }, 3000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [ds, slotReady.childReady, minDate, maxDate, slotDuration]);

  // subscribing to a callback
  useEffect(() => {
    const id = ds?.subscribe("DS:end", handleDragSelect);
    return () => (ds as any)?.unsubscribe("DS:end", null, id);
  });

  function handleDragSelect(e: any) {
    if (!hasInArrowClick) {
      const selectedElements = e?.items ?? [];

      const formattedData = selectedElements.reduce(
        (result: any[], element: any) => {
          const [dateIndex, timeIndex] = element.id.split("-");
          const selectedDate = futureDatesArray[parseInt(dateIndex)];
          const selectedTime = timeResult[parseInt(timeIndex)];

          const existingEntry = result.find(
            (entry) => entry.date === selectedDate
          );

          if (existingEntry) {
            // If the date already exists, add the time to its times array
            existingEntry.times.push(selectedTime);
          } else {
            // If the date doesn't exist, create a new entry
            result.push({
              date: selectedDate,
              times: [selectedTime],
            });
          }
          return result;
        },
        []
      );
      // Sort the times within each date
      const sortedTimeData = formattedData?.map((entry: any) => {
        return {
          date: entry?.date,
          times: entry?.times?.sort(),
        };
      });
      const formattedDurationData = sortedTimeData?.map((entry: any) => {
        const times = generateTimeSlots(
          entry?.times[0],
          entry?.times[entry.times?.length - 1],
          slotDuration
        );

        const groupedTimes = generateDragTimeSlots(
          times[0],
          times[times?.length - 1],
          slotDuration,
          times?.length
        );
        return {
          ...entry,
          times: groupedTimes,
        };
      });

      const newSlotState = formattedDurationData
        ?.map((item: any) => {
          const data =
            item?.times?.map((time: any) => {
              const activeSlot = activeSlots?.some((slot) => {
                return (
                  slot.startTime === time?.startTime &&
                  slot.scheduledDate === item?.date
                );
              });

              if (activeSlots?.length < maxSlots && !activeSlot) {
                return {
                  scheduledDate: item?.date,
                  startTime: time?.startTime,
                  endTime: time?.endTime,
                };
              }
            }) ?? [];
          return data;
        })
        .flat()
        .filter(Boolean);

      const updatedData = checkAndUpdateData(activeSlots, newSlotState);

      const availableSlots = maxSlots - activeSlots?.length;
      if (updatedData?.length < maxSlots) {
        handleResetAll([...updatedData]);
        setActiveSlot((prev) => [...updatedData]);
      } else if (availableSlots > 0) {
        const filteredData = updatedData?.slice(0, maxSlots);
        handleResetAll([...filteredData]);
        setActiveSlot((prev) => [...filteredData]);
      }
    }
  }

  const getDatesInRange = useCallback((startDate: string, endDate: string) => {
    const start = moment(startDate).startOf("day");
    const end = moment(endDate).startOf("day");
    const dateArray = [];

    let currentDate = start.clone();

    while (currentDate.isSameOrBefore(end)) {
      dateArray.push(currentDate.format("DD-MM-YYYY"));
      currentDate.add(1, "day");
    }

    return dateArray;
  }, []);
  const generateTimeSlots = useCallback(
    (startTime: string, endTime: string, gap: number): string[] => {
      const timeSlots: string[] = [];

      // Get current date
      const currentDate = new Date();

      // Set start time with current date
      const startDate = new Date(currentDate.toDateString() + " " + startTime);
      const endDate = new Date(currentDate.toDateString() + " " + endTime);

      // Loop through time slots
      while (startDate <= endDate) {
        // Format current time and push to array
        const hours = startDate.getHours().toString().padStart(2, "0");
        const minutes = startDate.getMinutes().toString().padStart(2, "0");
        const formattedTime = `${hours}:${minutes}`;
        timeSlots.push(formattedTime);

        // Increment time by the specified gap
        startDate.setMinutes(startDate.getMinutes() + gap);
      }

      return timeSlots;
    },
    []
  );
  function checkEven(number: number): boolean {
    return number % 2 === 0;
  }
  const isTimeOverlap = <T extends ActiveSlot>(slot1: T, slot2: T): boolean => {
    return (
      slot1.scheduledDate === slot2.scheduledDate &&
      slot1.startTime < slot2.endTime &&
      slot1.endTime > slot2.startTime
    );
  };

  const checkAndUpdateData = <T extends ActiveSlot>(
    existingData: T[],
    newData: T[]
  ): T[] => {
    const updatedData: T[] = [...existingData];

    newData.forEach((newSlot) => {
      const isOverlap = existingData?.some((existingSlot) =>
        isTimeOverlap(existingSlot, newSlot)
      );
      if (!isOverlap) {
        updatedData.push(newSlot);
      }
    });

    return updatedData;
  };
  const calculateEndTime = useCallback(
    (startTime: string, appendTime: number): string => {
      const [startHours, startMinutes] = startTime.split(":").map(Number);

      // Create a Date object with the current date and the provided start time
      const startDate = new Date();
      startDate.setHours(startHours, startMinutes, 0, 0);

      // Add the specified duration (in minutes) to the start time
      const endTime = new Date(startDate.getTime() + appendTime * 60000);

      // Format the result as "HH:mm"
      const endHours = endTime.getHours().toString().padStart(2, "0");
      const endMinutes = endTime.getMinutes().toString().padStart(2, "0");

      return `${endHours}:${endMinutes}`;
    },
    []
  );
  const generateDragTimeSlots = useCallback(
    (
      startPoint: string,
      endPoint: string,
      timeGap: number,
      length: number
    ): TimeSlot[] => {
      const startTime = new Date(`2000-01-01 ${startPoint}`);
      let endTime = new Date(`2000-01-01 ${endPoint}`);
      const maxEndTime = new Date(`2000-01-01 ${slotEndingTime}`);
      const timeSlots: TimeSlot[] = [];

      // If startPoint and endPoint are equal, add timeGap to endTime

      const updatedEnd = new Date(endTime.getTime() + timeGap * 60000);
      const isNotOverlapped = updatedEnd <= maxEndTime;
      if (
        (startPoint === endPoint && isNotOverlapped) ||
        (length > 1 && isNotOverlapped)
      ) {
        endTime = updatedEnd; // Convert timeGap from minutes to milliseconds
      }
      while (startTime < endTime) {
        const formattedStartTime = startTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        startTime.setMinutes(startTime.getMinutes() + timeGap);

        const formattedEndTime = startTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        timeSlots.push({
          startTime: formattedStartTime,
          endTime: formattedEndTime,
        });
      }

      return timeSlots;
    },
    []
  );

  function removeActiveSlot(
    date: string,
    startTime: string,
    endTime: string,
    activeSlot: ActiveSlot[]
  ): ActiveSlot[] {
    const filteredSlots = activeSlot.filter((slot) => {
      return !(
        slot.scheduledDate === date &&
        slot.startTime === startTime &&
        slot.endTime === endTime
      );
    });
    return filteredSlots;
  }

  const timeResult: string[] = useMemo(
    () => generateTimeSlots(slotStartingTime, slotEndingTime, slotInterval),
    []
  );

  const futureDatesArray: string[] = useMemo(
    () => getDatesInRange(minDate, maxDate),
    [minDate, maxDate]
  );
  const [randomID, setRandomID] = useState(String(Math.random()));
  return (
    <Box
      display={"flex"}
      // sx={{
      //   maxHeight: "500px",
      //   overflow: "auto",
      // }}
      sx={{
        "&.ds-selector": {
          backgroundColor: "yellow",
        },
      }}
    >
      <Stack
        mt={hasScrollBar ? "60px" : "56px"}
        gap={"8px"}
        className="time-section"
      >
        {timeResult?.map((timeData, index) => {
          const isEven = checkEven(index + 1);
          const isLast = timeResult?.length - 1 === index;
          return (
            <TimeItem
              isEven={isEven}
              isLast={isLast}
              timeData={timeData}
              key={index}
            />
          );
        })}
      </Stack>

      <Box width={"100%"} ref={targetRef}>
        <DoubleScrollbar
          outerStyle={{
            width: 0,
            minWidth: "100%",
          }}
          enableScrollRight
          scrollRightDivStyle={{
            top: "8px",
          }}
          setScrollBarStatus={(value) => {
            setScrollBar(value);
          }}
          setHasInArrowClick={setHasInArrowClick}
        >
          <MintTooltip
            title={
              <>
                {t("time-slot-picker.tooltip.1")}
                <br></br>
                {t("time-slot-picker.tooltip.2")}
              </>
            }
            key={randomID}
            placement="top"
            PopperProps={{ disablePortal: true }}
          >
            <Box
              sx={{
                display: "flex",
                position: "relative",
                overflow: "auto",
                paddingLeft: "10px",
                paddingY: "13px",
                paddingRight: "35px",
                width: "fit-content",
              }}
            >
              {futureDatesArray?.map((date, index) => {
                const formatDate = moment(date, "DD-MM-YYYY").locale("ja");
                const dayNumber = formatDate.format("D");
                const dayNameJapanese = formatDate.format("ddd");

                return (
                  <SlotItem
                    dayNameJapanese={dayNameJapanese}
                    dayNumber={dayNumber}
                    timeResult={timeResult}
                    calculateEndTime={calculateEndTime}
                    index={index}
                    slotDuration={slotDuration}
                    checkEven={checkEven}
                    activeSlots={optimizedSlots}
                    date={date}
                    futureDatesArray={futureDatesArray}
                    onSetActiveSlot={onSetActiveSlot}
                    onRemoveActiveSlot={onRemoveActiveSlot}
                    elRefs={elRefs}
                    key={index}
                  />
                );
              })}
            </Box>
          </MintTooltip>
        </DoubleScrollbar>
      </Box>
    </Box>
  );
}

export default React.memo(TimeSlotContainer);
