import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { Prisma } from '@prisma/client';

export async function POST(request: Request) {
	const data = await request.json();

	const session = await getServerSession(authOptions);

	if (!session) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}
	try {
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
				avanceFinanciero: parseInt(data.avanceFinanciero),
				situacionGeneral: data.situacionGeneral,
				user: {
					connect: {
						id: parseInt(session?.user.id),
					},
				},
				servicios: {
					create: data.servicios.map(
						(servicio: {
							cantidad: string;
							descripcion: any;
							precioUnitario: string;
							importe: string;
						}) => ({
							cantidad: parseFloat(servicio.cantidad),
							descripcion: servicio.descripcion,
							precioUnitario: parseFloat(servicio.precioUnitario),
							importe: parseFloat(servicio.importe),
						})
					),
				},
				acuerdos: {
					create: data.acuerdos.map(
						(acuerdo: {
							objetivo: string;
							estado: string;
							fechaEntrega: any;
							responsable: string;
							observaciones: string;
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
					create: data.conceptos.map(
						(concepto: {
							concepto: string;
							status: string;
							tecnico: string;
							avance: any;
							fechaEstimada: string;
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
					create: data.actividades.map(
						(actividad: {
							actividad: string;
							fechaEstimada: string;
						}) => ({
							actividad: actividad.actividad,
							fechaEstimada: actividad.fechaEstimada,
						})
					),
				},
				problemas: {
					create: data.problemas.map(
						(problema: {
							problemas: string;
							respuesta: string;
						}) => ({
							problemas: problema.problemas,
							respuesta: problema.respuesta,
						})
					),
				},
			},
		});
		return NextResponse.json(newProject, { status: 201 });
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				return NextResponse.json(
					{ error: 'El folio ya existe' },
					{ status: 400 }
				);
			}
		}
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
