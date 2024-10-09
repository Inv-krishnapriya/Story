"use client";

import { Box, useTheme } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setLocale } from "yup";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";

import {
  MintAlert,
  MintButton,
  MintTextField,
  MintTypography,
} from "@/design-system";
import { actions as videoActions } from "@/stores/video-chat/reducer";
import { useSelector } from "react-redux";
import { checkIfLoading } from "@/stores/ui/selector";

type TLoginModalProps = {
  open: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
};

interface IFormValues {
  username: string;
  password: string;
}

function Login() {
  const { t } = useTranslation();
  const theme = useTheme();
  const searchParams = useSearchParams();
  const meetingId = searchParams.get("meetingId");
  const isRequesting = useSelector(
    checkIfLoading(videoActions.videoChatLoginRequest.type)
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const [formError, setFormError] = useState("");

  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const methods = useForm<IFormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = methods;
  console.log(isValid, "isValid");

  setLocale({
    mixed: {
      default: "field_invalid",
      required: ({ path }) =>
        t("messages.required", { field: t(`login.${path}`) }),
    },
    string: {
      max: ({ max, path }) =>
        t("messages.max-length", {
          field: t(`login.${path}`),
          max,
        }),
    },
  });

  const onSubmit = (data: IFormValues) => {
    if (meetingId) {
      let agoraIdWithoutSpaces = data.username.replace(/\s/g, "");
      const request = {
        agoraId: agoraIdWithoutSpaces,
        password: data.password,
        meetingId: meetingId,
      };
      setFormError("");
      const onSuccess = () => {
        router.push("/video-chat/app/meeting");
      };
      dispatch(
        videoActions.videoChatLoginRequest({
          request: request,
          setFormError,
          onSuccess,
          reset,
        })
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="login-form">
      <Box
        sx={{
          px: theme.mint.spacing.s,
          py: theme.mint.spacing.xxs,
        }}
      >
        <MintTypography
          size="head-l"
          weight="700"
          color={theme.mint.color.text.high}
        >
          {t("forms.interview-invitation.header")}
        </MintTypography>
      </Box>
      <Box
        p={theme.mint.spacing.s}
        bgcolor={theme.mint.color.background.containerBg.layer1}
        display={"flex"}
        flexDirection={"column"}
        gap={theme.mint.spacing.l}
        borderRadius={theme.mint.cornerRadius.xs}
        mt={theme.mint.spacing.m}
      >
        <MintTypography weight="400" size="body">
          {t("forms.interview-invitation.instruction.label")}
        </MintTypography>
        {formError && (
          <MintAlert severity="error" variant="outlined" message={formError} />
        )}

        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={theme.mint.spacing.s}
        >
          <Controller
            name={"username"}
            control={control}
            render={({ field }) => (
              <MintTextField
                label={t("forms.interview-invitation.login-id.label")}
                required
                placeholder={t(
                  "forms.interview-invitation.login-id.placeholder"
                )}
                fullWidth
                {...field}
                error={!!formError}
                inputProps={{
                  "data-testid": "login-id",
                }}
              />
            )}
          />
          <Controller
            name={"password"}
            control={control}
            render={({ field }) => (
              <MintTextField
                label={t("forms.interview-invitation.password.label")}
                required
                placeholder={t(
                  "forms.interview-invitation.password.placeholder"
                )}
                fullWidth
                type="password"
                {...field}
                error={!!formError}
                inputProps={{
                  "data-testid": "password",
                }}
              />
            )}
          />
        </Box>
        <Box>
          <MintButton
            color="primary"
            type="submit"
            disabled={!isValid || isRequesting}
            data-testid="login-submit"
          >
            {t("forms.interview-invitation.submit.label")}
          </MintButton>
        </Box>
      </Box>
    </form>
  );
}

export default Login;
