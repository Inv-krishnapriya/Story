import { MintTypography } from "@/design-system";
import { Box } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";

type TContent = (number | (number | string)[])[] | number[];

interface SectionProp {
  title: string;
  contents: TContent;
  baseKey?: string;
}

const Section: React.FC<SectionProp> = ({ title, contents, baseKey }) => {
  const { t } = useTranslation();
  return (
    <section>
      <MintTypography size="body" weight="700">
        {t(`${baseKey}.${title}`)}
      </MintTypography>
      <Box mt={(theme) => theme.mint.spacing.xxs}>
        {contents.map((content, index) =>
          Array.isArray(content) ? (
            content.map((c) => (
              <MintTypography size="body" weight="400" key={c}>
                <Trans components={{ 1: <br /> }}>
                  {typeof c === "number" && "\u00A0 \u00A0 \u00A0"}
                  {t(`${baseKey}.${index + 1}.${c}`)}
                </Trans>
              </MintTypography>
            ))
          ) : (
            <MintTypography size="body" weight="400" key={content}>
              {t(`${baseKey}.${content}`)}
            </MintTypography>
          )
        )}
      </Box>
    </section>
  );
};

export default Section;
