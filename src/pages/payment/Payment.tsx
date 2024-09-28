import { Button, NumberInput, Paper, Stack, Text, Title } from "@mantine/core";
import { IconCoin } from "@tabler/icons-react";
import { usePayMomo } from "../../common/api/tanstack/payment.tanstack";
import { useState } from "react";
import { toast } from "react-toastify";
import { resError } from "../../helpers/function.helper";

export default function Payment() {
   const [amount, setAmount] = useState(50000);
   const payMomo = usePayMomo();
   const handlePay = () => {
      payMomo.mutate(
         { amount },
         {
            onSuccess: (data) => {
               window.open(data.payUrl, "_blank");
            },
            onError: (err) => {
               toast.error(resError(err, `Pay momo failed`));
            },
         }
      );
   };
   return (
      <Paper shadow="lg" radius={"lg"} p={"lg"}>
         <Stack maw={`200px`}>
            <Title order={5}>MOMO</Title>
            <NumberInput
               leftSection={<IconCoin />}
               suffix=" VNĐ"
               placeholder="99999 VNĐ"
               value={amount}
               onChange={(value) => {
                  setAmount(Number(value));
               }}
               thousandSeparator=" "
            />
            <Text>Thuốc trị đau nhức xương khớp gia truyền 3 đời</Text>
            <Button loading={payMomo.isPending} disabled={payMomo.isPending} onClick={handlePay}>
               Pay
            </Button>
         </Stack>
      </Paper>
   );
}
