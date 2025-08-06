-- CreateTable
CREATE TABLE "AccountDetails" (
    "id" TEXT NOT NULL,
    "walletAddress" TEXT,

    CONSTRAINT "AccountDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AccountDetails" ADD CONSTRAINT "AccountDetails_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
