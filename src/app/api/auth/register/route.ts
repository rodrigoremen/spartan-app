import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function POST(request: Request) {
	const data = await request.json();
	console.log(data);

	const newUser = await prisma.user.create({
		data: {
			email: data.email,
			password: data.password,
			name: data.name,
			lastName: data.lastname,
		},
	});

	return NextResponse.json(newUser, { status: 201 });
}
