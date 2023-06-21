import { TextField } from "@material-ui/core";
import { useController } from "react-hook-form";

const MyTextField = ({
  control,
  name,
  rules,
  label,
  fullWidth,
  multiline,
  type,
  placeholder,
  autoFocus,
  required,
  id,
  maxlength,
}: any) => {
  const { field } = useController({
    name: name,
    control: control,
    rules: rules,
  });

  const onChangeInput = (e) => {
    field.onChange(e);
  };

  return (
    <TextField
      id={id}
      name={field.name}
      value={field.value}
      onBlur={field.onBlur}
      inputRef={field.ref}
      required={required}
      onChange={onChangeInput}
      autoFocus={autoFocus}
      type={type || "text"}
      placeholder={placeholder}
      autoCapitalize="none"
      label={label}
      fullWidth={fullWidth}
      multiline={multiline}
      autoComplete="off"
    />
  );
};

export default MyTextField;
