import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";


function ModalAgregarAcuerdoOpe({ agregarAcuerdo }: { agregarAcuerdo: any }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [responsable, setResponsable] = useState("");
    const [observaciones, setObservaciones] = useState("");
    const handleSubmit = () => {
        
        agregarAcuerdo({ responsable, observaciones});
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
                                        type="text"
                                        label="Objetivo"
                                        isRequired
                                        value={observaciones}
                                        onChange={(e) => setObservaciones(e.target.value)}
                                    />
                                </div>
                                <div className="flex py-2 px-1 gap-x-2">
                                    <Input
                                    autoFocus
                                    type="text"
                                    label="Responsable"
                                    isRequired
                                    value={responsable}
                                    onChange={(e) => setResponsable(e.target.value)}
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

export default ModalAgregarAcuerdoOpe