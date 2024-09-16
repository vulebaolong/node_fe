import {
   Anchor,
   Box,
   Button,
   Center,
   Container,
   Group,
   Paper,
   rem,
   Text,
   TextInput,
   Title,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Logo } from "../../common/components/logo/Logo";
import rootRouter from "../../routes/rootRouter";
import { ROUTER } from "../../constant/router.constant";

export default function ForgotPassword() {
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
         console.log(payload);
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
            Forgot your password?
         </Title>

         <Text c="dimmed" fz="sm" ta="center">
            Enter your email to get a reset link
         </Text>

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
            <Group justify="space-between">
               <Anchor onClick={() => { 
                  rootRouter.navigate(ROUTER.LOGIN())
                }} c="dimmed" size="sm">
                  <Center inline>
                     <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                     <Box ml={5}>Back to the login page</Box>
                  </Center>
               </Anchor>
               <Button loading={false} type="submit">
                  Reset password
               </Button>
            </Group>
         </Paper>
      </Container>
   );
}
