import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Textarea } from "@nextui-org/react";

function ModalAgregarServicio({ agregarServicio }: { agregarServicio: any }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [cantidad, setCantidad] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precioUnitario, setPrecioUnitario] = useState("");
    const [importe, setImporte] = useState("");

    useEffect(() => {
        if (cantidad && precioUnitario) {
            setImporte((parseInt(cantidad) * parseFloat(precioUnitario)).toFixed(2));
        }
    }, [cantidad, precioUnitario]);

    const handleSubmit = () => {
        agregarServicio({ cantidad, descripcion, precioUnitario, importe });
        onOpenChange();
        
    };

    return (
        <>
            <Button className="mb-3" onPress={onOpen} color="warning" variant="flat">Agregar servicio</Button>
            <Modal
                backdrop={"blur"}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Agrega un servicio</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    type="number"
                                    label="Cantidad"
                                    isRequired
                                    value={cantidad}
                                    onChange={(e) => setCantidad(e.target.value)}
                                />
                                <Textarea
                                    label="Descripción"
                                    isRequired
                                    placeholder="Añade una descripción del servicio"
                                    type="text"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}

                                />
                                <div className="flex py-2 px-1 gap-x-2">
                                    <Input
                                        isRequired
                                        type="number"
                                        label="Precio unitario"
                                        placeholder="0.00"
                                        value={precioUnitario}
                                        onChange={(e) => setPrecioUnitario(e.target.value)}
                                        startContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">$</span>
                                            </div>
                                        }
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="warning" variant="flat" onPress={handleSubmit} >
                                    Agregar servicio
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default ModalAgregarServicio