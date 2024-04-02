import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import { Prisma } from '@prisma/client';

export async function GET(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const project = await prisma.project.findUnique({
		where: {
			id: parseInt(params.id),
		},
		include: {
			servicios: true,
			acuerdos: true,
			conceptos: {
				include: {
					photos: true,
				},
			},
			actividades: true,
			problemas: true,
		},
	});
	if (!project) {
		return NextResponse.json({ error: 'Project not found' }, { status: 404 });
	}
	return NextResponse.json(project);
}

export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const projectDelete = await prisma.project.delete({
			where: {
				id: parseInt(params.id),
			},
		});
		return NextResponse.json(projectDelete);
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2025') {
				return NextResponse.json(
					{ error: 'Project not found' },
					{ status: 404 }
				);
			}
		}

		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const data = await request.json();

	const serviciosData = data.servicios || [];
	delete data.servicios;

	const acuerdosData = data.acuerdos || [];
	delete data.acuerdos;

	const projectUpdate = await prisma.project.update({
		where: {
			id: parseInt(params.id),
		},
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
			avanceFinanciero: parseInt(data.avanceFinanciero),
			avanceProduccion: parseInt(data.avanceProduccion),
			avanceInstalacion: parseInt(data.avanceInstalacion),
			situacionGeneral: data.situacionGeneral,
			servicios: {
				deleteMany: [{ projectId: parseInt(params.id) }], // Borra todos los servicios actuales
				create: serviciosData.map(
					(servicio: {
						cantidad: any;
						descripcion: any;
						precioUnitario: any;
						importe: any;
					}) => ({
						cantidad: parseFloat(servicio.cantidad),
						descripcion: servicio.descripcion,
						precioUnitario: parseFloat(servicio.precioUnitario),
						importe: parseFloat(servicio.importe),
					})
				),
			},
			acuerdos: {
				deleteMany: [{ projectId: parseInt(params.id) }], // Borra todos los acuerdos actuales
				create: acuerdosData.map(
					(acuerdo: {
						objetivo: any;
						estado: any;
						fechaEntrega: any;
						responsable: any;
						observaciones: any;
					}) => ({
						objetivo: acuerdo.objetivo,
						estado: acuerdo.estado,
						fechaEntrega: acuerdo.fechaEntrega,
						responsable: acuerdo.responsable,
						observaciones: acuerdo.observaciones,
					})
				),
			},
			conceptos: {
				deleteMany: [{ projectId: parseInt(params.id) }], // Borra todos los conceptos actuales
				create: data.conceptos.map(
					(concepto: {
						concepto: any;
						status: any;
						tecnico: any;
						avance: any;
						fechaEstimada: any;
					}) => ({
						concepto: concepto.concepto,
						status: concepto.status,
						tecnico: concepto.tecnico,
						avance: parseInt(concepto.avance),
						fechaEstimada: concepto.fechaEstimada,
					})
				),
			},
			actividades: {
				deleteMany: [{ projectId: parseInt(params.id) }], // Borra todas las actividades actuales
				create: data.actividades.map(
					(actividad: { actividad: any; tiempoEntrega: any }) => ({
						actividad: actividad.actividad,
						tiempoEntrega: actividad.tiempoEntrega,
					})
				),
			},
			problemas: {
				deleteMany: [{ projectId: parseInt(params.id) }], // Borra todos los problemas actuales
				create: data.problemas.map(
					(problema: { problemas: string; respuesta: string }) => ({
						problemas: problema.problemas,
						respuesta: problema.respuesta,
					})
				),
			},
		},
	});

	return NextResponse.json(projectUpdate);
}
