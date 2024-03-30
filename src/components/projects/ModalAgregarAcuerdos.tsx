import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";
import { CalendarIcon } from "@radix-ui/react-icons";

function ModalAgregarAcuerdos({ agregarAcuerdo }: { agregarAcuerdo: any }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [objetivo, setObjetivo] = useState("");
    const [estado, setEstado] = useState("");
    const [fechaEntrega, setFechaEntrega] = useState("");
    const [responsable, setResponsable] = useState("");
    const [observaciones, setObservaciones] = useState("");

    const handleSubmit = () => {
        agregarAcuerdo({ objetivo, estado, fechaEntrega, responsable, observaciones });
        onOpenChange();
    };

    return (
        <>
            <Button className="mb-3" onPress={onOpen} color="warning" variant="flat">Agregar acuerdo anterior</Button>
            <Modal
                backdrop={"blur"}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Agrega un cuerdo anterior</ModalHeader>
                            <ModalBody>
                                <div className="flex gap-x-3">
                                    <Textarea
                                        autoFocus
                                        type="text"
                                        label="Objetivo"
                                        isRequired
                                        value={objetivo}
                                        onChange={(e) => setObjetivo(e.target.value)}
                                    />
                                    <Input
                                        label="Estado"
                                        isRequired
                                        type="text"
                                        value={estado}
                                        onChange={(e) => setEstado(e.target.value)}

                                    />
                                </div>
                                <div className="flex py-2 px-1 gap-x-2">
                                    <Input
                                        isRequired
                                        type="text"
                                        label="Fecha de entrega"
                                        value={fechaEntrega}
                                        onChange={(e) => setFechaEntrega(e.target.value)}
                                        startContent={
                                            <CalendarIcon className="w-5 h-5 text-default-400" />
                                        }
                                    />
                                    <Input
                                        isRequired
                                        type="text"
                                        label="Responsable"
                                        value={responsable}
                                        onChange={(e) => setResponsable(e.target.value)}
                                    />
                                </div>
                                <Textarea
                                    isRequired
                                    type="text"
                                    label="Observaciones"
                                    value={observaciones}
                                    onChange={(e) => setObservaciones(e.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="warning" variant="flat" onPress={handleSubmit} >
                                    Agregar acuerdo anterior
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalAgregarAcuerdos