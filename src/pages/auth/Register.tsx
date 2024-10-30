import { Anchor, Box, Button, Center, Paper, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRegister } from "../../common/api/tanstack/auth.tanstack";
import { Logo } from "../../common/components/logo/Logo";
import { ROUTER } from "../../constant/router.constant";
import rootRouter from "../../routes/rootRouter";
import { TRegisterReq } from "../../types/user.type";
import classes from "./Auth.module.css";

export default function Register() {
   const register = useRegister();

   const loginForm = useFormik<TRegisterReq>({
      initialValues: {
         full_name: "",
         email: "",
         pass_word: "",
      },
      validationSchema: Yup.object().shape({
         full_name: Yup.string().trim().required("Username is required."),
         email: Yup.string().trim().email().required(),
         pass_word: Yup.string().trim().required("Password is required."),
      }),
      onSubmit: async (valuesRaw) => {
         const payload = {
            full_name: valuesRaw.full_name.trim(),
            email: valuesRaw.email.trim(),
            pass_word: valuesRaw.pass_word.trim(),
         };
         console.log(payload);

         register.mutate(payload);
      },
   });

   return (
      <Box className={`${classes.wrapForm}`} style={{ animation: "fadeInUp 0.5s" }} px={`md`}>
         <Center>
            <Logo />
         </Center>
         <Title mt={20} ta="center" style={{ fontFamily: `Greycliff CF,   var(--mantine-font-family)`, fontWeight: `900` }}>
            Register!
         </Title>

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
                  label="Full name"
                  placeholder="Full name"
                  name="full_name"
                  value={loginForm.values.full_name}
                  onChange={loginForm.handleChange}
                  error={loginForm.touched.full_name && loginForm.errors.full_name}
                  inputWrapperOrder={["label", "input", "error"]}
                  style={{ height: `90px` }}
               />
               <TextInput
                  withAsterisk
                  label="Email"
                  placeholder="email"
                  name="email"
                  value={loginForm.values.email}
                  onChange={loginForm.handleChange}
                  error={loginForm.touched.email && loginForm.errors.email}
                  inputWrapperOrder={["label", "input", "error"]}
                  style={{ height: `90px` }}
               />
               <PasswordInput
                  label="Password"
                  placeholder="Your pass_word"
                  withAsterisk
                  name="pass_word"
                  value={loginForm.values.pass_word}
                  onChange={loginForm.handleChange}
                  error={loginForm.touched.pass_word && loginForm.errors.pass_word}
                  inputWrapperOrder={["label", "input", "error"]}
                  style={{ height: `90px` }}
               />
            </Box>
            <Button loading={register.isPending} type="submit" fullWidth style={{ flexShrink: `0` }}>
               Register
            </Button>
         </Paper>

         <Text ta="center" mt="md">
            Don&apos;t have an account?{" "}
            <Anchor<"a">
               href="#"
               fw={700}
               onClick={(event) => {
                  event.preventDefault();
                  rootRouter.navigate(ROUTER.LOGIN);
               }}
            >
               Login
            </Anchor>
         </Text>
      </Box>
   );
}
