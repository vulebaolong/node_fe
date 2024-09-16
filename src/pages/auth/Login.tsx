import {
   Anchor,
   Box,
   Button,
   Center,
   Container,
   Divider,
   Group,
   Paper,
   Text,
   TextInput,
   Title,
} from "@mantine/core";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useLogin } from "../../common/api/tanstack/auth.tanstack";
import { FacebookButton } from "../../common/components/buttons/FacebookButton";
import { Default, WithMultipleApp } from "../../common/components/buttons/FacebookTest";
import { GoogleButton } from "../../common/components/buttons/GoogleButton";
import { Logo } from "../../common/components/logo/Logo";
import CustomPasswordInput from "../../common/components/password-input/CustomPasswordInput";
import { ROUTER } from "../../constant/router.constant";
import { setAccessToken, setRefreshToken } from "../../helpers/auth.helper";
import { resError } from "../../helpers/function.helper";
import rootRouter from "../../routes/rootRouter";
import { UPDATE_IS_LOGIN } from "../../store/slices/user/user.slice";
import { useAppDispatch } from "../../store/store";
import { TLoginReq } from "../../types/user.type";
import FacebookLogin from "@greatsumini/react-facebook-login";

export default function Login() {
   const login = useLogin();
   const dispatch = useAppDispatch();

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
         };
         console.log(payload);
         login.mutate(payload, {
            onSuccess: (result) => {
               setAccessToken(result.metaData.accessToken);
               setRefreshToken(result.metaData.refreshToken);
               dispatch(UPDATE_IS_LOGIN());
               toast.success(`Login successfully`);
               rootRouter.navigate(ROUTER.HOME());
            },
            onError: (error) => {
               console.log(error);
               toast.error(resError(error, `Login failed`));
            },
         });
      },
   });

   return (
      <Container size={420} style={{ paddingTop: `20vh`, animation: "fadeInUp 0.5s" }}>
         <Center>
            <Logo />
         </Center>
         <Title
            mt={20}
            ta="center"
            style={{ fontFamily: `Greycliff CF,   var(--mantine-font-family)`, fontWeight: `900` }}
         >
            Welcome back!
         </Title>

         {/* <Default /> */}
         {/* <WithMultipleApp /> */}

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
            }}
            component="form"
            onSubmit={(e) => {
               e.preventDefault();
               loginForm.handleSubmit();
            }}
         >
            <Box>
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
                        rootRouter.navigate(ROUTER.FORGOT_PASSWORD());
                     }}
                     type="button"
                     component="button"
                     size="sm"
                  >
                     Forgot password?
                  </Anchor>
               </Group>
            </Box>
            <Button
               mt={20}
               loading={login.isPending}
               type="submit"
               fullWidth
               style={{ flexShrink: `0` }}
            >
               Login
            </Button>
         </Paper>

         <Text ta="center" mt="md">
            Don&apos;t have an account?{" "}
            <Anchor<"a">
               href="#"
               fw={700}
               onClick={(event) => {
                  event.preventDefault();
                  rootRouter.navigate(ROUTER.REGISTER());
               }}
            >
               Register
            </Anchor>
         </Text>
      </Container>
   );
}
