import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

interface TablaServiciosProps {
  servicios: any[];
  eliminarServicios: () => void;
}

function TablaServicios({ servicios, eliminarServicios }: TablaServiciosProps) {
  return (
    <Table aria-label="Example empty table">
      <TableHeader>
        <TableColumn>Partida</TableColumn>
        <TableColumn>Descripción</TableColumn>
        <TableColumn>Cantidad</TableColumn>
        <TableColumn>Precio unitario</TableColumn>
        <TableColumn>Importe</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No hay servicios agregados"}>
        {servicios.map((servicio, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{servicio.descripcion}</TableCell>
            <TableCell>{servicio.cantidad}</TableCell>
            <TableCell>${servicio.precioUnitario}</TableCell>
            <TableCell>${servicio.importe}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}


export default TablaServicios