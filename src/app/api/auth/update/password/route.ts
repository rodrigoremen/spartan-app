import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import bcrypt from 'bcrypt';

export async function PUT(request: Request) {
    const body = await request.json();

    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(body.id),
        },
    });

    if (!user) {
        return NextResponse.json(
            { error: 'User not found' },
            { status: 404 }
        );
    }

    const validPassword = await bcrypt.compare(body.currentPassword, user.password);

    if (!validPassword) {
        return NextResponse.json(
            { error: 'Current password is incorrect' },
            { status: 401 }
        );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.newPassword, salt);

    const updatedUser = await prisma.user.update({
        where: {
            id: parseInt(body.id),
        },
        data: {
            password: hashedPassword,
        },
    });

    return NextResponse.json(updatedUser);
}