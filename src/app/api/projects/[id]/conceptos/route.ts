import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function POST(
    req: Request,
    { params }: { params: { id: string } }
) {
    const data = await req.json();
    console.log('Data received:', data);
    console.log('Params:', params.id);
    try {
        const concepto = await prisma.conceptos.create({
            data: {
                concepto: data.concepto,
                status: 'pendiente',
                projectId: parseInt(params.id),
            },
        });
        return NextResponse.json(concepto);
    } catch (error) {
        console.error('Error creating concepto', error);
        return NextResponse.json(
            { error: 'Error creating concepto' },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    const data = await req.json(); 
    console.log('Data received:', data);
    console.log('Params:', params.id)
    try {
        const concepto = await prisma.conceptos.update({
            where: {
                id: parseInt(params.id),
            },
            data: {
                tecnico: data.tecnico,
                avance: parseInt(data.avance),
                fechaEstimada: data.fechaEstimada,
            },
        });
        return NextResponse.json(concepto);
    } catch (error) {
        console.error('Error updating concepto', error);
        return NextResponse.json(
            { error: 'Error updating concepto' },
            { status: 500 }
        );
    }
}

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const conceptos = await prisma.conceptos.findMany({
            where: {
                projectId: parseInt(params.id),
            },
        });
        return NextResponse.json(conceptos);
    } catch (error) {
        console.error('Error getting conceptos', error);
        return NextResponse.json(
            { error: 'Error getting conceptos' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request
) {
    const data = await req.json();
    try {
        const concepto = await prisma.conceptos.delete({
            where: {
                id: parseInt(data.id),
            },
        });
        return NextResponse.json(concepto);
    } catch (error) {
        console.error('Error deleting concepto', error);
        return NextResponse.json(
            { error: 'Error deleting concepto' },
            { status: 500 }
        );
    }
}