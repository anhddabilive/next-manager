**With Prisma 7, you need to install:**

npm install @prisma/client @prisma/adapter-pg
npm install -D tsx

**Update schema.prisma:**

generator client {
provider = "prisma-client"
output = "./generated"
}

**Generate the client:**

npx prisma generate

**When you edit a model in schema.prisma:**

npx prisma migrate dev --name custom_name
