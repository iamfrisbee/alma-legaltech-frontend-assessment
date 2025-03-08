'use client';

import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import { SectionHeader, SectionIcon, SectionTitle } from '../../lib/components/SectionHeader';

export default function Confirmation() {
  return (
    <div>
      <SectionHeader>
        <SectionIcon icon={['fas', 'circle-info']} />
        <SectionTitle>Thank you</SectionTitle>
        <Typography>
          Your information was submitted to our team of immigration attorneys.
          Expect and email from hello@tryalma.ai.
        </Typography>
        <Button component={Link} href="/" variant="contained">
          Go back to home
        </Button>
      </SectionHeader>
    </div>
  );
}
