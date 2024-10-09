import { Box, Button, Stack, Typography } from "@mui/material";
import React, { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log({ error, errorInfo });
    // You can log the error to an error reporting service here
  }
  GoBack(): void {
    window.location.href = "/";
    // Implementation of GoBack function
  }
  Reload(): void {
    window.location.reload();
    // Implementation of GoBack function
  }
  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          height={"calc(100vh)"}
          gap={2}
          textAlign={"center"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M11 9H13V13H11V9Z" fill="red" />
            <path d="M13 15H11V17H13V15Z" fill="red" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.2701 3.04588L2.24164 18.0467C1.5284 19.3793 2.47967 21.0008 3.97472 21.0008L20.0253 21.0009C21.52 21.0009 22.4713 19.38 21.7587 18.0474L13.7366 3.04647C12.9906 1.65144 11.0166 1.65111 10.2701 3.04588ZM12.0032 4L3.97473 19.0008L20.0253 19.0009L12.0032 4Z"
              fill="red"
            />
          </svg>
          <Typography variant="h5">Whoops, Something went wrong</Typography>
          <Typography>
            Please either refresh page or return home to try again
          </Typography>
          <Box display={"flex"} gap={1}>
            <Button onClick={this.Reload} color="error">
              Try again?
            </Button>
            <Button variant="contained" onClick={this.GoBack}>
              Go Home
            </Button>
          </Box>
        </Stack>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
