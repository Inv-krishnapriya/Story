"use client";

import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Stack } from "@mui/material";
import TermsOfUseSections from "@/components/page-elements/terms/TermsOfUseSections";
import AcceptPolicyModal from "@/components/Modal/AcceptPolicyModal";
import { MintTypography } from "@/design-system";
import ConfidentialityAgreement from "@/components/page-elements/accept-app-policy/ConfidentialityAgreement";
import { useDispatch, useSelector } from "react-redux";
import { acceptPolicyRequest } from "@/stores/dashboard/reducer";
import { checkIfLoading } from "@/stores/ui/selector";
import { useRouter } from "next/navigation";
import { logoutRequest } from "@/stores/global/reducer";

const AgreePolicyPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [agreedTerms, setAgreedTerms] = useState(false);
  const isLoading = useSelector(checkIfLoading(acceptPolicyRequest.type));
  const isLoggingOut = useSelector(checkIfLoading(logoutRequest.type));
  const acceptPolicyRef = useRef<HTMLDivElement>(null);

  const onDisagree = () => {
    dispatch(logoutRequest({ router }));
  };

  const onAgree = () => {
    if (!agreedTerms) {
      setAgreedTerms(true);
      if (acceptPolicyRef.current) acceptPolicyRef.current.scrollTop = 0;
    } else {
      dispatch(
        acceptPolicyRequest({
          request: {
            terms: true,
            communication: true,
          },
          router,
        })
      );
    }
  };

  return (
    <AcceptPolicyModal
      open
      title={t(
        `accept-policy.${agreedTerms ? "communication" : "terms"}.title`
      )}
      agreeButtonName={t("accept-policy.agree")}
      disagreeButtonName={t("accept-policy.disagree")}
      onAgree={onAgree}
      onDisagree={onDisagree}
      height="672px"
      isLoading={{ agree: isLoading, disagree: isLoggingOut }}
    >
      <MintTypography size="body" weight="500">
        {t(
          `accept-policy.${agreedTerms ? "communication" : "terms"}.disclaimer`
        )}
      </MintTypography>
      <Stack
        flex={1}
        mt={(theme) => theme.mint.spacing.m}
        gap={(theme) => theme.mint.spacing.m}
        sx={{
          overflowY: "auto",
        }}
        ref={acceptPolicyRef}
      >
        {!agreedTerms ? (
          <TermsOfUseSections
            establishedDate={t("accept-policy.terms.implementation-date")}
          />
        ) : (
          <ConfidentialityAgreement />
        )}
      </Stack>
    </AcceptPolicyModal>
  );
};

export default AgreePolicyPage;
