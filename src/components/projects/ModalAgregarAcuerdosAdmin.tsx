import React, { useState } from "react";
import { DateInput ,Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { DateValue, parseDate } from "@internationalized/date";

function ModalAgregarAcuerdosAdmin({ agregarAcuerdo }: { agregarAcuerdo: any }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [objetivo, setObjetivo] = useState("");
    const [fechaEntrega, setFechaEntrega] = useState<DateValue>(parseDate("2024-04-04"));
    const handleSubmit = () => {
        const fechaEntregaISO = fechaEntrega.toString();
        agregarAcuerdo({ objetivo, fechaEntrega: fechaEntregaISO });
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
                                </div>
                                <div className="flex py-2 px-1 gap-x-2">
                                    <DateInput
                                        isRequired
                                        label="Fecha de entrega"
                                        value={fechaEntrega}
                                        onChange={(e) => setFechaEntrega(e)}
                                        startContent={
                                            <CalendarIcon className="w-5 h-5 text-default-400" />
                                        }
                                    />
                                </div>
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

export default ModalAgregarAcuerdosAdmin