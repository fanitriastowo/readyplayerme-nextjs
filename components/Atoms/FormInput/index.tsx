import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import { useField } from "formik";

interface FormInputProps {
  name: string;
  id: string;
  label: string;
  placeholder?: string;
  description?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
}

export default function FormInput({
  name,
  id,
  label,
  placeholder = "",
  description = "",
  isDisabled = false,
  isReadOnly = false,
}: FormInputProps) {
  const [, meta, { setValue }] = useField(name);

  return (
    <FormControl
      id={id}
      isInvalid={Boolean(meta.error && meta.touched)}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
    >
      <FormLabel>{label}</FormLabel>
      <Input
        type="text"
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
      {description && <FormHelperText>{description}</FormHelperText>}
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}
