import fs from 'fs';
import { NextRequest } from 'next/server';
import path from 'path';
import client from '@/lib/client';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const tmpDir = path.resolve(__dirname, '../../../../tmp');

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const search = params.get('search');
  const status = params.get('status');
  const page = params.get('page');
  let orderByField = params.get('orderBy');
  const order = params.get('order');

  let orderBy = orderByField && [{ [orderByField]: order }];
  if (orderByField === 'name') {
    (orderBy = [{ firstName: order }]), [{ lastName: order }];
  }

  let where = {};
  if (search) {
    where = {
      OR: [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { email: { contains: search } },
        { country: { contains: search } },
        { message: { contains: search } },
      ],
    };
  }

  if (status) {
    where = { ...where, status };
  }

  const leads = await client.lead.findMany({
    where,
    ...(orderBy && { orderBy }),
    skip: page ? parseInt(page) * 5 : 0,
    take: 5,
  });

  const count = await client.lead.count({ where });

  return new Response(JSON.stringify({ leads, count }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });
}

export async function PUT(request: NextRequest) {
  const data = await request.formData();
  const cv = data.get('cv') as File | null;

  const firstName = data.get('firstName')?.toString() ?? null;
  const lastName = data.get('lastName')?.toString() ?? null;
  const email = data.get('email')?.toString() ?? null;
  const country = data.get('country')?.toString() ?? null;
  const message = data.get('message')?.toString() ?? null;

  if (!firstName || !lastName || !email || !country || !message) {
    return new Response('Missing fields', { status: 400 });
  }

  const lead = {
    firstName,
    lastName,
    email,
    country,
    message,
    cv: cv ? cv.name : null,
  };

  const saved = await client.lead.create({ data: lead });

  if (cv) {
    const cvPath = path.join(tmpDir, `${saved.id}-${cv.name}`);
    const cvStream = fs.createWriteStream(cvPath);
    const buffer = Buffer.from(await cv.arrayBuffer());
    cvStream.write(buffer);
    cvStream.end();
  }

  return new Response(JSON.stringify(lead), {
    status: 201,
    headers: {
      'content-type': 'application/json',
    },
  });
}
