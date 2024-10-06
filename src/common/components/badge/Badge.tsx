import { Badge as BadgeMantine, BadgeProps } from "@mantine/core";
import { forwardRef } from "react";
import { TUser } from "../../../types/user.type";
import { effectText } from "../../../helpers/motion.helper";

type TProps = {
   user?: TUser | null;
} & BadgeProps;

export const Badge = forwardRef<HTMLDivElement, TProps & React.ComponentPropsWithoutRef<"div">>(({ user, ...props }, ref) => {
   return (
      <BadgeMantine {...props} ref={ref} variant="outline" color={user?.role_id === 1 ? `red` : `blue`}>
         {effectText(user?.roles.name || ``)}
      </BadgeMantine>
   );
});
