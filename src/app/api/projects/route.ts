import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request: Request) {
	const data = await request.json();

	const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message : 'Unauthorized' }, { status: 401 });
    }

	const newProject = await prisma.project.create({
		data: {
			revision: parseFloat(data.revision),
			folio: data.folio,
			cliente: data.cliente,
			proyecto: data.proyecto,
			fechaEntrega: data.fechaEntrega,
			email: data.email,
			telefono: data.telefono,
			elaborado: data.elaborado,
			autorizado: data.autorizado,
			atencion: data.atencion,
			notas: data.notas,
			tiempoEntrega: data.tiempoEntrega,
			nota: data.nota,
			normas: data.normas,
			incluye: data.incluye,
			formaPago: data.formaPago,
			user: {
				connect: {
					id: parseInt(session?.user.id),
				},
			},
			servicios: {
				create: data.servicios.map((servicio: { cantidad: string; descripcion: any; precioUnitario: string; importe: string; }) => ({
					cantidad: parseFloat(servicio.cantidad),
					descripcion: servicio.descripcion,
					precioUnitario: parseFloat(servicio.precioUnitario),
					importe: parseFloat(servicio.importe),
				})),
			},
		},
	});

	return NextResponse.json(newProject, { status: 201 });
}
