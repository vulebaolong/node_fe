import { ActionIcon, Anchor, Box, Button, Center, Group, Paper, PinInput, rem, Stack, Text, TextInput, Title, Transition } from "@mantine/core";
import { IconArrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useResetPassword, useSendEmail } from "../../common/api/tanstack/auth.tanstack";
import { Logo } from "../../common/components/logo/Logo";
import CustomPasswordInput from "../../common/components/password-input/CustomPasswordInput";
import { useCountdown } from "../../common/hooks/count-down.hooks";
import { ROUTER } from "../../constant/router.constant";
import { resError } from "../../helpers/function.helper";
import rootRouter from "../../routes/rootRouter";
import classes from "./Auth.module.css";

const timeStart = 60;

export default function ForgotPassword() {
   const [step, setStep] = useState(1);
   const { timeLeft, startCountdown } = useCountdown(timeStart, 0, "ForgotPassword");

   const sendEmail = useSendEmail();
   const resetPassword = useResetPassword();

   const forgotPasswordForm1 = useFormik({
      initialValues: {
         email: "",
      },
      validationSchema: Yup.object().shape({
         email: Yup.string().trim().email().required(),
      }),
      onSubmit: async (valuesRaw) => {
         const payload = {
            email: valuesRaw.email.trim(),
         };

         sendEmail.mutate(payload, {
            onSuccess: () => {
               setStep(2);
               toast.success(`Send code to email successfully`);
               startCountdown();
            },
            onError: (error) => {
               console.log(error);
               toast.error(resError(error, "Sending Code to email failed."));
            },
         });
      },
   });

   const forgotPasswordForm2 = useFormik({
      initialValues: {
         code: "",
         password: "",
         rePassword: "",
      },
      validationSchema: Yup.object().shape({
         code: Yup.string().trim().required("Code is required."),
         password: Yup.string().trim().required(`Password is required.`),
         rePassword: Yup.string()
            .matches(/^\S*$/, `Re-Password cannot contain spaces.`)
            .oneOf([Yup.ref("password"), "DoesNotMatchPassword"], `Passwords must match`)
            .required(`Re-enter Password is required.`),
      }),
      onSubmit: async (valuesRaw) => {
         if (forgotPasswordForm1.values.email === ``) {
            setStep(1);
            toast.warning(`Please enter email`);
            return;
         }

         const payload = {
            code: valuesRaw.code,
            email: forgotPasswordForm1.values.email,
            pass_word: valuesRaw.password,
         };

         console.log(payload);

         resetPassword.mutate(payload, {
            onSuccess: () => {
               rootRouter.navigate(ROUTER.LOGIN);
               toast.success("Forgot password successfully");
            },
            onError: (error) => {
               console.log(error);
               toast.error(resError(error, "Forgot password failed"));
            },
         });
      },
   });

   const renderStep1 = () => {
      return (
         <Stack
            component="form"
            onSubmit={(e) => {
               e.preventDefault();
               forgotPasswordForm1.handleSubmit();
            }}
         >
            <Box>
               <TextInput
                  withAsterisk
                  label="Email"
                  placeholder="Email"
                  name="email"
                  value={forgotPasswordForm1.values.email}
                  onChange={forgotPasswordForm1.handleChange}
                  error={forgotPasswordForm1.touched.email && forgotPasswordForm1.errors.email}
                  inputWrapperOrder={["label", "input", "error"]}
                  style={{ height: `90px` }}
               />
            </Box>
            <Group justify="space-between" wrap="nowrap">
               <Anchor
                  onClick={() => {
                     rootRouter.navigate(ROUTER.LOGIN);
                  }}
                  c="dimmed"
                  size="sm"
               >
                  <Center inline>
                     <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                     <Box ml={5}>Back</Box>
                  </Center>
               </Anchor>
               <Group wrap="nowrap">
                  <Button
                     leftSection={timeLeft > 0 ? <Text w={`25px`}>{timeLeft.toString().padStart(2, "0")}</Text> : undefined}
                     disabled={timeLeft > 0}
                     loading={sendEmail.isPending}
                     type="submit"
                     w={`140px`}
                  >
                     Send email
                  </Button>
                  <ActionIcon
                     onClick={() => {
                        setStep(2);
                     }}
                     variant="default"
                  >
                     <IconArrowNarrowRight style={{ width: rem(24), height: rem(24) }} />
                  </ActionIcon>
               </Group>
            </Group>
         </Stack>
      );
   };

   const renderStep2 = () => {
      return (
         <Stack
            component="form"
            onSubmit={(e) => {
               e.preventDefault();
               forgotPasswordForm2.handleSubmit();
            }}
         >
            <Box>
               <Group gap={2}>
                  <Text component="label">Code</Text>
                  <Text c={`var(--input-asterisk-color, var(--mantine-color-error))`}>*</Text>
               </Group>
               <Center>
                  <PinInput
                     name="code"
                     value={forgotPasswordForm2.values.code}
                     onChange={(e) => {
                        forgotPasswordForm2.setFieldValue(`code`, e);
                     }}
                     error={!!(forgotPasswordForm2.touched.code && forgotPasswordForm2.errors.code)}
                  />
               </Center>
               <Text
                  c={`var(--input-asterisk-color, var(--mantine-color-error))`}
                  style={{
                     fontSize: `var(--input-error-size, calc(var(--mantine-font-size-sm) - calc(0.125rem * var(--mantine-scale))))`,
                  }}
               >
                  {forgotPasswordForm2.touched.code && forgotPasswordForm2.errors.code}
               </Text>
            </Box>

            {/* new password */}
            <CustomPasswordInput
               label={`New Password`}
               placeholder={`Your password...`}
               withAsterisk
               name="password"
               value={forgotPasswordForm2.values.password}
               onChange={forgotPasswordForm2.handleChange}
               error={forgotPasswordForm2.touched.password && forgotPasswordForm2.errors.password}
               inputWrapperOrder={["label", "input", "error"]}
               style={{ height: `90px` }}
            />

            {/* re-password */}
            <CustomPasswordInput
               label={`Re-enter password`}
               placeholder={`Your password...`}
               withAsterisk
               name="rePassword"
               value={forgotPasswordForm2.values.rePassword}
               onChange={forgotPasswordForm2.handleChange}
               error={forgotPasswordForm2.touched.rePassword && forgotPasswordForm2.errors.rePassword}
               inputWrapperOrder={["label", "input", "error"]}
               style={{ height: `90px` }}
            />

            <Group justify="space-between">
               <Anchor
                  onClick={() => {
                     setStep(1);
                  }}
                  c="dimmed"
                  size="sm"
               >
                  <Center inline>
                     <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                     <Box ml={5}>Back to send email</Box>
                  </Center>
               </Anchor>
               <Button type="submit" loading={resetPassword.isPending}>
                  Reset password
               </Button>
            </Group>
         </Stack>
      );
   };

   return (
      <Stack h={`100dvh`} justify="center" align="center">
         <Box
            className={`${classes.wrapForm}`}
            style={{ animation: "fadeInUp 0.5s", height: step === 1 ? `350px` : `530px`, transition: `all .8s` }}
            px={`md`}
         >
            <Center>
               <Logo />
            </Center>

            <Title mt={20} ta="center" style={{ width: `100%`, fontFamily: `Greycliff CF,   var(--mantine-font-family)`, fontWeight: `900` }}>
               Forgot Password
            </Title>

            <Text c="dimmed" fz="sm" ta="center">
               Enter your email to get a reset link
            </Text>

            <Paper withBorder shadow="md" p={20} mt={30} radius="md" style={{ overflow: `hidden` }}>
               <Transition enterDelay={400} mounted={step === 1} transition="slide-right" duration={400} timingFunction="ease">
                  {(styles) => <div style={styles}>{renderStep1()}</div>}
               </Transition>

               <Transition enterDelay={400} mounted={step === 2} transition="slide-right" duration={400} timingFunction="ease">
                  {(styles) => <div style={styles}>{renderStep2()}</div>}
               </Transition>
            </Paper>
         </Box>
      </Stack>
   );
}
