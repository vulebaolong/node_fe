// PasswordInputCustom.js
import { PasswordInput, PasswordInputProps } from "@mantine/core";
import { IconEyeCheck, IconEyeOff } from "@tabler/icons-react"; // Import icon theo đúng đường dẫn của bạn

const CustomPasswordInput = (props: PasswordInputProps) => {
  return (
    <PasswordInput
      {...props} // Sử dụng để truyền các props khác từ nơi gọi
      visibilityToggleIcon={({ reveal }) =>
        reveal ? (
          <IconEyeCheck style={{ width: "var(--psi-icon-size)", height: "var(--psi-icon-size)" }} />
        ) : (
          <IconEyeOff style={{ width: "var(--psi-icon-size)", height: "var(--psi-icon-size)" }} />
        )
      }
    />
  );
};

export default CustomPasswordInput;
