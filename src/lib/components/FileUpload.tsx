import { ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ControlProps, rankWith, uiTypeIs } from '@jsonforms/core';
import { withJsonFormsAllOfProps } from '@jsonforms/react';
import { Button, Grid2, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const InvisibleFileInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
  bottom: 0,
  left: 0,
});

function FileUploadRenderer({
  data,
  handleChange,
  path,
  schema,
}: ControlProps) {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    handleChange(path, file);
  };

  return (
    <Grid2 container alignItems={'center'} spacing={2}>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={
          <FontAwesomeIcon
            width="25"
            height="25"
            icon={['fas', 'cloud-arrow-up']}
          />
        }
      >
        Upload File
        <InvisibleFileInput
          type="file"
          onChange={handleFileChange}
          multiple={schema.maxItems !== 1}
        />
      </Button>
      {data?.name && <Typography>{data.name}</Typography>}
    </Grid2>
  );
}

export default withJsonFormsAllOfProps(FileUploadRenderer);
export const FileUploadTester = rankWith(2, uiTypeIs('FileUpload'));
