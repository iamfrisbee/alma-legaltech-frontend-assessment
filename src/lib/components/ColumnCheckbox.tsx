import { ControlProps, JsonSchema7, rankWith, uiTypeIs } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';

function ColumnCheckboxRenderer({
  data,
  handleChange,
  path,
  schema,
}: ControlProps) {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Array.isArray(data) ? [...data] : [];
    if (event.target.checked) {
      newValue.push(event.target.value);
    } else {
      newValue.splice(newValue.indexOf(event.target.value), 1);
    }
    handleChange(path, newValue);
  };

  return (
    <FormControl component="fieldset">
      <FormGroup row={false}>
        {(schema.items as JsonSchema7).enum?.map((option: string) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={!!data?.includes(option)}
                onChange={handleCheckboxChange}
                value={option}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

export default withJsonFormsControlProps(ColumnCheckboxRenderer);
export const ColumnCheckboxTester = rankWith(2, uiTypeIs('ColumnCheckbox'));
