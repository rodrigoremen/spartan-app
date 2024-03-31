import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";

function ModalAgregarProblema({ agregarProblema }: { agregarProblema: any }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [problemas, setProblemas] = useState("");
    const [respuesta, setRespuesta] = useState("");

    const handleSubmit = () => {
        agregarProblema({ problemas, respuesta });
        onOpenChange();
    };
    return (
        <>
            <Button className="mb-3" onPress={onOpen} color="warning" variant="flat">Agregar problema</Button>
            <Modal
                backdrop={"blur"}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Agregar problema y respuesta</ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Problema"
                                    isRequired
                                    type="text"
                                    value={problemas}
                                    onChange={(e) => setProblemas(e.target.value)}

                                />
                                <Input
                                    isRequired
                                    type="text"
                                    label="Respuesta"
                                    value={respuesta}
                                    onChange={(e) => setRespuesta(e.target.value)}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="warning" variant="flat" onPress={handleSubmit} >
                                    Agregar Problema
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalAgregarProblema