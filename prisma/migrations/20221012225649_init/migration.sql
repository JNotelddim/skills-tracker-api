-- CreateEnum
CREATE TYPE "SkillRating" AS ENUM ('SUPER_CONFIDENT', 'CONFIDENT', 'SO_SO', 'SOME_FAMILIARITY', 'NO_FAMILIARITY');

-- CreateTable
CREATE TABLE "LogSkillAssociation" (
    "userSkillId" TEXT NOT NULL,
    "userSkillLogId" TEXT NOT NULL,

    CONSTRAINT "LogSkillAssociation_pkey" PRIMARY KEY ("userSkillId","userSkillLogId")
);

-- CreateTable
CREATE TABLE "UserSkillLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "logContent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserSkillLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSkillGoal" (
    "id" TEXT NOT NULL,
    "targetRating" "SkillRating" NOT NULL,
    "notes" TEXT,
    "deadline" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "userSkillId" TEXT NOT NULL,

    CONSTRAINT "UserSkillGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSkillRating" (
    "id" TEXT NOT NULL,
    "rating" "SkillRating" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "userSkillId" TEXT NOT NULL,

    CONSTRAINT "UserSkillRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSkill" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "salt" BYTEA NOT NULL,
    "hash" BYTEA NOT NULL,
    "iterations" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSkill_userId_key" ON "UserSkill"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "LogSkillAssociation" ADD CONSTRAINT "LogSkillAssociation_userSkillId_fkey" FOREIGN KEY ("userSkillId") REFERENCES "UserSkill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogSkillAssociation" ADD CONSTRAINT "LogSkillAssociation_userSkillLogId_fkey" FOREIGN KEY ("userSkillLogId") REFERENCES "UserSkillLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSkillLog" ADD CONSTRAINT "UserSkillLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSkillGoal" ADD CONSTRAINT "UserSkillGoal_userSkillId_fkey" FOREIGN KEY ("userSkillId") REFERENCES "UserSkill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSkillRating" ADD CONSTRAINT "UserSkillRating_userSkillId_fkey" FOREIGN KEY ("userSkillId") REFERENCES "UserSkill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSkill" ADD CONSTRAINT "UserSkill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
