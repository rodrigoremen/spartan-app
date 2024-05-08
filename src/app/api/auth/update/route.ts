import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function PUT(request: Request) {
    const body = await request.json();
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                id: parseInt(body.id),
            },
        });

        if (!existingUser) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        const userUpdate = await prisma.user.update({
            where: {
                id: parseInt(body.id),
            },
            data: {
                email: body.email,
                name: body.name,
                lastName: body.lastName,
            },
        });
        return NextResponse.json(userUpdate);
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error 2 ' },
            { status: 500 }
        );
    }
}
