'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import ColumnCheckboxRenderer, { ColumnCheckboxTester } from '@/lib/components/ColumnCheckbox';
import FileUploadRenderer, { FileUploadTester } from '@/lib/components/FileUpload';
import SectionHeaderRenderer, { sectionHeaderTester } from '@/lib/components/SectionHeader';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { Alert, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import schema from './schema.json';
import uischema from './uischema.json';

const Header = styled('header')({
  backgroundColor: 'var(--green)',
  height: '15rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '2rem',
  padding: '2rem',
});

const HeaderTitle = styled('h1')({
  fontSize: '3rem',
  fontWeight: 'bold',
  margin: 0,
});

const FormContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  maxWidth: 600,
  padding: '2rem',
  margin: '2rem auto',
  gap: '1rem',
});

export default function VisaForm() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<any>({});
  const [error, setError] = useState<string>();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in data) {
      if (!data[key]) {
        continue;
      }

      if (data[key] instanceof File) {
        formData.append(key, data[key]);
      } else {
        formData.append(key, JSON.stringify(data[key]));
      }
    }

    const resp = await fetch('/api/leads', {
      method: 'PUT',
      body: formData,
    });

    if (resp.ok) {
      router.push('/confirmation');
    }

    setError(resp.statusText);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <Header>
        <Link href="/">
          <Image src="/alma.svg" alt="Alma" width="50" height="25" />
        </Link>
        <HeaderTitle>Get an assessment of your immigration case</HeaderTitle>
      </Header>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <JsonForms
            schema={schema}
            uischema={uischema}
            data={data}
            renderers={[
              ...materialRenderers,
              {
                tester: ColumnCheckboxTester,
                renderer: ColumnCheckboxRenderer,
              },
              { tester: sectionHeaderTester, renderer: SectionHeaderRenderer },
              { tester: FileUploadTester, renderer: FileUploadRenderer },
            ]}
            cells={materialCells}
            onChange={({ data }) => setData(data)}
            validationMode="ValidateAndShow"
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </FormContainer>
      </form>
    </div>
  );
}
