-- CreateTable
CREATE TABLE `Setor` (
    `setorid` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`setorid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Patrimonio` (
    `patrimonioid` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `ni` VARCHAR(191) NOT NULL,
    `setorId` INTEGER NOT NULL,
    `status` ENUM('ATIVO', 'MANUTENCAO', 'BAIXADO') NOT NULL DEFAULT 'ATIVO',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Patrimonio_ni_key`(`ni`),
    PRIMARY KEY (`patrimonioid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Patrimonio` ADD CONSTRAINT `Patrimonio_setorId_fkey` FOREIGN KEY (`setorId`) REFERENCES `Setor`(`setorid`) ON DELETE RESTRICT ON UPDATE CASCADE;
