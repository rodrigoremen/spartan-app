import prisma from '@/libs/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const photo = await prisma.photos.findUnique({
			where: { id: parseInt(params.id) },
		});
        
		const publicId = photo?.url?.split('/').pop()?.split('.')[0];

		if (publicId) {
			await cloudinary.uploader.destroy(publicId);
		}
		await prisma.photos.delete({ where: { id: parseInt(params.id) } });
		return NextResponse.json({ message: 'Foto eliminada correctamente' });
	} catch (error) {
		return NextResponse.json({ error: 'Error al eliminar la foto' }, { status: 500 });
	}
}
