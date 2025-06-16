// Helper function to format a Date object to "YYYY-MM-DD" string
function formatDateToYYYYMMDD(date) {
    if (!date) {
        return undefined; // Return undefined or null if the date is not set
    }
    const d = new Date(date);
    // Ensure the date is valid
    if (isNaN(d.getTime())) {
        return undefined; // Or handle as an invalid date string
    }
    // Use UTC methods to get the date parts to avoid timezone issues
    // if the time component is not relevant (e.g., T00:00:00.000Z)
    const year = d.getUTCFullYear();
    const month = ('0' + (d.getUTCMonth() + 1)).slice(-2); // getUTCMonth() is 0-indexed
    const day = ('0' + d.getUTCDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

module.exports = {
    formatDateToYYYYMMDD,
}