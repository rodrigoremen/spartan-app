import { Slider, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

type Tarea = {
    id?: string;
    titulo: string;
    descripcion: string;
    avance: number;
};

interface ModalAgregarAvanceProdProps {
    agregarTarea: (tarea: Tarea) => void;
}

const ModalAgregrarAvanceProd: React.FC<ModalAgregarAvanceProdProps> = ({ agregarTarea }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [avance, setAvance] = useState(0);

    const handleSubmit = () => {
        const newTarea = { id: uuidv4(), titulo, descripcion, avance };
        agregarTarea(newTarea);
        onOpenChange();
    };

    const handleSliderChange = (value : number | number[]) => {
        setAvance(Array.isArray(value) ? value[0] : value);
    };

    return (
        <>
            <Button
                onPress={onOpen}
                className='mt-4'
                color="warning"
                variant='flat'
                startContent={<PlusCircledIcon className='w-5 h-5' />}
            >
                Agregar tareas
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Agregar nueva tarea</ModalHeader>
                            <ModalBody>
                                <div className='flex flex-col gap-4'>
                                    <Input
                                        autoFocus
                                        isRequired
                                        type="text"
                                        label="Titulo"
                                        value={titulo}
                                        onChange={(e) => setTitulo(e.target.value)}
                                    />
                                    <Input
                                        isRequired
                                        type="text"
                                        label="Descripción"
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                    />
                                    <Slider
                                        label="Seleccione el porcentaje de avance"
                                        color="warning"
                                        size="sm"
                                        step={10}
                                        value={avance}
                                        onChange={handleSliderChange}
                                        marks={[
                                            { value: 20, label: "20%" },
                                            { value: 50, label: "50%" },
                                            { value: 80, label: "80%" },
                                        ]}
                                        defaultValue={0}
                                        className="max-w-md"
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="warning" variant="flat" onPress={handleSubmit}>
                                    Añadir tarea
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default ModalAgregrarAvanceProd;