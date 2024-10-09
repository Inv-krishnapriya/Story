import { IChatItem } from "@/stores/chat/interface";
import { RootState } from "@/stores/rootReducer";
import moment from "moment";
import { useSelector } from "react-redux";
import { VideoCallUserType } from "./common.data";
import { IRemoteProfile } from "@/common/types";
import AgoraRTC, {
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
} from "agora-rtc-react";
import VirtualBackgroundExtension from "agora-extension-virtual-background";
import dynamic from "next/dynamic";

export function splitAmountWithComma(amount: number, count: number) {
  return count > 0
    ? (amount * count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : 0;
}

export function removeDuplicates(arr: string[]): string[] {
  const set = Array.from(new Set(arr));
  return set;
}

export function isAuthenticated(): boolean {
  const authTokens = JSON.parse(localStorage.getItem("authTokens")!);
  if (authTokens !== null) return true;
  else return false;
}

export const generateNumberList = (limit: number, start: number = 1) => {
  let numbers: number[] = [];
  for (let i = start; i <= limit; i++) {
    numbers.push(i);
  }
  return numbers;
};

export const generateNumberListMint = (
  start: number | "",
  end: number | ""
) => {
  let numbers: { label: string; value: number }[] = [];
  for (let i = start; i <= end; i = i !== "" ? i + 200 : 0) {
    numbers.push({ label: i.toString(), value: i !== "" ? i : 0 });
  }
  return numbers;
};

// Validation function to trim a value and check if it is empty
export const trimValidate = (value: string, message: string) => {
  const trimmedValue = value?.trim(); // Trim the value
  if (!trimmedValue) {
    return message; // If trimmed value is empty or undefined, return the validation message
  }
  // You can add more validation logic here if needed
};

// Recursive function to trim all string values within an object or array
export function trimAllValues(obj: any): any {
  if (typeof obj === "string") {
    return obj.trim(); // Trim string values
  }

  if (Array.isArray(obj)) {
    return obj?.map((item) => trimAllValues(item)); // Trim string values within arrays
  }

  if (typeof obj === "object" && obj !== null) {
    const trimmedObj: any = {};
    for (let key in obj) {
      trimmedObj[key] = trimAllValues(obj[key]); // Trim string values within object properties
    }
    return trimmedObj;
  }

  return obj; // Return other types unchanged
}

interface ChatMessage {
  message: string;
  messageId: string;
  senderId: string;
  type: string;
  datetime: string;
  status: number;
  files: any[]; // You may want to replace any[] with a more specific type if you have a file structure.
}

interface ArrangedChatMessages {
  dateLabel: string;
  chat: IChatItem[];
  date: string;
}

export function arrangeChatMessagesByDate(
  chatData: IChatItem[]
): ArrangedChatMessages[] {
  const arrangedChatMessages: Record<string, ArrangedChatMessages> = {};

  chatData.forEach((chat) => {
    const formattedStartDate = moment(chat.datetime);
    const localDateTime = formattedStartDate.format(); // Format according to the system's locale

    const date = localDateTime.split("T")[0];
    const jpDate = formattedStartDate.format("MM月DD日(ddd)");

    let dateLabel = jpDate;

    // Check if the date is the current date
    const currentDate = moment().format("YYYY-MM-DD");
    if (date === currentDate) {
      dateLabel = "今日";
    }

    if (!arrangedChatMessages?.[date]) {
      arrangedChatMessages[date] = {
        dateLabel,
        chat: [],
        date: localDateTime,
      };
    }

    arrangedChatMessages?.[date]?.chat?.push(chat);
  });

  return Object.values(arrangedChatMessages);
}

export function buildFormData(data: Record<string, any>): FormData {
  const formData = new FormData();

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }

  return formData;
}

export function getAlphabetLetterByIndex<T extends number>(index: T): string {
  if (typeof index !== "number" || index < 1) {
    return "Invalid index";
  }

  if (index <= 26) {
    // Convert index to ASCII code for 'A' and subtract 1
    const charCode = "A".charCodeAt(0) + index - 1;

    // Convert ASCII code to character
    const letter = String.fromCharCode(charCode);

    return letter;
  } else {
    // Calculate the quotient and remainder when dividing by 26
    const quotient = Math.floor((index - 1) / 26);
    const remainder = (index - 1) % 26;

    // Get the first letter (e.g., 'A', 'B', 'C', ...)
    const firstLetter = String.fromCharCode("A".charCodeAt(0) + quotient - 1);

    // Get the second letter (e.g., 'A', 'B', 'C', ...)
    const secondLetter = String.fromCharCode("A".charCodeAt(0) + remainder);

    // Concatenate the letters
    return `${firstLetter}${secondLetter}`;
  }
}

export function getUserName(uid: string, remoteUsersInfo: IRemoteProfile[]) {
  return remoteUsersInfo!
    ?.filter((item) => item.agoraUserId === uid)
    .map((item) => item.displayName)[0];
}

export function findUserRole(uid: string, remoteUsersInfo: IRemoteProfile[]) {
  console.log(remoteUsersInfo);

  return remoteUsersInfo!
    ?.filter((item) => item.agoraUserId === uid)
    .map((item) => item.role)[0];
}

export function isMonitorExist(
  remoteUsers: IAgoraRTCRemoteUser[],
  remoteUsersInfo: IRemoteProfile[]
) {
  console.log(remoteUsers, remoteUsersInfo);
  if (remoteUsersInfo) {
    let monitor = remoteUsersInfo!?.filter(
      (item) => item.role === VideoCallUserType.MONITOR
    );
    return remoteUsers!?.filter(
      (item) => item.uid.toString() == monitor?.[0]?.agoraUserId
    ).length > 0
      ? true
      : false;
  }
}

export const getErrorMessage = (
  errorData: any = { errorCode: {}, message: {} }
): string | undefined => {
  const { errorCode, message } = errorData;

  if (typeof message === "string" || typeof errorCode === "string")
    return message;

  const errorCodeKey = Object.keys(errorCode ?? {})[0];
  return message?.[errorCodeKey] ?? undefined;
};

export const getErrorCode = (
  errorData: any = { errorCode: {}, message: {} }
): string | undefined => {
  const { errorCode } = errorData;

  if (typeof errorCode === "string") return errorCode;

  const errorCodeKey = Object.keys(errorCode ?? {})[0];
  return errorCode?.[errorCodeKey] ?? undefined;
};

export const parseSuccessMessage = (
  message: { [key: string]: string } | string = "Success"
) => {
  return typeof message === "object"
    ? message[Object.keys(message)[0]]
    : message;
};

export const removeTextAreaEmptyLines = (str: string) =>
  str
    .split(/\r?\n/)
    .filter((line) => line.trim() !== "")
    .join("\n");
export const renderTextWithLinks = (text: string) => {
  if (!text) return "";
  // Regular expression to match URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  // Split the text by newlines
  const lines = text.split("\n");
  // Process each line and replace URLs with clickable links
  const processedLines = lines.map((line) =>
    line.replace(
      urlRegex,
      (url, index) =>
        `<a key=${index} href=${url} target="_blank" rel="noopener noreferrer">${url}</a>`
    )
  );
  // Join the processed lines with <br /> tags
  return processedLines.join("<br />");
};

export const asPixels = (value: number): string => `${value}px`;
