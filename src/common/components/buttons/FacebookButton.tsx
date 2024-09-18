import FacebookLogin, { FacebookLoginClient } from "@greatsumini/react-facebook-login";
import { Button, ButtonProps } from "@mantine/core";
import { useLoginFacebook } from "../../api/tanstack/auth.tanstack";
import { TLoginFacebookReq } from "../../../types/facebook.type";
import { toast } from "react-toastify";
import { ROUTER } from "../../../constant/router.constant";
import { setAccessToken, setRefreshToken } from "../../../helpers/auth.helper";
import { resError } from "../../../helpers/function.helper";
import rootRouter from "../../../routes/rootRouter";
import { UPDATE_IS_LOGIN } from "../../../store/slices/user/user.slice";
import { useAppDispatch } from "../../../store/store";
import { useState } from "react";

function FacebookIcon(props: React.ComponentPropsWithoutRef<"svg">) {
   return (
      <svg
         {...props}
         style={{ width: "0.9rem", height: "0.9rem" }}
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 1024 1024"
         id="facebook"
      >
         <path
            fill="#1877f2"
            d="M1024,512C1024,229.23016,794.76978,0,512,0S0,229.23016,0,512c0,255.554,187.231,467.37012,432,505.77777V660H302V512H432V399.2C432,270.87982,508.43854,200,625.38922,200,681.40765,200,740,210,740,210V336H675.43713C611.83508,336,592,375.46667,592,415.95728V512H734L711.3,660H592v357.77777C836.769,979.37012,1024,767.554,1024,512Z"
         />
         <path
            fill="#fff"
            d="M711.3,660,734,512H592V415.95728C592,375.46667,611.83508,336,675.43713,336H740V210s-58.59235-10-114.61078-10C508.43854,200,432,270.87982,432,399.2V512H302V660H432v357.77777a517.39619,517.39619,0,0,0,160,0V660Z"
         />
      </svg>
   );
}

const appId = "379865718525321";

export function FacebookButton(props: ButtonProps & React.ComponentPropsWithoutRef<"button">) {
   const dispatch = useAppDispatch();
   const loginFacebook = useLoginFacebook();
   const [loading, setLoading] = useState(false);

   const handleFacebookLogin = () => {
      FacebookLoginClient.getProfile(
         (profile) => {
            console.log(profile);
            loginFacebook.mutate(profile as TLoginFacebookReq, {
               onSuccess: (result) => {
                  setAccessToken(result.metaData.accessToken);
                  setRefreshToken(result.metaData.refreshToken);
                  dispatch(UPDATE_IS_LOGIN());
                  // toast.success(`Login successfully`);
                  rootRouter.navigate(ROUTER.HOME);
               },
               onError: (error) => {
                  console.log(error);
                  toast.error(resError(error, `Login failed`));
               },
               onSettled: () => {
                  setLoading(false);
               },
            });
         },
         { fields: `name,email,picture` }
      );
   };

   return (
      <FacebookLogin
         appId={appId}
         initParams={{ version: "v16.0" }}
         onSuccess={() => {
            handleFacebookLogin();
         }}
         onFail={(error) => {
            console.log("Login Failed!", error);
            setLoading(false);
            toast.error(`Login facebook failed`);
         }}
         render={({ onClick }) => {
            return (
               <Button
                  loading={loading}
                  onClick={() => {
                     setLoading(true);
                     FacebookLoginClient.getLoginStatus((loginStatus) => {
                        if (loginStatus.status === "connected") {
                           handleFacebookLogin();
                        } else {
                           if (onClick) {
                              onClick();
                           }
                        }
                     });
                  }}
                  leftSection={<FacebookIcon />}
                  variant="default"
                  {...props}
               />
            );
         }}
      />
   );
}
