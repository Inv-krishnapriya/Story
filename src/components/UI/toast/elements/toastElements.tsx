import { Box, Stack, Typography } from "@mui/material";

const SuccessToastElement = ({ message }: { message: string }) => {
  return (
    <Stack direction={"row"} gap={1}>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M9.59212 15.9952L18.5824 6.99707L19.9961 8.41205L11.0051 17.411C10.2242 18.1925 8.95813 18.1924 8.17739 17.4107L3.99609 13.2242L5.40983 11.8092L9.59212 15.9952Z"
            fill="white"
          />
        </svg>
      </span>
      <Typography>{message}</Typography>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M11.1806 9.99964L16.6683 15.4852L15.4905 16.6655L10.0013 11.1785L4.51124 16.6663L3.3335 15.486L8.822 9.99964L3.33357 4.51337L4.51131 3.33301L10.0013 8.82082L15.4904 3.33382L16.6682 4.51419L11.1806 9.99964Z"
            fill="white"
          />
        </svg>
      </span>
    </Stack>
  );
};

const ErrorToastElement = ({ message }: { message: string }) => {
  return (
    <Stack direction={"row"} gap={1}>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M9.59212 15.9952L18.5824 6.99707L19.9961 8.41205L11.0051 17.411C10.2242 18.1925 8.95813 18.1924 8.17739 17.4107L3.99609 13.2242L5.40983 11.8092L9.59212 15.9952Z"
            fill="white"
          />
        </svg>
      </span>
      <Typography>{message}</Typography>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M11.1806 9.99964L16.6683 15.4852L15.4905 16.6655L10.0013 11.1785L4.51124 16.6663L3.3335 15.486L8.822 9.99964L3.33357 4.51337L4.51131 3.33301L10.0013 8.82082L15.4904 3.33382L16.6682 4.51419L11.1806 9.99964Z"
            fill="white"
          />
        </svg>
      </span>
    </Stack>
  );
};

const InfoToastElement = ({ message }: { message: string }) => {
  return (
    <Stack direction={"row"} gap={1}>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M9.59212 15.9952L18.5824 6.99707L19.9961 8.41205L11.0051 17.411C10.2242 18.1925 8.95813 18.1924 8.17739 17.4107L3.99609 13.2242L5.40983 11.8092L9.59212 15.9952Z"
            fill="white"
          />
        </svg>
      </span>
      <Typography>{message}</Typography>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M11.1806 9.99964L16.6683 15.4852L15.4905 16.6655L10.0013 11.1785L4.51124 16.6663L3.3335 15.486L8.822 9.99964L3.33357 4.51337L4.51131 3.33301L10.0013 8.82082L15.4904 3.33382L16.6682 4.51419L11.1806 9.99964Z"
            fill="white"
          />
        </svg>
      </span>
    </Stack>
  );
};

export { ErrorToastElement, SuccessToastElement, InfoToastElement };
