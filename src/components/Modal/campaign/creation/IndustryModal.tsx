import AppCheckbox from "@/components/Checkbox/AppCheckbox";
import { Box, Button, FormGroup, Stack, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AppModal from "../../AppModal";
import { IndustryResponse } from "@/common/types";
import {
  MintButton,
  MintCheckbox,
  MintDialog,
  MintFormControlLabel,
  MintTypography,
} from "@/design-system";

type TModal = {
  industries: IndustryResponse[];
  isOpen: boolean;
  close: () => void;
  submit: (selected: string[]) => void;
  checked: string[];
};
const IndustryModal = ({
  industries,
  isOpen,
  close,
  submit,
  checked,
}: TModal) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string[]>([]);
  console.log(industries, "industries");

  useEffect(() => {
    if (checked?.length > 0) setSelected(checked);
  }, [checked]);

  const handleColumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name, value } = event.target;
    if (ngData?.some((n) => n.categoryName === name) && checked) {
      let areaSelected = ngData.find((ng) => ng.categoryName === name);
      const result: string[] =
        areaSelected?.categoryItem?.map((prefecture) => prefecture.id) ?? [];
      const uniqueArray = [...new Set([...result, ...selected])];
      setSelected((pre) => uniqueArray);
    } else {
      const areaSelected = ngData.find((ng) => ng.categoryName === name);
      const ids = areaSelected?.categoryItem?.map((area) => area.id) ?? [];
      const updatedValue = selected?.filter((x) => !ids.includes(x));
      setSelected(updatedValue);
    }
  };
  const handleColumItemChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked, value } = event.target;
    if (checked) {
      setSelected((pre) => [...pre, value]);
    } else {
      const updatedValue = selected?.filter((x) => x !== value);
      setSelected(updatedValue);
    }
  };

  const cancel = () => {
    close();
  };
  const theme = useTheme();

  return (
    <MintDialog
      open={isOpen}
      onClose={close}
      sx={{
        "& .MuiPaper-root": {
          width: "600px",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: theme.mint.color.background.containerBg.layer1,
          zIndex: 100,
        }}
      >
        <Box p={theme.mint.spacing.m}>
          <MintTypography
            size="head-m"
            weight="500"
            lineHeight={"150%"}
            color={theme.mint.color.text.high}
          >
            NG職種の設定
          </MintTypography>
        </Box>
        <Box px={theme.mint.spacing.m} pb={theme.mint.spacing.s}>
          <Stack gap={theme.mint.spacing.s}>
            <MintTypography
              size="body"
              weight="400"
              lineHeight={"150%"}
              color={theme.mint.color.text.high}
            >
              インタビュー対象外とする業種を全て選択してください
            </MintTypography>
            <Stack gap={theme.mint.spacing.x3s}></Stack>
          </Stack>
        </Box>
      </Box>

      <Box px={theme.mint.spacing.m} borderRadius={"8px"}>
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          gap={theme.mint.spacing.xxs}
          rowGap={theme.mint.spacing.s}
        >
          {ngData?.map?.((ng) => {
            return (
              <Stack key={ng.id} flexGrow={1} flex={"49%"}>
                <Box
                  display={"flex"}
                  gap={theme.mint.spacing.xxs}
                  p={theme.mint.spacing.xxs}
                  height={"40px"}
                  borderRadius={`${theme.mint.cornerRadius.s}px`}
                  bgcolor={theme.mint.color.background.containerBg.layer2}
                >
                  <MintFormControlLabel
                    control={
                      <MintCheckbox
                        name={ng.categoryName}
                        onChange={handleColumChange}
                        checked={ng.categoryItem.every(
                          (x) => selected?.includes(x.id)
                        )}
                      />
                    }
                    label={ng.categoryName}
                  />
                </Box>
                <Box py={theme.mint.spacing.x3s}>
                  {ng?.categoryItem?.map((item) => {
                    return (
                      <Box
                        display={"flex"}
                        gap={theme.mint.spacing.xxs}
                        px={theme.mint.spacing.xxs}
                        py={theme.mint.spacing.x3s}
                        key={item.id}
                        sx={{
                          "&:hover": {
                            backgroundColor:
                              theme.mint.color.surfaceGray.area.hover,
                          },
                        }}
                      >
                        <MintFormControlLabel
                          control={
                            <MintCheckbox
                              value={item.id}
                              key={item.id}
                              name={item.name}
                              onChange={handleColumItemChange}
                              checked={selected?.some((x) => x === item.id)}
                            />
                          }
                          label={item.name}
                        />
                      </Box>
                    );
                  })}
                </Box>
              </Stack>
            );
          })}
        </Stack>
      </Box>
      <Stack
        p={theme.mint.spacing.m}
        justifyContent={"end"}
        direction={"row"}
        gap={theme.mint.spacing.xxs}
        sx={{
          position: "sticky",
          bottom: 0,
          backgroundColor: theme.mint.color.background.containerBg.layer1,
          zIndex: 100,
        }}
      >
        <MintButton size="medium" variant="text" onClick={cancel}>
          {t("interview.button.cancel")}
        </MintButton>
        <MintButton size="medium" onClick={() => submit(selected)}>
          {t("campaign.creation.modal.submit-button")}
        </MintButton>
      </Stack>
    </MintDialog>
  );
};

