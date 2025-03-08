import client from '@/lib/client';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const user = await client.user.findUnique({
    where: {
      email,
      password,
    },
  });

  if (!user) {
    return new Response('Invalid email or password', {
      status: 401,
    });
  }

  return new Response('Logged in', {
    status: 200,
    headers: {
      'Set-Cookie': `token=${user.id}; Path=/; HttpOnly`,
    },
  });
}
