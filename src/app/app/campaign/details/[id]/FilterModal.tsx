"use client";

import {
  MintButton,
  MintCheckbox,
  MintDatePicker,
  MintDialog,
  MintDialogActions,
  MintDialogContent,
  MintDialogTitle,
  MintFormControlLabel,
  MintSelectField,
  MintTypography,
} from "@/design-system";
import { generateNumberListMint } from "@/utils";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  useTheme,
} from "@mui/material";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Controller, useForm } from "react-hook-form";
import { actions as CampaignActions } from "../../../../../stores/campaign/reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/rootReducer";
import dayjs from "dayjs";

interface IFilterProps {
  open: boolean;
  onClose: () => void;
  onDisagree: () => void;
  profession: any;
  prefectures: any;
  campaignId: string;
  handleFilterData: (campaignId: string, formData: any) => void;
}

interface IFormData {
  memo: {
    yes: boolean | undefined;
    no: boolean | undefined;
  };
  gender: {
    male: boolean;
    female: boolean;
  };
  isMarried: {
    yes: boolean;
    no: boolean;
  };
  hasChildren: {
    yes: boolean;
    no: boolean;
  };
  occupation: string[] | null;
  prefecture: string[] | null;
  personalIncome: {
    start: number | "";
    end: number | "";
  };
  householdIncome: {
    start: number | "";
    end: number | "";
  };
  date: string;
}

