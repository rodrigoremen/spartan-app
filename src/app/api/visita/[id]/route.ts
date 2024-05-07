import {NextResponse} from 'next/server';
import prisma from '@/libs/prisma';
import {Prisma} from '@prisma/client';

export async function GET(
    req: Request,
    {params}: { params: { id: string } }
) {
    const visita = await prisma.visita.findUnique({
        where: {
            id: parseInt(params.id),
        }
    });
    if (!visita) {
        return NextResponse.json({error: 'Visita not found'}, {status: 404});
    }
    return NextResponse.json(visita);
}

export async function DELETE(
    req: Request,
    {params}: { params: { id: string } }
) {
    try {
        const visitaDelete = await prisma.visita.delete({
            where: {
                id: parseInt(params.id),
            },
        });
        return NextResponse.json(visitaDelete);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return NextResponse.json(
                    {error: 'Visita not found'},
                    {status: 404}
                );
            }
        }
        return NextResponse.json(
            {error: 'Internal server error'},
            {status: 500}
        );
    }
}

export async function PUT(
    request: Request,
    {params}: { params: { id: string } }
) {
    const body = await request.json();
    try {
        const visitaUpdate = await prisma.visita.update({
            where: {
                id: parseInt(params.id),
            },
            data: body,
        });
        return NextResponse.json(visitaUpdate);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return NextResponse.json(
                    {error: 'Visita not found'},
                    {status: 404}
                );
            }
        }
        return NextResponse.json(
            {error: 'Internal server error'},
            {status: 500}
        );
    }
}