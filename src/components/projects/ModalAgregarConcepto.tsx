import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";


function ModalAgregarConcepto({ agregarConcepto }: { agregarConcepto: any }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [concepto, setConcepto] = useState("");
    const [status, setStatus] = useState("");
    const [tecnico, setTecnico] = useState("");
    const [avance, setAvance] = useState("");
    const [fechaEstimada, setFechaEstimada] = useState("");

    const handleSubmit = () => {
        agregarConcepto({
            concepto,
            status,
            tecnico,
            avance,
            fechaEstimada
        });
        onOpenChange();
    };
    return (
        <>
            <Button className="mb-3" onPress={onOpen} color="warning" variant="flat">Agregar concepto</Button>
            <Modal
                backdrop={"blur"}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Agrega un concepto</ModalHeader>
                            <ModalBody>

                                <Textarea
                                    autoFocus
                                    label="Concepto"
                                    isRequired
                                    type="text"
                                    value={concepto}
                                    onChange={(e) => setConcepto(e.target.value)}

                                />
                                <div className="flex py-2 px-1 gap-x-2">
                                    <Input
                                        type="text"
                                        label="Status"
                                        isRequired
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    />
                                    <Input
                                        isRequired
                                        type="text"
                                        label="Técnico"
                                        value={tecnico}
                                        onChange={(e) => setTecnico(e.target.value)}
                                    />
                                    <Input
                                        isRequired
                                        type="number"
                                        label="Avance"
                                        value={avance}
                                        onChange={(e) => setAvance(e.target.value)}
                                        startContent={
                                            <div className="pointer-events-none flex items-center">
                                              <span className="text-default-400 text-small">%</span>
                                            </div>
                                          }
                                    />
                                </div>
                                <Input
                                    isRequired
                                    type="text"
                                    label="Fecha estimada de entrega"
                                    value={fechaEstimada}
                                    onChange={(e) => setFechaEstimada(e.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="warning" variant="flat" onPress={handleSubmit} >
                                    Agregar acuerdo
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalAgregarConcepto