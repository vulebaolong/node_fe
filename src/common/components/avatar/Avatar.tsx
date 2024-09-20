import { Avatar as AvatarMantine, AvatarProps } from "@mantine/core";
import { forwardRef } from "react";
import { TUser } from "../../../types/user.type";
import { checkPathAvatar } from "../../../helpers/function.helper";

type TProps = {
   user?: TUser | null;
} & AvatarProps;

export const Avatar = forwardRef<HTMLDivElement, TProps & React.ComponentPropsWithoutRef<"div">>(({ user, ...props }, ref) => {
   return (
      <AvatarMantine
         style={{ outline: user?.role_id === 2 ? `2px solid var(--mantine-color-red-filled)` : `unset` }}
         {...props}
         ref={ref}
         alt="avatar"
         src={checkPathAvatar(user?.avatar)}
         color={`initials`}
         name={!user?.avatar ? (user?.full_name as string | undefined) : undefined}
      />
   );
});
