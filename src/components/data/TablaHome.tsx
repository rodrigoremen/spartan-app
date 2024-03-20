import React from "react";
const columns = [
    { name: "ID", uid: "id" },
    { name: "COTIZACIÓN", uid: "name" },
    { name: "PROYECTO", uid: "project" },
    { name: "FECHA DE INICIO", uid: "start" },
    { name: "FECHA DE ENTREGA", uid: "end" },
    { name: "AVANCE", uid: "status" },
    { name: "RESPONSABLE", uid: "person" },
    { name: "ACCIONES", uid: "actions" },
];

const users = [
    {
        id: 1,
        name: "MFS-180",
        project: "Reingeniería PTAR UTEZ",
        start: "05-feb-24",
        end: "18-mar-24",
        status: "50%",
        person: "Arq. Angel Contreras",
    },
    {
        id: 1,
        name: "Angel",
        project: "Reingeniería PTAR UTEZ",
        start: "05-feb-24",
        end: "18-mar-24",
        status: "50%",
        person: "Arq. Angel Contreras",
    },
    {
        id: 1,
        name: "Rodrigo",
        project: "Reingeniería PTAR UTEZ",
        start: "05-feb-24",
        end: "18-mar-24",
        status: "50%",
        person: "Arq. Angel Contreras",
    },
    {
        id: 1,
        name: "MFS-180",
        project: "Reingeniería PTAR UTEZ",
        start: "05-feb-24",
        end: "18-mar-24",
        status: "50%",
        person: "Arq. Angel Contreras",
    },
    {
        id: 5,
        name: "MFS-180",
        project: " UTEZ",
        start: "05-feb-24",
        end: "18-mar-24",
        status: "50%",
        person: "Arq. Angel Contreras",
    },
    {
        id: 7,
        name: "MFS-180",
        project: " PTAR ",
        start: "05-feb-24",
        end: "18-mar-24",
        status: "50%",
        person: "Arq. Angel Contreras",
    },
    {
        id: 9,
        name: "MFS-180",
        project: "Reingeniería PTAR UTEZ",
        start: "05-feb-24",
        end: "18-mar-24",
        status: "50%",
        person: "Arq. Angel Contreras",
    },
];

export { columns, users };

