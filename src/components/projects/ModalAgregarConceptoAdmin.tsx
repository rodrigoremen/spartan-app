import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Textarea } from "@nextui-org/react";
import axios from 'axios';
import { toast } from 'sonner';

function ModalAgregarConceptoAdmin({ id, cargarDatosConceptos }: { id: string, cargarDatosConceptos: () => void }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [concepto, setConceptos] = useState("");
    const handleSubmit = async () => {
        try {
            const response = await axios.post(`/api/projects/${id}/conceptos`, { concepto });
            if (response.status === 200) {
                toast.success('Concepto agregado correctamente');
                cargarDatosConceptos(); 
                onOpenChange();
            }
        } catch (error) {
            toast.error('Error al agregar el concepto');
            console.error('Error al agregar el concepto:', error);
        }
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
                            <ModalHeader className="flex flex-col gap-1">Agrega un acuerdo anterior</ModalHeader>
                            <ModalBody>
                                <div className="flex gap-x-3">
                                    <Textarea
                                        autoFocus
                                        type="text"
                                        label="Concepto"
                                        isRequired
                                        value={concepto}
                                        onChange={(e) => setConceptos(e.target.value)}
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
    );
}

export default ModalAgregarConceptoAdmin;
