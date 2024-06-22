import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, Tooltip, useDisclosure } from '@nextui-org/react';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { Text } from '@radix-ui/themes';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function ModalAgregarRespObs({ id, cargarDatos }: { id: string, cargarDatos: () => void }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            responsable: "",
            observaciones: ""
        }
    });
    const onSubmitAcuerdos = handleSubmit(async (data) => {
        try {
            console.log(id)
            const resp = await axios.put(`/api/projects/${id}/acuerdos`, data);
            console.log(resp.data);
            if (resp.status === 200) {
                toast.success("Avance guardado correctamente");
                cargarDatos(); 
                router.refresh();
            }
        } catch (error) {
            console.error("Error saving avance", error);
            toast.error("Error al guardar avance");
        }
        onOpenChange();
    });
    return (
        <>
            <Tooltip content="Agregar responsable y observaciones">
                <Button
                    isIconOnly
                    className="text-lg flex justify-center cursor-pointer active:opacity-50"
                    onPress={onOpen}
                    color="warning"
                    variant="flat"
                >
                    <Pencil2Icon />
                </Button>
            </Tooltip>
            <Modal
                backdrop={"blur"}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Agrega responsable y observaciones</ModalHeader>
                            <ModalBody>
                                <div className="gap-x-3">
                                    <Controller
                                        name="responsable"
                                        control={control}
                                        rules={{
                                            required: {
                                                message: 'El responsable es requerido',
                                                value: true
                                            }
                                        }}
                                        render={({ field }) => {
                                            return (
                                                <Input
                                                    {...field}
                                                    autoFocus
                                                    type="text"
                                                    label="Responsable"
                                                    isRequired
                                                />
                                            );
                                        }}
                                    />
                                    {errors.responsable && (
                                        <Text color='ruby' className='text-xs'>
                                            {errors.responsable.message}
                                        </Text>
                                    )}
                                </div>
                                <div className="px-1 gap-x-2">
                                    <Controller
                                        name="observaciones"
                                        control={control}
                                        rules={{
                                            required: {
                                                message: 'La observación es requerida',
                                                value: true
                                            }
                                        }}
                                        render={({ field }) => {
                                            return (
                                                <Textarea
                                                    {...field}
                                                    type="text"
                                                    label="Observaciones"
                                                    isRequired
                                                />
                                            );
                                        }}
                                    />
                                    {errors.observaciones && (
                                        <Text color='ruby' className='text-xs'>
                                            {errors.observaciones.message}
                                        </Text>
                                    )}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="warning" variant="flat" onClick={onSubmitAcuerdos}>
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

export default ModalAgregarRespObs;
