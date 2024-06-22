import { Button, DateInput, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, Tooltip, useDisclosure } from '@nextui-org/react';
import { CalendarIcon, Pencil2Icon } from '@radix-ui/react-icons';
import { Text } from '@radix-ui/themes';
import axios from 'axios';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { getLocalTimeZone, parseDate } from '@internationalized/date';

function ModalAgregarConceptoOpe({ id, cargarDatosConceptos }: { id: string, cargarDatosConceptos: () => void }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            tecnico: "",
            avance: "",
            fechaEstimada: parseDate("2024-01-01")
        }
    });

    const onSubmit = handleSubmit(async (data) => {
        const timeZone = getLocalTimeZone();
        const fechaEntregaISO = data.fechaEstimada.toDate(timeZone).toISOString();
        const dataToSend = {
            tecnico: data.tecnico,
            avance: data.avance,
            fechaEstimada: fechaEntregaISO
        };
        try {
            console.log("Data to send:", dataToSend)
            const resp = await axios.put(`/api/projects/${id}/conceptos`, dataToSend);
            console.log(resp.data);
            if (resp.status === 200) {
                toast.success("Concepto guardado correctamente");
                cargarDatosConceptos();
                router.refresh();
            }
        } catch (error) {
            console.error("Error saving Concepto", error);
            toast.error("Error al guardar el concepto");
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
                                        name="tecnico"
                                        control={control}
                                        rules={{
                                            required: {
                                                message: 'El tecnico es requerido',
                                                value: true
                                            }
                                        }}
                                        render={({ field }) => {
                                            return (
                                                <Input
                                                    {...field}
                                                    autoFocus
                                                    type="text"
                                                    label="Técnico"
                                                    isRequired
                                                />
                                            );
                                        }}
                                    />
                                    {errors.tecnico && (
                                        <Text color='ruby' className='text-xs'>
                                            {errors.tecnico.message}
                                        </Text>
                                    )}
                                </div>
                                <div className="px-1 gap-x-2">
                                    <Controller
                                        name="avance"
                                        control={control}
                                        rules={{
                                            required: {
                                                message: 'El avance es requerido',
                                                value: true
                                            },
                                            min: {
                                                value: 1,
                                                message: 'El avance debe ser al menos 1'
                                            },
                                            max: {
                                                value: 100,
                                                message: 'El avance no puede ser mayor a 100'
                                            }
                                        }}
                                        render={({ field }) => {
                                            return (
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    label="Avance"
                                                    isRequired
                                                />
                                            );
                                        }}
                                    />
                                    {errors.avance && (
                                        <Text color='ruby' className='text-xs'>
                                            {errors.avance.message}
                                        </Text>
                                    )}
                                </div>
                                <div className="px-1 gap-x-2">
                                    <Controller
                                        name="fechaEstimada"
                                        control={control}
                                        rules={{
                                            required: {
                                                message: 'La fecha estimada es requerida',
                                                value: true
                                            }
                                        }}
                                        render={({ field }) => {
                                            return (
                                                <DateInput
                                                    {...field}
                                                    label="Fecha estimada"
                                                    isRequired
                                                    value={field.value}
                                                    onChange={(e) => field.onChange(e)}
                                                    startContent={
                                                        <CalendarIcon className="w-5 h-5 text-default-400" />
                                                    }
                                                />
                                            );
                                        }}
                                    />
                                    {errors.fechaEstimada && (
                                        <Text color='ruby' className='text-xs'>
                                            {errors.fechaEstimada.message}
                                        </Text>
                                    )}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button color="warning" variant="flat" onClick={onSubmit}>
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

export default ModalAgregarConceptoOpe;
