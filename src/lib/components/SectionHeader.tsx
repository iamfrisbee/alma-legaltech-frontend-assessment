import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { rankWith, RendererProps, uiTypeIs } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Stack, Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SectionHeader = styled(Stack)({
  marginTop: '2rem',
  marginBottom: '2rem',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '2rem',
});

export const SectionIcon = styled(FontAwesomeIcon)({
  width: 50,
  height: 50,
  color: 'var(--lavender)',
});

export const SectionTitle = styled(Typography)<TypographyProps>({
  fontSize: '1.5rem',
  fontWeight: 'bold',
});

function SectionHeaderRenderer({ uischema }: RendererProps) {
  const { title, description, icon } = uischema.options || {};

  return (
    <SectionHeader>
      <SectionIcon icon={['fas', icon]} />
      <SectionTitle component="h2">{title}</SectionTitle>
      {description && <Typography>{description}</Typography>}
    </SectionHeader>
  );
}

export default withJsonFormsControlProps(SectionHeaderRenderer);
export const sectionHeaderTester = rankWith(3, uiTypeIs('SectionHeader'));
