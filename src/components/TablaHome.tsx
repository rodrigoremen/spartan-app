'use client';
import React, { useState, useMemo, useEffect } from 'react';
import {
	Table,
	Input,
	Pagination,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Tooltip,
	Chip,
	Button,
} from '@nextui-org/react';
import { EyeOpenIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

function ProjectsTable({ projects }: any) {
	const router = useRouter();
	const [query, setQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const filteredProjects = useMemo(() => {
		return projects.filter((project: any) =>
			project.proyecto.toLowerCase().includes(query.toLowerCase())
		);
	}, [query, projects]);

	useEffect(() => {
		const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
		if (currentPage > totalPages) {
			setCurrentPage(1);
		}
	}, [filteredProjects, currentPage]);

	const paginatedProjects = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		return filteredProjects.slice(startIndex, startIndex + itemsPerPage);
	}, [currentPage, filteredProjects]);

	const formatter = new Intl.DateTimeFormat('es-ES', { dateStyle: 'full' });

	return (
		<div>
			<Input
				isClearable
				placeholder="Buscar..."
				value={query}
				className="mb-4"
				onChange={(e) => setQuery(e.target.value)}
			/>
			<Table
				bottomContent={
					<div className="flex w-full justify-center">
						<Pagination
							isCompact
							showControls
							showShadow
							color="warning"
							page={currentPage}
							total={Math.ceil(filteredProjects.length / itemsPerPage)}
							onChange={(page) => setCurrentPage(page)}
						/>
					</div>
				}
			>
				<TableHeader>
					<TableColumn>Cotización</TableColumn>
					<TableColumn>Proyecto</TableColumn>
					<TableColumn>Fecha de inicio</TableColumn>
					<TableColumn>Fecha de entrega</TableColumn>
					<TableColumn>Avance</TableColumn>
					<TableColumn>Responsable</TableColumn>
					<TableColumn>Ver</TableColumn>
				</TableHeader>
				<TableBody emptyContent={"No hay proyectos registrados"}>
					{paginatedProjects.map((project: any, index: any) => (
						<TableRow key={index}>
							<TableCell>{project.folio}</TableCell>
							<TableCell>{project.proyecto}</TableCell>
							<TableCell>
								{project.fechaEntrega
									? formatter.format(new Date(project.fechaEntrega))
									: '--'}
							</TableCell>
							<TableCell>
								{project.acuerdos[0]?.fechaEntrega
									? formatter.format(
											new Date(project.acuerdos[0]?.fechaEntrega)
									  )
									: '--'}
							</TableCell>
							<TableCell>
								<Chip
									className="capitalize"
									color="warning"
									size="sm"
									variant="flat"
								>
									{project.estado}%
								</Chip>
							</TableCell>
							<TableCell>{project.acuerdos[0]?.responsable || null}</TableCell>
							<TableCell>
								<Tooltip content="Ver proyecto">
									<Button
										isIconOnly
										color="warning"
										variant="light"
										onPress={() =>
											router.push(`/dashboard/project/${project.id}`)
										}
										className="text-lg flex justify-center cursor-pointer active:opacity-50"
									>
										<EyeOpenIcon />
									</Button>
								</Tooltip>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

export default ProjectsTable;
