'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { Alert, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import schema from './schema.json';
import uischema from './uischema.json';

interface LoginData {
  email: string;
  password: string;
}

const FormContainer = styled('div')({
  display: 'flex',
  backgroundColor: 'rgba(212,217,155)',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '1rem',
  maxWidth: 400,
  padding: '2rem',
  margin: '2rem auto',
  borderRadius: '1rem',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
});

export function LoginForm() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<LoginData>({
    email: 'admin@alma.com',
    password: 'admin',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = ({ data }: { data: LoginData }) => {
    setFormData(data);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const resp = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (resp.ok) {
      router.push('/admin');
    } else {
      setError('Invalid email or password');
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormContainer>
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={formData}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={handleChange}
          validationMode="ValidateAndShow"
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button type="submit">Login</Button>
      </FormContainer>
    </form>
  );
}

export default LoginForm;
