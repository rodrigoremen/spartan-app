import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function POST(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const data = await req.json();
	console.log('Data received:', data);

	if (
		!Array.isArray(data.tarea) ||
		data.tarea.some(
			(t: { titulo: any; descripcion: any; avance: undefined }) =>
				!t.titulo || !t.descripcion || t.avance === undefined
		)
	) {
		type ErrorResponse = {
			message: string;
		};

		return NextResponse.json<ErrorResponse>(
			{ message: 'Por favor, proporciona todos los datos necesarios.' },
			{ status: 400 }
		);
	}

	try {
		const newAvances = await prisma.$transaction(
			data.tarea.map((tarea: any) => {
				return prisma.avanceInstalacion.upsert({
					where: { id: tarea.id || '' }, 
					update: {
						titulo: tarea.titulo,
						descripcion: tarea.descripcion,
						avance: tarea.avance,
					},
					create: {
						id: tarea.id || undefined,
						titulo: tarea.titulo,
						descripcion: tarea.descripcion,
						avance: tarea.avance,
						projectId: parseInt(params.id),
					},
				});
			})
		);

		console.log('New Avances created:', newAvances);
		return NextResponse.json(newAvances, { status: 201 });
	} catch (error) {
		console.error('Error al crear el avance:', error);
		return NextResponse.json(
			{ message: 'Error al crear el avance', error },
			{ status: 500 }
		);
	}
}

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const avances = await prisma.avanceInstalacion.findMany({
		where: {
			projectId: parseInt(params.id),
		},
	});
	if (!avances) {
		return NextResponse.json(
			{ message: 'No se encontraron avances' },
			{ status: 404 }
		);
	}
	return NextResponse.json(avances);
}

export async function DELETE(req: Request) {
	const data = await req.json();
	console.log('Data received:', data);

	try {
		await prisma.avanceInstalacion.delete({ where: { id: data.id } });
		return NextResponse.json(
			{ message: 'Tarea eliminada exitosamente' },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error al eliminar la tarea:', error);
		return NextResponse.json(
			{ message: 'Error al eliminar la tarea' },
			{ status: 500 }
		);
	}
}
