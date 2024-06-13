import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";
import { CalendarIcon } from "@radix-ui/react-icons";

function ModalAgregarActividades({ agregarActividad }: { agregarActividad: any }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [actividad, setActividad] = useState("");
    const [tiempoEntrega, setTiempoEntrega] = useState("");

    const handleSubmit = () => {
        agregarActividad({ actividad, tiempoEntrega });
        onOpenChange();
    };

    return (
        <>
            <Button className="mb-3" onPress={onOpen} color="warning" variant="flat">Agregar Actividades</Button>
            <Modal
                backdrop={"blur"}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Agrega actividad relevantes del periodo</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Actividad"
                                    isRequired
                                    type="text"
                                    value={actividad}
                                    onChange={(e) => setActividad(e.target.value)}

                                />
                                <Input
                                    isRequired
                                    type="text"
                                    label="Tiempo de entrega"
                                    value={tiempoEntrega}
                                    onChange={(e) => setTiempoEntrega(e.target.value)}
                                    startContent={
                                        <CalendarIcon className="w-5 h-5 text-default-400" />
                                    }
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="warning" variant="flat" onPress={handleSubmit} >
                                    Agregar actividad
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalAgregarActividades