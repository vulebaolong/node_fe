import { GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleProvider({ children }: { children: React.ReactNode }) {
   return <GoogleOAuthProvider clientId="778735018481-9sghnkiusa0u98afc2o4dl5v2cqi71oq.apps.googleusercontent.com">{children}</GoogleOAuthProvider>;
}