const FilterModal: React.FC<IFilterProps> = (props) => {
  const {
    open,
    onClose,
    onDisagree,
    profession,
    prefectures,
    campaignId,
    handleFilterData,
  } = props;
  const theme = useTheme();
  const [selected, setSelected] = useState<string[]>([]);
  const dispatch = useDispatch();
  const persistData: any = useSelector(
    (state: RootState) => state.campaign.filterData
  );
  const defaultValue = {
    memo: {
      yes: undefined,
      no: undefined,
    },
    gender: {
      male: undefined,
      female: undefined,
    },
    isMarried: {
      yes: undefined,
      no: undefined,
    },
    hasChildren: {
      yes: undefined,
      no: undefined,
    },
    occupation: [],
    prefecture: [],
    personalIncome: {
      start: undefined,
      end: undefined,
    },
    householdIncome: {
      start: undefined,
      end: undefined,
    },
    date: undefined,
  };

  const { register, handleSubmit, watch, getValues, setValue, control, reset } =
    useForm<IFormData>({
      defaultValues: defaultValue,
      mode: "onSubmit",
    });

  const personalIncome = watch("personalIncome");
  const householdIncome = watch("householdIncome");
  const profsion = watch("occupation", []);

  useEffect(() => {
    console.log(
      "Persist Data : ",
      persistData,
      typeof persistData,
      persistData !== null,
      Object.keys(persistData).length
    );

    if (persistData !== null && Object.keys(persistData)?.length > 0) {
      console.log("Data persisted");
      let data = JSON.parse(persistData);
      reset(data);
      setValue("occupation", data?.occupation?.split(","));
      setSelected(data?.prefecture);
    } else {
      reset(defaultValue);
      setValue("personalIncome.start", "");
      setValue("personalIncome.end", "");
      setValue("householdIncome.start", "");
      setValue("householdIncome.end", "");
      setValue("prefecture", []);
      setSelected([]);
    }
  }, [persistData]);

  const onSubmit = (data: IFormData) => {
    console.log(data);

    console.log("Date from data: ", data?.date);
    console.log(data, getValues("memo"));
    const { yes, no } = getValues("memo");
    const { male, female } = getValues("gender");
    const formData = {
      memo: `${no ? "0" : ""},${yes ? "1" : ""}`
        .replace(/,+/g, ",")
        .replace(/^,|,$/g, ""),
      gender: `${male ? "1" : ""},${female ? "2" : ""}`
        .replace(/,+/g, ",")
        .replace(/^,|,$/g, ""),
      hasChildren: `${getValues("hasChildren.no") ? "2" : ""},${
        getValues("hasChildren.yes") ? "1" : ""
      }`
        .replace(/,+/g, ",")
        .replace(/^,|,$/g, ""),
      isMarried: `${getValues("isMarried.no") ? "1" : ""},${
        getValues("isMarried.yes") ? "2" : ""
      }`
        .replace(/,+/g, ",")
        .replace(/^,|,$/g, ""),
      occupation: String(data?.occupation?.filter(Boolean)),
      prefecture: String(data?.prefecture?.filter(Boolean)),
      personalIncome:
        data?.personalIncome?.start !== undefined
          ? data?.personalIncome?.start + "-" + data?.personalIncome?.end
          : "",
      householdIncome:
        data?.householdIncome?.start !== undefined
          ? data?.householdIncome?.start + "-" + data?.householdIncome?.end
          : "",
      date:
        data?.date !== undefined &&
        data?.date !== "Invalid date" &&
        data?.date !== ""
          ? getValues("date")
          : "",
    };

    console.log("FormData: ", formData);

    handleFilterData(campaignId, formData);
    let filterData = JSON.stringify({
      memo: {
        yes: yes,
        no: no,
      },
      gender: {
        male: male,
        female: female,
      },
      hasChildren: {
        no: getValues("hasChildren.no"),
        yes: getValues("hasChildren.yes"),
      },
      isMarried: {
        yes: getValues("isMarried.yes"),
        no: getValues("isMarried.no"),
      },
      occupation: String(getValues("occupation")),
      prefecture: getValues("prefecture"),
      personalIncome: {
        start:
          getValues("personalIncome.start") !== undefined
            ? getValues("personalIncome.start")
            : "",
        end:
          getValues("personalIncome.end") !== undefined
            ? getValues("personalIncome.end")
            : "",
      },
      householdIncome: {
        start:
          getValues("householdIncome.start") !== undefined
            ? getValues("householdIncome.start")
            : "",
        end:
          getValues("householdIncome.end") !== undefined
            ? getValues("householdIncome.end")
            : "",
      },
      date: getValues("date"),
    });
    console.log("FILTER DATA: ", filterData);

    dispatch(CampaignActions.setFilterData({ filterData }));
  };

  const handleProfession = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { checked } = e.target;
    if (checked) {
      console.log("Inside checked");
      if (getValues("occupation")?.includes(id)) {
        console.log("Item already exist");
        let data = getValues("occupation")?.filter((item) => item !== id);
        setValue("occupation", data!);
      } else {
        console.log("New item found", getValues("occupation")!, id);
        let result = profsion!;
        console.log("final Result : ", result);
        result.push(id);
        setValue("occupation", result);
      }
    } else {
      console.log("Inside else");

      let data = getValues("occupation")?.filter((item) => item !== id);
      setValue("occupation", data!);
    }
  };

  const handlePrefecture = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { checked, name, value } = e.target;
    console.log(name, value, id);
    if (prefectures?.some((n: any) => n.name === id)) {
      console.log("Inside if case");

      let areaSelected = prefectures?.filter(
        (area: { name: string }) => area.name === id
      );
      console.log("area selected :", areaSelected);

      const result = checked
        ? [
            ...selected!,
            ...areaSelected[0]?.prefectures?.map((x: { id: any }) => x.id),
          ]
        : selected?.filter(
            (x) => !areaSelected[0]?.prefectures?.map((x: { id: any }) => x.id)
          );
      setSelected(result);
      setValue("prefecture", result);
      console.log(result);
    } else {
      console.log("Inside else case");

      const result = checked
        ? [...selected, id]
        : selected?.filter((x) => x !== id);
      setSelected(result);
      setValue("prefecture", result);
      console.log(result);
    }
  };

  const handleClear = () => {
    reset(defaultValue);
    setValue("personalIncome.start", "");
    setValue("personalIncome.end", "");
    setValue("householdIncome.start", "");
    setValue("householdIncome.end", "");
    setValue("prefecture", []);
    setSelected([]);
    dispatch(CampaignActions.resetFilterData({}));
    onDisagree();
  };

  const handleDateChange = (event: any) => {
    const value = event?.format("DD-MM-YYYY");
    console.log(value);

    setValue("date", value);
  };

  return (
    <MintDialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          overflowY: "unset",
          display: "flex",
          width: "600px",
          padding: 0,
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          borderRadius: (theme) => theme.mint.cornerRadius.xs,
          background: (theme) => theme.mint.color.background.containerBg.modal,
        },
      }}
    >
      <MintDialogTitle sx={{ alignSelf: "flex-start" }}>
        <MintTypography size="head-m" weight="700">
          {t("campaign.campaignDetail.filtersettings.title")}
        </MintTypography>
      </MintDialogTitle>
      <Box
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
          width: "552px",
          position: "relative",
          overflow: "auto",
          scrollbarWidth: "none",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <MintDialogContent
            sx={{
              "::-webkit-scrollbar": {
                display: "none",
              },
              minHeight: "300px",
              maxHeight: "500px",
            }}
          >
            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",

                gap: 2,
                alignItems: "flex-start",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  py: 2,
                  borderBottom: "1px solid rgba(10, 24, 38, 0.08)",
                }}
              >
                <MintTypography sx={{ width: "138px" }}>
                  {t("campaign.campaignDetail.memo")}
                </MintTypography>

                <Controller
                  control={control}
                  {...register("memo.yes")}
                  render={({ field }) => (
                    <MintFormControlLabel
                      control={
                        <MintCheckbox
                          checked={
                            getValues("memo.yes") === true ? true : false
                          }
                          sx={{ alignSelf: "center" }}
                          {...field}
                        />
                      }
                      label={t("campaign.campaignDetail.filtersettings.yes")}
                    />
                  )}
                />

                <Controller
                  control={control}
                  {...register("memo.no")}
                  render={({ field }) => (
                    <MintFormControlLabel
                      control={
                        <MintCheckbox
                          checked={getValues("memo.no") === true ? true : false}
                          sx={{ alignSelf: "center" }}
                          {...field}
                        />
                      }
                      label={t("campaign.campaignDetail.filtersettings.no")}
                    />
                  )}
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  py: 1,
                  borderBottom: "1px solid rgba(10, 24, 38, 0.08)",
                }}
              >
                <MintTypography sx={{ width: "138px" }}>
                  {t("campaign.campaignDetail.th.gender")}
                </MintTypography>
                <Controller
                  control={control}
                  {...register("gender.male")}
                  render={({ field }) => (
                    <MintFormControlLabel
                      control={
                        <MintCheckbox
                          checked={
                            getValues("gender.male") === true ? true : false
                          }
                          sx={{ alignSelf: "center" }}
                          {...field}
                        />
                      }
                      label={t("basic-attribute.gender.male")}
                    />
                  )}
                />

                <Controller
                  control={control}
                  {...register("gender.female")}
                  render={({ field }) => (
                    <MintFormControlLabel
                      control={
                        <MintCheckbox
                          checked={
                            getValues("gender.female") === true ? true : false
                          }
                          sx={{ alignSelf: "center" }}
                          {...field}
                        />
                      }
                      label={t("basic-attribute.gender.female")}
                    />
                  )}
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  py: 1,
                  borderBottom: "1px solid rgba(10, 24, 38, 0.08)",
                }}
              >
                <MintTypography sx={{ width: "138px" }}>
                  {t("campaign.campaignDetail.th.maritalstatus")}
                </MintTypography>
                <Controller
                  control={control}
                  {...register("isMarried.no")}
                  render={({ field }) => (
                    <MintFormControlLabel
                      control={
                        <MintCheckbox
                          checked={
                            getValues("isMarried.no") === true ? true : false
                          }
                          sx={{ alignSelf: "center" }}
                          {...field}
                        />
                      }
                      label={t(
                        "campaign.campaignDetail.filtersettings.married"
                      )}
                    />
                  )}
                />

                <Controller
                  control={control}
                  {...register("isMarried.yes")}
                  render={({ field }) => (
                    <MintFormControlLabel
                      control={
                        <MintCheckbox
                          checked={
                            getValues("isMarried.yes") === true ? true : false
                          }
                          sx={{ alignSelf: "center" }}
                          {...field}
                        />
                      }
                      label={t("basic-attribute.married.false")}
                    />
                  )}
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  py: 1,
                  borderBottom: "1px solid rgba(10, 24, 38, 0.08)",
                }}
              >
                <MintTypography sx={{ width: "138px" }}>
                  {t("interview.section4.children-presence")}
                </MintTypography>
                <Controller
                  control={control}
                  {...register("hasChildren.yes")}
                  render={({ field }) => (
                    <MintFormControlLabel
                      control={
                        <MintCheckbox
                          checked={
                            getValues("hasChildren.yes") === true ? true : false
                          }
                          sx={{ alignSelf: "center" }}
                          {...field}
                        />
                      }
                      label={t(
                        "campaign.campaignDetail.filtersettings.children-presence.yes"
                      )}
                    />
                  )}
                />

                <Controller
                  control={control}
                  {...register("hasChildren.no")}
                  render={({ field }) => (
                    <MintFormControlLabel
                      control={
                        <MintCheckbox
                          checked={
                            getValues("hasChildren.no") === true ? true : false
                          }
                          sx={{ alignSelf: "center" }}
                          {...field}
                        />
                      }
                      label={t(
                        "campaign.campaignDetail.filtersettings.children-presence.no"
                      )}
                    />
                  )}
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  py: 1,
                  borderBottom: "1px solid rgba(10, 24, 38, 0.08)",
                }}
              >
                <MintTypography sx={{ width: "138px" }}>
                  {t("campaign.campaignDetail.th.profession")}
                </MintTypography>
                <Box
                  sx={{
                    width: "374px",
                    display: "flex",
                    padding: 0,
                    alignItems: "flex-end",
                    alignContent: "flex-end",
                    gap: "8px",
                    flex: "8px 0px 0px",
                    flexWrap: "wrap",
                  }}
                >
                  {profession?.length > 0 &&
                    profession?.map((profession: any, index: number) => {
                      return (
                        <Box
                          sx={{ display: "inline-flex", gap: "8px" }}
                          key={index}
                        >
                          <Controller
                            control={control}
                            {...register("occupation")}
                            render={({ field }) => (
                              <MintFormControlLabel
                                control={
                                  <MintCheckbox
                                    checked={getValues("occupation")!?.includes(
                                      profession.id
                                    )}
                                    sx={{ alignSelf: "center" }}
                                    onChange={(e) =>
                                      handleProfession(e, profession.id)
                                    }
                                  />
                                }
                                label={profession.name}
                              />
                            )}
                          />
                        </Box>
                      );
                    })}
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  py: 1,
                  borderBottom: "1px solid rgba(10, 24, 38, 0.08)",
                }}
              >
                <MintTypography sx={{ width: "138px" }}>
                  {t("interview.section4.prefecture-text")}
                </MintTypography>
                <Box
                  sx={{
                    width: "360px",
                    flexDirection: "row",
                    display: "flex",
                    padding: 0,
                    alignItems: "flex-end",
                    alignContent: "flex-end",
                    gap: 1,
                    flex: "8px 0px 0px",
                    flexWrap: "wrap",
                  }}
                >
                  {prefectures?.map((area: any, index: number) => (
                    <Accordion
                      key={index}
                      sx={{
                        "&.MuiPaper-root": {
                          width: "100%",
                          boxShadow: "none",
                          margin: 0,
                          "&::before": {
                            backgroundColor: "#fff",
                          },
                        },
                      }}
                      elevation={0}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{
                          ".MuiPaper-root-MuiAccordion-root:before": {
                            backgroundColor: "none",
                          },
                          "&.MuiAccordionSummary-root": {
                            padding: "4px 8px",
                            borderRadius: "8px",
                            backgroundColor:
                              theme.mint.color.background.containerBg.layer2,
                            boxShadow: "none",
                            "&.Mui-expanded": {
                              minHeight: "48px",
                            },
                            ".MuiAccordionSummary-content": {
                              margin: 0,
                            },
                          },
                        }}
                      >
                        <Box
                          display={"flex"}
                          gap={"8px"}
                          alignItems={"center"}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Controller
                            control={control}
                            name={area.name}
                            render={({ field }) => (
                              <MintFormControlLabel
                                control={
                                  <MintCheckbox
                                    sx={{ alignSelf: "center" }}
                                    onChange={(e) =>
                                      handlePrefecture(e, area.name)
                                    }
                                    checked={area.prefectures.every(
                                      (x: any) => selected?.includes(x.id)
                                    )}
                                  />
                                }
                                label={area?.name}
                              />
                            )}
                          />
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box
                          sx={{
                            width: "374px",
                            display: "flex",
                            padding: 0,
                            alignItems: "flex-end",
                            alignContent: "flex-end",
                            gap: 1,
                            flex: "8px 0px 0px",
                            flexWrap: "wrap",
                          }}
                        >
                          {area?.prefectures?.length > 0 &&
                            area?.prefectures
                              ?.sort((a: any, b: any) => a.order - b.order)
                              .map((prefecture: any, index: number) => {
                                return (
                                  <Box
                                    sx={{
                                      display: "inline-flex",
                                      gap: 1,
                                      height: "32px",
                                      alignItems: "center",
                                    }}
                                    key={index}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Controller
                                      control={control}
                                      name={prefecture.name}
                                      render={({ field }) => (
                                        <MintFormControlLabel
                                          control={
                                            <MintCheckbox
                                              sx={{ alignSelf: "center" }}
                                              onChange={(e) =>
                                                handlePrefecture(
                                                  e,
                                                  prefecture.id
                                                )
                                              }
                                              checked={selected?.some(
                                                (x) => x === prefecture.id
                                              )}
                                            />
                                          }
                                          label={prefecture?.name}
                                        />
                                      )}
                                    />
                                  </Box>
                                );
                              })}
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  py: 1,
                  borderBottom: "1px solid rgba(10, 24, 38, 0.08)",
                }}
              >
                <MintTypography sx={{ width: "145px" }}>
                  {t("interview.section4.household-income-label")}
                </MintTypography>
                <Box
                  display={"flex"}
                  flexGrow={1}
                  alignItems={"center"}
                  sx={{ gap: 1 }}
                >
                  <Controller
                    control={control}
                    {...register("householdIncome.start")}
                    render={({ field }) => (
                      <MintSelectField
                        placeholder={t("interview.section4.select-placeholder")}
                        displayEmpty
                        options={generateNumberListMint(
                          200,
                          householdIncome?.end !== "" &&
                            householdIncome?.end !== undefined
                            ? householdIncome?.end
                            : 2000
                        )}
                        {...field}
                      />
                    )}
                  />
                  ~{" "}
                  <Controller
                    control={control}
                    {...register("householdIncome.end")}
                    render={({ field }) => (
                      <MintSelectField
                        placeholder={t("interview.section4.select-placeholder")}
                        displayEmpty
                        options={generateNumberListMint(
                          householdIncome?.start !== "" &&
                            householdIncome?.start !== undefined
                            ? householdIncome?.start
                            : 200,
                          2000
                        )}
                        {...field}
                      />
                    )}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  py: 1,
                  borderBottom: "1px solid rgba(10, 24, 38, 0.08)",
                }}
              >
                <MintTypography sx={{ width: "145px" }}>
                  {t("interview.section4.personal-income-label")}
                </MintTypography>
                <Box
                  display={"flex"}
                  flexGrow={1}
                  alignItems={"center"}
                  sx={{ gap: 1 }}
                >
                  <Controller
                    control={control}
                    {...register("personalIncome.start")}
                    render={({ field }) => (
                      <MintSelectField
                        placeholder={t("interview.section4.select-placeholder")}
                        displayEmpty
                        options={generateNumberListMint(
                          200,
                          personalIncome?.end !== "" &&
                            personalIncome?.end !== undefined
                            ? personalIncome?.end
                            : 2000
                        )}
                        fullWidth
                        {...field}
                      />
                    )}
                  />{" "}
                  ~{" "}
                  <Controller
                    control={control}
                    {...register("personalIncome.end")}
                    render={({ field }) => (
                      <MintSelectField
                        placeholder={t("interview.section4.select-placeholder")}
                        displayEmpty
                        options={generateNumberListMint(
                          personalIncome?.start !== "" &&
                            personalIncome?.start !== undefined
                            ? personalIncome?.start
                            : 200,
                          2000
                        )}
                        fullWidth
                        {...field}
                      />
                    )}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  py: 1,
                }}
              >
                <MintTypography sx={{ width: "138px" }}>
                  {t("campaign.th.date")}
                </MintTypography>
                <Box flexGrow={1} sx={{ width: "360px" }}>
                  <Controller
                    control={control}
                    {...register("date")}
                    render={({ field }) => (
                      <MintDatePicker
                        value={
                          getValues("date")
                            ? dayjs(getValues("date"), "DD-MM-YYYY")
                            : null
                        }
                        onChange={(e) => handleDateChange(e)}
                        sx={{ width: "360px" }}
                      />
                    )}
                  />
                </Box>
              </Box>
            </Stack>
          </MintDialogContent>
        </form>
      </Box>

      <MintDialogActions
        maxHeight="64px"
        position="absolute"
        bottom={0}
        sx={{
          display: "flex",
          padding: "8px 24px 24px 24px",
          justifyContent: "space-between",
          alignItems: "flex-end",
          alignSelf: "stretch",
        }}
      >
        <Box
          sx={{
            maxHeight: "32px",
            display: "flex",
            padding: 0,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            gap: 1,
            flex: "1 0 0",
          }}
        >
          <MintButton
            size="small"
            variant="outlined"
            color="primary"
            onClick={handleClear}
          >
            <MintTypography
              size="body"
              weight="500"
              color={theme.mint.color.text.accent}
              lineHeight={"100%"}
            >
              {t("campaign.campaignDetail.filtersettings.disagreeButton")}
            </MintTypography>
          </MintButton>
          <MintButton
            type="submit"
            size="small"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            data-testid="filter-submit"
            sx={{
              background: theme.mint.color.surfaceAccent.primary.primary,
            }}
          >
            <MintTypography
              size="body"
              weight="500"
              color={theme.mint.color.text.highInverse}
              lineHeight={"100%"}
            >
              {t("campaign.campaignDetail.filtersettings.agreeButton")}
            </MintTypography>
          </MintButton>
        </Box>
      </MintDialogActions>
    </MintDialog>
  );
};

export default FilterModal;
