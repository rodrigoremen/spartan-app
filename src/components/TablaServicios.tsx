import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";


function TablaServicios({ servicios }: { servicios: any[] }) {
  return (
    <Table aria-label="Example empty table">
      <TableHeader>
        <TableColumn>Cantidad</TableColumn>
        <TableColumn>Descripción</TableColumn>
        <TableColumn>Precio unitario</TableColumn>
        <TableColumn>Importe</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No hay servicios agregados"}>
        {servicios.map((servicio, index) => (
          <TableRow key={index}>
            <TableCell>{servicio.cantidad}</TableCell>
            <TableCell>{servicio.descripcion}</TableCell>
            <TableCell>{servicio.precioUnitario}</TableCell>
            <TableCell>{servicio.importe}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}


export default TablaServicios