import { Button, styled } from "@mui/material";
import {
  containVariants,
  outlinedVariants,
  textVariants,
  tonalVariants,
} from "./variantColor";

const TonalButton = styled(Button)(({
  tonalVariant = "blue",
}: {
  tonalVariant?: "blue" | "yellow" | "teal" | "gray" | "red" | "orange";
}) => {
  const tonalStyle = tonalVariants.find((v) => v.variant === tonalVariant);
  return {
    display: "flex",
    height: "28px",
    padding: "4px 8px",
    justifyContent: "center",
    alignItems: "center",
    gap: "var(--mm-spacing-s)",
    borderRadius: "var(--mm-size-radius-s)",
    fontFamily: "'Roboto', 'Noto Sans JP', sans-serif",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "100%",
    ...tonalStyle?.style,
  };
});
const ContainedButton = styled(Button)(({
  containVariant = "accent-primary",
}: {
  containVariant?: "accent-primary";
}) => {
  const containStyle = containVariants.find(
    (v) => v.variant === containVariant
  );
  return {
    display: "flex",
    height: "40px",
    padding: "12px",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    borderRadius: "var(--mm-radius-m)",
    fontFamily: "'Roboto', 'Noto Sans JP', sans-serif",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "100%",
    ...containStyle?.style,
  };
});
const OutlinedButton = styled(Button)(({
  outlinedVariant = "text-accent",
}: {
  outlinedVariant?: "text-accent" | "text-medium";
}) => {
  const outlinedStyle = outlinedVariants.find(
    (v) => v.variant === outlinedVariant
  );
  return {
    display: "flex",
    height: "40px",
    padding: "12px",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    borderRadius: "var(--mm-radius-m)",
    fontFamily: "'Roboto', 'Noto Sans JP', sans-serif",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "100%",
    ...outlinedStyle?.style,
  };
});
const TextButton = styled(Button)(({
  textVariant = "text-accent",
}: {
  textVariant?: "text-accent";
}) => {
  const outlinedStyle = textVariants.find((v) => v.variant === textVariant);
  return {
    display: "flex",
    height: "40px",
    padding: "12px",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    borderRadius: "var(--mm-radius-m)",
    fontFamily: "'Roboto', 'Noto Sans JP', sans-serif",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "100%",
    ...outlinedStyle?.style,
  };
});
export { TonalButton, ContainedButton, OutlinedButton, TextButton };
