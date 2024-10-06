import {
   ActionIcon,
   Anchor,
   Box,
   Button,
   Center,
   Container,
   Divider,
   Group,
   Paper,
   PinInput,
   rem,
   Stack,
   Text,
   TextInput,
   Title,
   Transition,
} from "@mantine/core";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useCheck2FaBeforeLogin, useLogin } from "../../common/api/tanstack/auth.tanstack";
import { FacebookButton } from "../../common/components/buttons/FacebookButton";
import { GoogleButton } from "../../common/components/buttons/GoogleButton";
import { Logo } from "../../common/components/logo/Logo";
import CustomPasswordInput from "../../common/components/password-input/CustomPasswordInput";
import { ROUTER } from "../../constant/router.constant";
import { setAccessToken, setDeviceId, setRefreshToken } from "../../helpers/auth.helper";
import { resError } from "../../helpers/function.helper";
import rootRouter from "../../routes/rootRouter";
import { UPDATE_IS_LOGIN } from "../../store/slices/user/user.slice";
import { useAppDispatch } from "../../store/store";
import { TLoginReq, TLoginRes } from "../../types/user.type";
import { useState } from "react";
import { IconArrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { TRes } from "../../types/app.type";
import classes from "./Auth.module.css";

export default function Login() {
   const [step, setStep] = useState<`login` | `2 fa`>(`login`);

   const login = useLogin();
   const check2FaBeforeLogin = useCheck2FaBeforeLogin();
   const dispatch = useAppDispatch();

   const hanldeSuccess = (result: TRes<TLoginRes>) => {
      setAccessToken(result.metaData.accessToken);
      setRefreshToken(result.metaData.refreshToken);
      setDeviceId(result.metaData.deviceId);
      dispatch(UPDATE_IS_LOGIN());
      toast.success(`Login successfully`);
      rootRouter.navigate(ROUTER.HOME);
   };

   const loginForm = useFormik<TLoginReq>({
      initialValues: {
         email: "",
         pass_word: "",
      },
      validationSchema: Yup.object().shape({
         email: Yup.string().trim().email().required(),
         pass_word: Yup.string().trim().required("Password is required."),
      }),
      onSubmit: async (valuesRaw) => {
         const payload = {
            email: valuesRaw.email.trim(),
            pass_word: valuesRaw.pass_word.trim(),
            // pass_word: encryptPassword(valuesRaw.pass_word.trim()),
         };

         console.log(payload);

         check2FaBeforeLogin.mutate(valuesRaw.email.trim(), {
            onSuccess: (is2Fa) => {
               if (is2Fa) {
                  setStep(`2 fa`);
               } else {
                  login.mutate(payload, {
                     onSuccess: (result) => {
                        hanldeSuccess(result);
                     },
                     onError: (error) => {
                        console.log(error);
                        toast.error(resError(error, `Login failed`));
                     },
                  });
               }
            },
            onError: (err) => { 
               toast.error(resError(err, `Check before login failed`))
             }
         });
      },
   });

   const login2FaForm = useFormik({
      initialValues: {
         token: "",
      },
      validationSchema: Yup.object().shape({
         token: Yup.string().trim().required("Code is required."),
      }),
      onSubmit: async (valuesRaw) => {
         const email = loginForm.values.email.trim();
         const pass_word = loginForm.values.pass_word.trim();

         const payload = {
            token: valuesRaw.token,
            email: email,
            pass_word: pass_word,
         };

         login.mutate(payload, {
            onSuccess: (result) => {
               hanldeSuccess(result);
            },
            onError: (error) => {
               console.log(error);
               toast.error(resError(error, `Login failed`));
            },
         });
      },
   });

   return (
      <Stack h={`100dvh`} justify="center" align="center">
         <Box className={`${classes.wrapForm}`} style={{ animation: "fadeInUp 0.5s" }} px={`md`}>
            <Center>
               <Logo />
            </Center>
            <Title mt={20} ta="center" style={{ fontFamily: `Greycliff CF,   var(--mantine-font-family)`, fontWeight: `900` }}>
               Welcome back!
            </Title>

            <Group grow mb="md" mt="md">
               <GoogleButton radius="xl">Google</GoogleButton>
               <FacebookButton radius="xl">Facebook</FacebookButton>
            </Group>

            <Divider label="Or continue with email" labelPosition="center" my="lg" />

            <Paper
               withBorder
               shadow="md"
               p={30}
               mt={30}
               radius="md"
               style={{
                  display: `flex`,
                  flexDirection: `column`,
                  justifyContent: `space-between`,
                  overflow: `hidden`,
               }}
            >
               <Box h={256}>
                  <Transition enterDelay={400} mounted={step === `login`} transition="slide-right" duration={400} timingFunction="ease">
                     {(styles) => (
                        <div style={{ ...styles, height: `100%` }}>
                           <Box
                              component="form"
                              onSubmit={(e) => {
                                 e.preventDefault();
                                 loginForm.handleSubmit();
                              }}
                           >
                              <Box h={200}>
                                 <TextInput
                                    withAsterisk
                                    label="Email"
                                    placeholder="Email"
                                    name="email"
                                    value={loginForm.values.email}
                                    onChange={loginForm.handleChange}
                                    error={loginForm.touched.email && loginForm.errors.email}
                                    inputWrapperOrder={["label", "input", "error"]}
                                    style={{ height: `90px` }}
                                 />
                                 <CustomPasswordInput
                                    label="Password"
                                    placeholder="Your password"
                                    withAsterisk
                                    name="pass_word"
                                    value={loginForm.values.pass_word}
                                    onChange={loginForm.handleChange}
                                    error={loginForm.touched.pass_word && loginForm.errors.pass_word}
                                    inputWrapperOrder={["label", "input", "error"]}
                                    style={{ height: `90px` }}
                                 />
                                 <Group justify="end">
                                    <Anchor
                                       onClick={() => {
                                          rootRouter.navigate(ROUTER.FORGOT_PASSWORD);
                                       }}
                                       type="button"
                                       component="button"
                                       size="sm"
                                    >
                                       Forgot password?
                                    </Anchor>
                                 </Group>
                              </Box>

                              <Button mt={20} loading={login.isPending} type="submit" fullWidth style={{ flexShrink: `0` }}>
                                 Login
                              </Button>
                           </Box>
                        </div>
                     )}
                  </Transition>

                  <Transition enterDelay={400} mounted={step === `2 fa`} transition="slide-left" duration={400} timingFunction="ease">
                     {(styles) => (
                        <div style={{ ...styles, height: `100%` }}>
                           <Box
                              component="form"
                              onSubmit={(e) => {
                                 e.preventDefault();
                                 login2FaForm.handleSubmit();
                              }}
                           >
                              <Stack h={200}>
                                 <Group justify="space-between">
                                    <Anchor
                                       onClick={() => {
                                          setStep(`login`);
                                       }}
                                       c="dimmed"
                                       size="sm"
                                    >
                                       <Center inline>
                                          <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                                          <Box ml={5}>Back to login</Box>
                                       </Center>
                                    </Anchor>
                                 </Group>
                                 <Title order={4} ta={`center`}>
                                    Two-factor Authentication
                                 </Title>
                                 <Text c={`dimmed`} ta={`center`}>
                                    Enter the code displayed in your authenticator app
                                 </Text>
                                 <Box>
                                    <Center>
                                       <PinInput
                                          length={6}
                                          name="token"
                                          value={login2FaForm.values.token}
                                          onChange={(e) => {
                                             login2FaForm.setFieldValue(`token`, e);
                                          }}
                                          error={!!(login2FaForm.touched.token && login2FaForm.errors.token)}
                                       />
                                    </Center>
                                    <Center>
                                       <Text
                                          c={`var(--input-asterisk-color, var(--mantine-color-error))`}
                                          style={{
                                             fontSize: `var(--input-error-size, calc(var(--mantine-font-size-sm) - calc(0.125rem * var(--mantine-scale))))`,
                                          }}
                                       >
                                          {login2FaForm.touched.token && login2FaForm.errors.token}
                                       </Text>
                                    </Center>
                                 </Box>
                              </Stack>
                              <Button mt={20} loading={login.isPending} type="submit" fullWidth style={{ flexShrink: `0` }}>
                                 Login 2FA
                              </Button>
                           </Box>
                        </div>
                     )}
                  </Transition>
               </Box>
            </Paper>

            <Text ta="center" mt="md">
               Don&apos;t have an account?{" "}
               <Anchor<"a">
                  href="#"
                  fw={700}
                  onClick={(event) => {
                     event.preventDefault();
                     rootRouter.navigate(ROUTER.REGISTER);
                  }}
               >
                  Register
               </Anchor>
            </Text>
         </Box>
      </Stack>
   );
}
