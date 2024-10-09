"use client";

import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { splitAmountWithComma } from "@/utils";
import { ticketService } from "@/common/apiUrls";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateTotalAmount } from "@/stores/data/reducer";

let totalAmount: number = 0;

type TTickettableProp = {
  setTicketCount: (n: number, k: string) => void;
  tickets: any[];
};

type TNumberFieldProp = {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value: number;
};

const NumberField = ({ onChange, value, ...rest }: TNumberFieldProp) => {
  return (
    <TextField
      value={value}
      onChange={(e) => onChange(e)}
      id="outlined-number"
      type="tel"
      inputProps={{
        maxLength: 2,
        style: {
          textAlign: "center",
          padding: "10px 12px",
        },
      }}
      {...rest}
      sx={{ width: 1 / 8, minWidth: "3rem" }}
    />
  );
};

const TicketTable = ({ setTicketCount, tickets }: TTickettableProp) => {
  const { t } = useTranslation();
  const [count, setCount] = useState(Array(tickets?.length).fill(1));
  const [total, setTotal] = useState(0);

  useEffect(() => {
    return () => {
      totalAmount = 0;
    };
  }, []);

  const headers = [
    t("ticketpurchase.th.name"),
    t("ticketpurchase.th.price"),
    t("ticketpurchase.th.sets"),
    t("ticketpurchase.th.subtotal"),
  ];

  function handleInput(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number,
    ticket: any
  ) {
    const { value } = e.target;
    let prevCount = count[id] || 0;
    const newCount = [...count];
    newCount[id] = parseInt(value !== "" ? value : "0");
    setCount(newCount);
    totalAmount =
      totalAmount - prevCount * ticket.amount + newCount[id] * ticket.amount;
    setTotal(Math.abs(totalAmount));
    setTicketCount(newCount[id], ticket.id);
    return Math.max(0, parseInt(value)) || 0;
  }

  return (
    <Stack gap={4}>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 750, tableLayout: "fixed" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow sx={{ th: { fontWeight: "900" } }}>
              {headers?.map((head, index) =>
                index === 0 ? (
                  <TableCell component="th" key={head}>
                    {head}
                  </TableCell>
                ) : (
                  <TableCell component="th" align="center" key={head}>
                    {head}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets?.map((ticket: any, i) => {
              return (
                <TableRow
                  key={ticket.id}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell align="left">{ticket.text}</TableCell>
                  <TableCell align="center">
                    {splitAmountWithComma(ticket.amount, 1)}
                  </TableCell>
                  <TableCell align="center">
                    <NumberField
                      value={isNaN(count[i]) ? 0 : count[i]}
                      onChange={(e) => handleInput(e, i, ticket)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {splitAmountWithComma(ticket.amount, count[i])}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          placeContent: "end",
        }}
      >
        <Stack gap={8} direction={"row"}>
          <Typography fontWeight="900" fontSize="larger">
            {t("ticketpurchase.total")}
          </Typography>
          <Typography fontWeight="900" fontSize="larger" minWidth="10rem">
            {isNaN(total) ? 0 : splitAmountWithComma(total, 1)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

const Ticket = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [ticketObj, setTicketObj] = useState<Record<string, number>>({});
  const [ticket, setTicket] = useState<{
    purchasedTicketCount: Array<number>;
    tickets: any[];
    isDisabled: boolean;
  }>({
    purchasedTicketCount: [],
    tickets: [],
    isDisabled: false,
  });

  useEffect(() => {
    ticketService
      .getTicketTypes()
      .then((response) => {
        let res: any[] =
          response?.data?.data !== null ? response?.data?.data! : [];
        setTicket((prev) => ({
          ...prev,
          tickets: res,
        }));
        const resObj = res?.reduce((result: Record<string, number>, item) => {
          const key = item?.id;
          result[key] = 0;
          return result;
        }, {});
        setTicketObj(resObj);
      })
      .catch((error) => {
        console.log("Error occured: token blacklisted: ", error);
      });
  }, []);

  const setTicketsObj = (count: number, key: string) => {
    setTicketObj((prev) => ({ ...prev, [key]: count }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (totalAmount === 0) return;
    const ticketsPurchased = Object.keys(ticketObj)?.map((key) => ({
      ticketTypeId: key,
      count: ticketObj[key],
    }));
    setTicket((prev) => ({ ...prev, isDisabled: true }));
    let data = JSON.stringify({
      purchasedAmount: totalAmount,
      tickets: ticketsPurchased,
    });
    ticketService
      .purchaseTickets(data)
      .then((response) => {
        console.log(response);
        dispatch(updateTotalAmount(response?.data?.data?.totalAmount));
        setTicket((prev) => ({ ...prev, isDisabled: false }));
        router.push("/app/payment");
      })
      .catch((error) => {
        console.log("Error occured: ", error);
      });
  };

  return (
    <Stack gap={5}>
      <Typography variant="h6" noWrap component="div">
        {t("ticketpurchase.title")}
      </Typography>
      <TicketTable tickets={ticket.tickets} setTicketCount={setTicketsObj} />
      <Stack direction="row" sx={{ display: "flex", placeContent: "center" }}>
        <Stack alignItems="center" gap={3}>
          <Button
            onClick={(e) => handleSubmit(e)}
            variant="contained"
            disabled={ticket.isDisabled}
            sx={{
              width: "10rem",
              background: "#162987 !important",
              color: "white !important",
            }}
          >
            {t("ticketpurchase.button.buy")}
          </Button>
          <Link href="/app/campaign" className="redirectLink">
            {t("ticketpurchase.toppage")}
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Ticket;
