import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

(() => {
  const prisma = new PrismaClient();
  prisma
    .$connect()
    .then(async () => {
      const hashedPassword = await bcrypt.hash('admin', 10);
      await prisma.user.upsert({
        where: {
          id: 1,
        },
        update: {
          password: hashedPassword,
        },
        create: {
          role: UserRole.ADMIN,
          fullname: 'System Admin',
          email: 'admin',
          password: hashedPassword,
        },
      });

      await prisma.$disconnect();
    })
    .catch(async (err) => {
      console.log(err);

      await prisma.$disconnect();
      process.exit(1);
    });
})();
