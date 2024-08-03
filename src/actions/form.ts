'use server';

import prisma from '@/lib/prisma';
import { formSchema, FormSchemaType } from '@/schema/form';
import { currentUser } from '@clerk/nextjs/server';

class UserNotFoundErr extends Error {}

export async function GetFormStats() {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  const stats = prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      subimissions: true,
    },
  });

  const visits = (await stats)._sum.visits || 0;
  const subimissions = (await stats)._sum.subimissions || 0;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (subimissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;
  return {
    visits,
    subimissions,
    submissionRate,
    bounceRate,
  };
}

export async function CreateForm(data: FormSchemaType) {
  console.log('NAME ON SERVER', data.name);
  const validation = formSchema.safeParse(data);

  if (!validation) {
    throw new Error('form not valid');
  }
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name: data.name,
      description: data.description,
    },
  });

  if (!form) {
    throw new Error('Something went wrong');
  }

  return form;
}
export async function GetForms() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function GetFormById(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id: id,
    },
  });
}
