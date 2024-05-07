import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function POST(request: Request) {
  const data = await request.json();

    try {
        const newVisita = await prisma.visita.create({
        data: {
            titulo: data.titulo,
            proceso: data.proceso,
            lugar: data.lugar,
            gasto: data.gasto,
            norma: data.norma,
            visita: data.visita,
        },
        });
        return NextResponse.json(newVisita, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error al crear la visita" }, { status: 500 });
    }
}