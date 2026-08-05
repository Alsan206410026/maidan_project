const Tournament = require("../model/Tournament"); // Adjust relative path if needed

const updatetournamentstatus = async () => {
    try {
        const currentDate = new Date();

        // 1. Update tournament status: Change status to "ongoing" if startDate has passed
        const statusResult = await Tournament.updateMany(
            {
                status: "upcoming",
                startDate: { $lte: currentDate }
            },
            {
                $set: { status: "ongoing" }
            }
        );

        if (statusResult.modifiedCount > 0) {
            console.log(`[CRON] Updated ${statusResult.modifiedCount} tournament(s) to 'ongoing'.`);
        }

        // 2. Auto-delete: Remove tournaments when endDate has passed
        const deleteResult = await Tournament.deleteMany({
            endDate: { $lte: currentDate }
        });

        if (deleteResult.deletedCount > 0) {
            console.log(`[CRON] Deleted ${deleteResult.deletedCount} expired tournament(s).`);
        }
    } catch (error) {
        console.error("[CRON ERROR] Error updating tournament statuses:", error);
    }
};

module.exports = updatetournamentstatus;