import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function PUT(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const data = await req.json();
	console.log('Data received:', data);
    console.log('Params:', params.id);
	try {
		const acuerdo = await prisma.acuerdos.update({
			where: {
				id: parseInt(params.id),
			},
			data: {
                responsable: data.responsable,
                observaciones: data.observaciones,
            },
		});
        return NextResponse.json(acuerdo);
	} catch (error) {
		console.error('Error updating acuerdos', error);
		return NextResponse.json(
			{ error: 'Error updating acuerdos' },
			{ status: 500 }
		);
	}
}

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const acuerdos = await prisma.acuerdos.findMany({
			where: {
				projectId: parseInt(params.id),
			},
		});
		return NextResponse.json(acuerdos);
	} catch (error) {
		console.error('Error getting acuerdos', error);
		return NextResponse.json(
			{ error: 'Error getting acuerdos' },
			{ status: 500 }
		);
	}
}

