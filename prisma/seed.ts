import { PrismaClient } from '@/prisma/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
const prisma = new PrismaClient({
	adapter: new PrismaPg({
		connectionString: process.env.DATABASE_URL,
	}),
});

async function main() {
	const demoUserId = 'accf879b-903d-45b0-91ed-1f78183fa0c4';

	// Create demo products
	await prisma.product.createMany({
		data: Array.from({ length: 25 }, (_, index) => ({
			userId: demoUserId,
			name: `Product ${index + 1}`,
			description: `Description ${index + 1}`,
			price: (Math.random() * 90 + 10).toFixed(2),
			quantity: Math.floor(Math.random() * 20),
			lowStockAt: 5,
			createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (index * 5)),
		})),
	});
	console.log('Demo products created successfully');
	console.log(`Created ${await prisma.product.count()} products`);
}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
