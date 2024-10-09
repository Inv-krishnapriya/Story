import {
  childrenRadios,
  genderRadios,
  marriedRadios,
} from "@/utils/dropdown.data";
import { generalServices } from "@/common/apiUrls";
import { PrefectureResponse, ProfessionResponse } from "@/common/types";
import {
  MintButton,
  MintChip,
  MintFormControlLabel,
  MintRadio,
  MintSelectField,
  MintTypography,
} from "@/design-system";
import {
  addPrefecture,
  addProfession,
  clearPrefecture,
  clearProfession,
} from "@/stores/interview/reducer";
import { RootState } from "@/stores/rootReducer";
import { removeDuplicates } from "@/utils";
import {
  Box,
  Chip,
  FormControl,
  RadioGroup,
  Stack,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { IFormValues } from "./interface";
import PrefectureModal from "@/components/Modal/campaign/creation/PrefectureModal";
import ProfessionModal from "@/components/Modal/campaign/creation/ProfessionModal";

interface IPrefecture {
  id: string;
  name: string;
  order: number;
}

function BasicAttributesForm() {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [prefectures, setPrefectures] = useState<PrefectureResponse[]>([]);
  const [prefecturesWoa, setPrefecturesWoa] = useState<IPrefecture[]>([]);

  const [professions, setProfessions] = useState<ProfessionResponse[]>([]);

  const { register, control, watch, setValue } = useFormContext();
  const allValues: IFormValues = watch() as any;
  const { prefecture: watchPrefecture = [], profession: watchProfession = [] } =
    allValues;

  const [isModalOpen, setIsModalOpen] = useState<{
    profession: boolean;
    prefecture: boolean;
  }>({
    profession: false,
    prefecture: false,
  });

  const campaignData = useSelector((state: RootState) => state.data.Campaign);

  useEffect(() => {
    getPrefectures();
    getProfessions();
  }, [campaignData]);

  const openPrefectureModal = useCallback(() => {
    setIsModalOpen({ prefecture: true, profession: false });
  }, []);

  const closePrefectureModal = useCallback(
    () => setIsModalOpen({ prefecture: false, profession: false }),
    []
  );

  const openProfessionModal = useCallback(() => {
    setIsModalOpen({ prefecture: false, profession: true });
  }, []);

  function getProfessions() {
    generalServices
      .getProfession()
      .then((response) => {
        setProfessions(
          response?.data?.data?.sort(
            (a: { order: number }, b: { order: number }) => a.order - b.order
          )
        );
        dispatch(clearProfession());
        dispatch(addProfession(response?.data?.data));
      })
      .catch((error) => {
        console.log("Error occured in listing occupation: ", error);
      });
  }

  const closeProfessionModal = useCallback(
    () => setIsModalOpen({ prefecture: false, profession: false }),
    []
  );

  const submitProfession = useCallback((selected: string[]) => {
    setValue("profession", selected);
    closeProfessionModal();
  }, []);

  const submitPrefecture = useCallback((selected: string[]) => {
    setValue("prefecture", removeDuplicates(selected));
    closePrefectureModal();
  }, []);

  const deletePrefectureChip = useCallback(
    (chipToDelete: string) => {
      const chips = watchPrefecture?.filter((chip) => chip !== chipToDelete);
      setValue("prefecture", chips);
    },
    [watchPrefecture]
  );

  const deleteProfessionChip = useCallback(
    (chipToDelete: string) => {
      const chips = watchProfession?.filter((chip) => chip !== chipToDelete);
      setValue("profession", chips);
    },
    [watchProfession]
  );
  const ageLowerSelectData = useMemo(
    () => generateArrayObjects(18, 100, 1, "歳"),
    []
  );
  const ageUpperSelectData = useMemo(
    () =>
      generateArrayObjects(
        allValues?.age?.lower ? allValues?.age?.lower : 18,
        100,
        1,
        "歳"
      ),
    [allValues]
  );

  const personalIncomeLowerSelectData = useMemo(() => incomeData, []);
  const personalIncomeUpperSelectData = useMemo(() => {
    if (allValues?.personalIncome?.lower) {
      const data = incomeData.filter(
        (item) => item.value > (allValues?.personalIncome?.lower ?? 0)
      );
      return data;
    } else {
      return incomeData;
    }
  }, [allValues?.personalIncome?.lower]);

  const householdIncomeLowerSelectData = useMemo(() => incomeData, []);
  const householdIncomeUpperSelectData = useMemo(() => {
    if (allValues?.householdIncome?.lower) {
      const data = incomeData.filter(
        (item) => item.value > (allValues?.householdIncome?.lower ?? 0)
      );
      return data;
    } else {
      return incomeData;
    }
  }, [allValues?.householdIncome?.lower]);

  function getPrefectures() {
    generalServices
      .getPrefectures()
      .then((response) => {
        const data = response?.data?.data?.areas;
        data.sort(
          (a: { order: number }, b: { order: number }) => a.order - b.order
        );
        data.forEach((region: any) => {
          region.prefectures.sort(
            (a: { order: number }, b: { order: number }) => a.order - b.order
          );
        });
        setPrefectures(data);
        setPrefecturesWoa(response?.data?.data?.prefectures);
        dispatch(clearPrefecture());
        dispatch(addPrefecture(response?.data?.data?.prefectures));
      })
      .catch((error) => {
        console.log("Error occured in listing prefectures: ", error);
      });
  }
  return (
    <Box
      p={theme.mint.spacing.l}
      borderRadius={theme.mint.cornerRadius.s}
      border={`1px solid ${theme.mint.color.border.low}`}
      bgcolor={theme.mint.color.background.containerBg.layer1}
    >
      <MintTypography
        size="head-m"
        weight="700"
        lineHeight={"150%"}
        color={theme.mint.color.text.high}
      >
        {t("interview.section4.heading")}
      </MintTypography>
      <MintTypography
        size="body"
        weight="400"
        lineHeight={"150%"}
        color={theme.mint.color.text.high}
        mt={theme.mint.spacing.xxs}
      >
        {/* {t("interview.section4.text")} */}
        基本属性を設定する場合は、以下を設定してください。
      </MintTypography>
      <MintTypography
        size="body"
        weight="400"
        lineHeight={"150%"}
        color={theme.mint.color.system.error.error}
        mt={theme.mint.spacing.x3s}
      >
        {t("interview.section4.warning-text")}
      </MintTypography>
      <Box
        border={`1px solid ${theme.mint.color.border.low}`}
        mt={theme.mint.spacing.m}
      >
        <Box
          display={"flex"}
          sx={{
            borderBottom: `1px solid ${theme.mint.color.border.low}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "168px",
              minWidth: "168px",
              padding: "8px 16px",
              alignItems: "center",
              bgcolor: theme.mint.color.surfaceGray.table.tableHead,
            }}
          >
            <MintTypography
              size="body"
              weight="700"
              lineHeight={"150%"}
              color={theme.mint.color.text.high}
            >
              {t("basic-attribute.gender.label")}
            </MintTypography>
          </Box>
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <RadioGroup {...field}>
                <Box
                  display={"flex"}
                  padding={theme.mint.spacing.s}
                  gap={theme.mint.spacing.s}
                >
                  {genderRadios?.map((gender) => (
                    <Box
                      display={"flex"}
                      gap={theme.mint.spacing.x3s}
                      key={gender.value}
                    >
                      <MintFormControlLabel
                        control={
                          <MintRadio size="small" value={gender.value} />
                        }
                        label={t(gender.label)}
                      />
                    </Box>
                  ))}
                </Box>
              </RadioGroup>
            )}
          />
        </Box>
        <Box
          display={"flex"}
          sx={{
            borderBottom: `1px solid ${theme.mint.color.border.low}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "168px",
              minWidth: "168px",
              padding: "8px 16px",
              alignItems: "center",
              bgcolor: theme.mint.color.surfaceGray.table.tableHead,
            }}
          >
            <MintTypography
              size="body"
              weight="700"
              lineHeight={"150%"}
              color={theme.mint.color.text.high}
            >
              {t("basic-attribute.age.label")}
            </MintTypography>
          </Box>
          <Box
            display={"flex"}
            padding={theme.mint.spacing.s}
            gap={theme.mint.spacing.xxs}
          >
            <Box>
              <Controller
                control={control}
                name="age.lower"
                render={({ field }) => (
                  <FormControl variant="outlined" fullWidth>
                    <MintSelectField
                      fullWidth={false}
                      placeholder={t("interview.section4.select-placeholder")}
                      options={ageLowerSelectData}
                      sx={{
                        width: "192px",
                      }}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e), setValue("age.upper", null);
                      }}
                    />
                  </FormControl>
                )}
              />
            </Box>
            <MintTypography
              size="body"
              weight="400"
              lineHeight={"150%"}
              color={theme.mint.color.text.high}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              〜
            </MintTypography>
            <Box>
              <Controller
                control={control}
                name="age.upper"
                render={({ field }) => (
                  <FormControl variant="outlined" fullWidth>
                    <MintSelectField
                      fullWidth={false}
                      placeholder={t("interview.section4.select-placeholder")}
                      options={ageUpperSelectData}
                      sx={{
                        width: "192px",
                      }}
                      {...field}
                    />
                  </FormControl>
                )}
              />
            </Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          sx={{
            borderBottom: `1px solid ${theme.mint.color.border.low}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "168px",
              minWidth: "168px",
              padding: "8px 16px",
              alignItems: "center",
              bgcolor: theme.mint.color.surfaceGray.table.tableHead,
            }}
          >
            <MintTypography
              size="body"
              weight="700"
              lineHeight={"150%"}
              color={theme.mint.color.text.high}
            >
              {t("interview.section4.prefecture-text")}
            </MintTypography>
          </Box>
          <Stack padding={theme.mint.spacing.s} gap={theme.mint.spacing.xs}>
            <Box>
              <MintButton
                variant="outlined"
                onClick={() => openPrefectureModal()}
              >
                {t("interview.section4.prefecture-button")}
              </MintButton>
            </Box>
            <Box
              display={"flex"}
              gap={theme.mint.spacing.xxs}
              flexWrap={"wrap"}
            >
              {watchPrefecture?.map((chip) => (
                <MintChip
                  key={chip}
                  label={prefecturesWoa
                    .filter((prefecture) => prefecture.id === chip)
                    ?.map((prefec) => prefec.name)}
                  onDelete={() => deletePrefectureChip(chip)}
                  variant="filled"
                  color="primary"
                />
              ))}
            </Box>
          </Stack>
        </Box>
        <Box
          display={"flex"}
          sx={{
            borderBottom: `1px solid ${theme.mint.color.border.low}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "168px",
              minWidth: "168px",
              padding: "8px 16px",
              alignItems: "center",
              bgcolor: theme.mint.color.surfaceGray.table.tableHead,
            }}
          >
            <MintTypography
              size="body"
              weight="700"
              lineHeight={"150%"}
              color={theme.mint.color.text.high}
            >
              {t("interview.section4.profession")}
            </MintTypography>
          </Box>

          <Stack padding={theme.mint.spacing.s} gap={theme.mint.spacing.xs}>
            <Box>
              <MintButton
                variant="outlined"
                onClick={() => openProfessionModal()}
              >
                {t("interview.section4.profession-button")}
              </MintButton>
            </Box>
            <Box
              display={"flex"}
              gap={theme.mint.spacing.xxs}
              flexWrap={"wrap"}
            >
              {watchProfession?.map((chip) => (
                <MintChip
                  key={chip}
                  label={professions
                    .filter((profession) => profession.id === chip)
                    ?.map((prof) => prof.name)}
                  onDelete={() => deleteProfessionChip(chip)}
                  variant="filled"
                  color="primary"
                />
              ))}
            </Box>
          </Stack>
        </Box>
        <Box
          display={"flex"}
          sx={{
            borderBottom: `1px solid ${theme.mint.color.border.low}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "168px",
              minWidth: "168px",
              padding: "8px 16px",
              alignItems: "center",
              bgcolor: theme.mint.color.surfaceGray.table.tableHead,
            }}
          >
            <MintTypography
              size="body"
              weight="700"
              lineHeight={"150%"}
              color={theme.mint.color.text.high}
            >
              {t("interview.section4.marital-status")}
            </MintTypography>
          </Box>
          <Controller
            control={control}
            name="married"
            render={({ field }) => (
              <RadioGroup {...field}>
                <Box
                  display={"flex"}
                  padding={theme.mint.spacing.s}
                  gap={theme.mint.spacing.s}
                >
                  {marriedRadios?.map((gender) => (
                    <Box
                      display={"flex"}
                      gap={theme.mint.spacing.x3s}
                      key={gender.value}
                      minWidth={"60px"}
                    >
                      <MintFormControlLabel
                        control={
                          <MintRadio size="small" value={gender.value} />
                        }
                        label={t(gender.label)}
                      />
                    </Box>
                  ))}
                </Box>
              </RadioGroup>
            )}
          />
        </Box>
        <Box
          display={"flex"}
          sx={{
            borderBottom: `1px solid ${theme.mint.color.border.low}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "168px",
              minWidth: "168px",
              padding: "8px 16px",
              alignItems: "center",
              bgcolor: theme.mint.color.surfaceGray.table.tableHead,
            }}
          >
            <MintTypography
              size="body"
              weight="700"
              lineHeight={"150%"}
              color={theme.mint.color.text.high}
            >
              {t("interview.section4.children-presence")}
            </MintTypography>
          </Box>
          <Controller
            control={control}
            name="children"
            render={({ field }) => (
              <RadioGroup {...field}>
                <Box
                  display={"flex"}
                  padding={theme.mint.spacing.s}
                  gap={theme.mint.spacing.s}
                >
                  {childrenRadios?.map((gender) => (
                    <Box
                      display={"flex"}
                      gap={theme.mint.spacing.x3s}
                      key={gender.value}
                      minWidth={"60px"}
                    >
                      <MintFormControlLabel
                        control={
                          <MintRadio size="small" value={gender.value} />
                        }
                        label={t(gender.label)}
                      />
                    </Box>
                  ))}
                </Box>
              </RadioGroup>
            )}
          />
        </Box>

        <Box
          display={"flex"}
          sx={{
            borderBottom: `1px solid ${theme.mint.color.border.low}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "168px",
              minWidth: "168px",
              padding: "8px 16px",
              alignItems: "center",
              bgcolor: theme.mint.color.surfaceGray.table.tableHead,
            }}
          >
            <MintTypography
              size="body"
              weight="700"
              lineHeight={"150%"}
              color={theme.mint.color.text.high}
            >
              {t("interview.section4.household-income-label")}
            </MintTypography>
          </Box>
          <Box
            display={"flex"}
            padding={theme.mint.spacing.s}
            gap={theme.mint.spacing.xxs}
          >
            <Box>
              <Controller
                control={control}
                name="householdIncome.lower"
                render={({ field }) => (
                  <FormControl variant="outlined" fullWidth>
                    <MintSelectField
                      fullWidth={false}
                      placeholder={t("interview.section4.select-placeholder")}
                      options={householdIncomeLowerSelectData}
                      sx={{
                        width: "192px",
                      }}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e),
                          setValue("householdIncome.upper", null);
                      }}
                    />
                  </FormControl>
                )}
              />
            </Box>
            <MintTypography
              size="body"
              weight="400"
              lineHeight={"150%"}
              color={theme.mint.color.text.high}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              〜
            </MintTypography>
            <Box>
              <Controller
                control={control}
                name="householdIncome.upper"
                render={({ field }) => (
                  <FormControl variant="outlined" fullWidth>
                    <MintSelectField
                      fullWidth={false}
                      placeholder={t("interview.section4.select-placeholder")}
                      options={householdIncomeUpperSelectData}
                      sx={{
                        width: "192px",
                      }}
                      {...field}
                    />
                  </FormControl>
                )}
              />
            </Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          sx={{
            borderBottom: `1px solid ${theme.mint.color.border.low}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "168px",
              minWidth: "168px",
              padding: "8px 16px",
              alignItems: "center",
              bgcolor: theme.mint.color.surfaceGray.table.tableHead,
            }}
          >
            <MintTypography
              size="body"
              weight="700"
              lineHeight={"150%"}
              color={theme.mint.color.text.high}
            >
              {t("interview.section4.personal-income-label")}
            </MintTypography>
          </Box>
          <Box
            display={"flex"}
            padding={theme.mint.spacing.s}
            gap={theme.mint.spacing.xxs}
          >
            <Box>
              <Controller
                control={control}
                name="personalIncome.lower"
                render={({ field }) => (
                  <FormControl variant="outlined" fullWidth>
                    <MintSelectField
                      fullWidth={false}
                      placeholder={t("interview.section4.select-placeholder")}
                      options={personalIncomeLowerSelectData}
                      sx={{
                        width: "192px",
                      }}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e),
                          setValue("personalIncome.upper", null);
                      }}
                    />
                  </FormControl>
                )}
              />
            </Box>
            <MintTypography
              size="body"
              weight="400"
              lineHeight={"150%"}
              color={theme.mint.color.text.high}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              〜
            </MintTypography>
            <Box>
              <Controller
                control={control}
                name="personalIncome.upper"
                render={({ field }) => (
                  <FormControl variant="outlined" fullWidth>
                    <MintSelectField
                      fullWidth={false}
                      placeholder={t("interview.section4.select-placeholder")}
                      options={personalIncomeUpperSelectData}
                      sx={{
                        width: "192px",
                      }}
                      {...field}
                    />
                  </FormControl>
                )}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      {isModalOpen.prefecture && (
        <PrefectureModal
          prefectures={prefectures}
          open={isModalOpen.prefecture}
          handleClose={closePrefectureModal}
          handleSubmit={submitPrefecture}
          checked={watchPrefecture!}
        />
      )}
      {isModalOpen.profession && (
        <ProfessionModal
          professions={professions}
          open={isModalOpen.profession}
          handleClose={closeProfessionModal}
          handleSubmit={submitProfession}
          checked={watchProfession!}
        />
      )}
    </Box>
  );
}

export default BasicAttributesForm;

type GenerateArrayObjects<T> = {
  label: string;
  value: number;
};

function generateArrayObjects<T>(
  start: number,
  end: number,
  gap: number,
  labelHint?: string
): GenerateArrayObjects<T>[] {
  const result: GenerateArrayObjects<T>[] = [];

  for (let i = start; i <= end; i = (i as any) + gap) {
    result.push({ label: `${i.toString()} ${labelHint ?? ""}`, value: i });
  }

  return result;
}

const incomeData = [
  {
    label: "200 万円",
    value: 200,
  },
  {
    label: "400 万円",
    value: 400,
  },
  {
    label: "600 万円",
    value: 600,
  },
  {
    label: "800 万円",
    value: 800,
  },
  {
    label: "1000 万円",
    value: 1000,
  },
  {
    label: "1200 万円",
    value: 1200,
  },
  {
    label: "1500 万円",
    value: 1500,
  },

  {
    label: "2000 万円",
    value: 2000,
  },
];
