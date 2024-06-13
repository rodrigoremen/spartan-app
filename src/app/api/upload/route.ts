import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import prisma from '@/libs/prisma';

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
	const data = await request.formData();
	const file = data.get('file') as File;
	const conceptId = data.get('conceptId') as string;

	if (!file || !conceptId) {
		return NextResponse.json('no hay archivo o Concepto', { status: 400 });
	}

	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);

	const resp: any = await new Promise((resolve, reject) => {
		cloudinary.uploader
			.upload_stream({ resource_type: 'image' }, async (error, result) => {
				if (error) {
					reject(error);
				}
				resolve(result);
			})
			.end(buffer);
	});

	const photo = await prisma.photos.create({
		data: {
			url: resp.secure_url,
			conceptId: parseInt(conceptId),
		},
	});

	return NextResponse.json({
		message: 'Imagen subida correctamente',
		url: resp.secure_url,
	});
}
