import { MenuItem, TextField } from "@material-ui/core";
import { useController } from "react-hook-form";

const MySelect = ({
  control,
  name,
  rules,
  label,
  fullWidth,
  options,
  onClick,
  onChangeCallback,
}: any) => {
  const { field } = useController({
    name: name,
    control: control,
    rules: rules,
  });

  const mapOptions = options.map((item) => (
    <MenuItem
      onClick={onClick ? () => onClick(item) : undefined}
      key={item.value}
      value={item.value}
      disabled={item?.disabled || false}
    >
      {item.label}
    </MenuItem>
  ));

  return (
    <TextField
      {...field}
      label={label}
      fullWidth={fullWidth}
      select
      onChange={(e) => {
        field.onChange(e);

        onChangeCallback && onChangeCallback(e.target.value);
      }}
    >
      {mapOptions}
    </TextField>
  );
};

export default MySelect;
