-- CreateTable
CREATE TABLE "speciality" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "icon" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "speciality_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "speciality_title_key" ON "speciality"("title");

-- CreateIndex
CREATE INDEX "idx_speciality_isDeleted" ON "speciality"("isDeleted");

-- CreateIndex
CREATE INDEX "idx_speciality_title" ON "speciality"("title");