export default IndustryModal;

const ngData = [
  {
    categoryName: "メディア・広告・リサーチ業",
    id: 1,
    categoryItem: [
      {
        id: "e81293a795d8437dbcfea4ee015d0589",
        name: "出版・印刷関連産業",
        order: 15,
      },
      {
        id: "46d3dc700e004428b577be1280e06915",
        name: "調査業・広告代理業",
        order: 39,
      },
    ],
  },
  {
    categoryName: "建設・不動産業",
    id: 2,
    categoryItem: [
      {
        id: "a02ee5ff36244e71aa995403852d3dbd",
        name: "建設業",
        order: 2,
      },
      {
        id: "db8dea1d0dfe4a19ad1d27d047d7909f",
        name: "不動産業",
        order: 34,
      },
    ],
  },
  {
    categoryName: "金融・保険業",
    id: 3,
    categoryItem: [
      {
        id: "2d2af804ff8c46599916b2d8739ecba7",
        name: "金融業",
        order: 32,
      },
      {
        id: "11d1e467b3ac48c9a764f7197274b703",
        name: "保険業",
        order: 33,
      },
    ],
  },
  {
    categoryName: "運送・輸送業",
    id: 4,
    categoryItem: [
      {
        id: "3aecd8bbf1044f3db04ed8172a117038",
        name: "運送・輸送業",
        order: 17,
      },
    ],
  },
  {
    categoryName: "電気・ガス・熱供給・水道業",
    id: 5,
    categoryItem: [
      {
        id: "b54f826dc05d4aa090f5f7398d06177a",
        name: "電気・ガス・熱供給・水道業",
        order: 16,
      },
    ],
  },
  {
    categoryName: "情報通信業",
    id: 6,
    categoryItem: [
      {
        id: "1b20a486a7f64b23a63eb399a2c66240",
        name: "電気通信業",
        order: 19,
      },
      {
        id: "6d0526398a434da788152664a60ac4df",
        name: "ソフトウェア・情報サービス業",
        order: 38,
      },
      {
        id: "70f147c538714551ba5590fd3f19fe8e",
        name: "放送業",
        order: 37,
      },
    ],
  },
  {
    categoryName: "製造業",
    id: 7,
    categoryItem: [
      {
        id: "9992d6d174cf487b94cba595cb2495a7",
        name: "製造業(食料・飲料(酒類除く))",
        order: 3,
      },
      {
        id: "455d0423faad4bbb8b061f920fa1dfcd",
        name: "製造業(酒類)",
        order: 4,
      },
      {
        id: "5964cab1c8b844b7a5611974ef68c71e",
        name: "製造業(衣服・繊維製品)",
        order: 5,
      },
      {
        id: "4a2f8d953260411eb736f829e21c666c",
        name: "製造業(石けん・合成洗剤・医薬品・化粧品)",
        order: 6,
      },
      {
        id: "16b7a9bf6023475e9b42a6409d5f0b6b",
        name: "製造業(日用品)",
        order: 7,
      },
      {
        id: "6e5f955db4d1401a944139aa42547844",
        name: "製造業(製紙・パルプ)",
        order: 8,
      },
      {
        id: "255b6d54d9ed431f9884452d1761d08d",
        name: "製造業(AV・家電・電気機械器具)",
        order: 10,
      },
      {
        id: "f3d0efda6e6249028358e8e36d765d7f",
        name: "製造業(コンピュータ)",
        order: 11,
      },
      {
        id: "77328fb2781b475ca1072c57f6a13c0a",
        name: "製造業(自動車・輸送機器)",
        order: 12,
      },
      {
        id: "c082edf297f741fba5e24776e89144ff",
        name: "製造業(その他)",
        order: 13,
      },
    ],
  },
  {
    categoryName: "卸売・小売業",
    id: 7,
    categoryItem: [
      {
        id: "b90c5cadcbfa44aa807a9a6d3f3ff7a2",
        name: "卸売・小売業(食料・飲料(酒類除く))",
        order: 20,
      },
      {
        id: "ff983657ce9a4151b7f5b12fa92437d9",
        name: "卸売・小売業(酒類)",
        order: 21,
      },
      {
        id: "2484b11e8ad8473a8ff1d6232b85eb3e",
        name: "卸売・小売業(衣服・繊維製品)",
        order: 22,
      },
      {
        id: "5260cb2b7ce54587a844b857e3229fbc",
        name: "卸売・小売業(石けん・合成洗剤・医薬品・化粧品)",
        order: 23,
      },
      {
        id: "bd1238c8702f486caa0ae0769321d98b",
        name: "卸売・小売業(日用品)",
        order: 24,
      },
      {
        id: "edfcea2425394ebaad269abbe0004ec7",
        name: "卸売・小売業(製紙・パルプ)",
        order: 25,
      },
      {
        id: "fa440dce6e4a440b9c0d961935523940",
        name: "卸売・小売業(石油製品)",
        order: 26,
      },
      {
        id: "35ab98925f5a4e179e8b0119e7c753aa",
        name: "卸売・小売業(AV・家電・電気機械器具)",
        order: 27,
      },
      {
        id: "4aeaa60f1ca4448ca7ecdfa6138e7d8f",
        name: "卸売・小売業(コンピュータ)",
        order: 28,
      },
      {
        id: "19c9abe623164baa96a119839468bdb2",
        name: "卸売・小売業(自動車・輸送機器)",
        order: 29,
      },
    ],
  },
  {
    categoryName: "宿泊・飲食・サービス業",
    id: 8,
    categoryItem: [
      {
        id: "5379d74e4dda4be0a42fb1bd55af458a",
        name: "旅行業",
        order: 18,
      },
      {
        id: "64fdcf83975c415a8d9276c37b3f1c65",
        name: "飲食店",
        order: 31,
      },
      {
        id: "614bd27393234f1182b33d62948af959",
        name: "サービス業(旅館・その他の宿泊所・娯楽業)",
        order: 35,
      },
      {
        id: "91afcd3cd7234cd193c8325f4122eba2",
        name: "サービス業(その他)",
        order: 36,
      },
    ],
  },
  {
    categoryName: "農林水産業・鉱業・鉄鋼業",
    id: 9,
    categoryItem: [
      {
        id: "a0ce515823f341f4aa27cdfd041320ad",
        name: "農業・林業・漁業・鉱業",
        order: 1,
      },
      {
        id: "244c80b1603147c4b493a51b625634d0",
        name: "鉄鋼業",
        order: 14,
      },
    ],
  },
  {
    categoryName: "医療業",
    id: 10,
    categoryItem: [
      {
        id: "7bd53f41d1fa4565b82f16cfb67c33de",
        name: "医療業",
        order: 40,
      },
    ],
  },
  {
    categoryName: "協同組合・教育関連・公務員",
    id: 11,
    categoryItem: [
      {
        id: "43918588494046f4a6fb7800ea67686e",
        name: "協同組合・教育関連・公務員",
        order: 41,
      },
    ],
  },
];
