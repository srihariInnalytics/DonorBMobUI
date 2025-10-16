export const formatTOddmmyy = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

export const formatDateTimeFromApiToUITimeOnly = (isoString) => {
    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format, handling midnight (0) as 12
    return `${hours}:${minutes} ${ampm}`;
};

export const DateTimePickerToApiFormat = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure 2-digit month
    const day = String(date.getDate()).padStart(2, "0"); // Ensure 2-digit day
    const hours = String(date.getHours()).padStart(2, "0"); // Ensure 2-digit hours
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Ensure 2-digit minutes
    const seconds = "00"; // Since DateTimePicker does not allow seconds selection

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export const getCurrDateTime = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(now.getDate()).padStart(2, '0');
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0'); // Add milliseconds

    // Return in ISO 8601 format: "2025-04-01T12:07:44.000Z"
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
};

export const mergeDateTimeforDatePicker = (dateString, timeString) => {
    // Check if inputs are valid
    if (!dateString || !timeString) {
        console.error("mergeDateTimeforDatePicker: Invalid input - one of the values is undefined", {
            dateString,
            timeString
        });
        return null;
    }

    // Convert Date objects to ISO strings if necessary
    if (dateString instanceof Date) dateString = dateString.toISOString();
    if (timeString instanceof Date) timeString = timeString.toISOString();

    // Ensure both values are strings before splitting
    if (typeof dateString !== "string" || typeof timeString !== "string") {
        console.error("mergeDateTimeforDatePicker: Expected string format for date and time", {
            dateString,
            timeString
        });
        return null;
    }

    try {
        // Extract date part (YYYY-MM-DD)
        const datePart = dateString.split("T")[0];

        // Extract time part (HH:mm:ss.sss) - handles cases where milliseconds exist
        const timePart = timeString.split("T")[1]?.split(".")[0]; // HH:mm:ss

        // Ensure that both date and time parts are valid
        if (!datePart || !timePart) {
            console.error("mergeDateTimeforDatePicker: Failed to extract date or time", {
                dateString,
                timeString
            });
            return null;
        }

        // Return in the format: "YYYY-MM-DDTHH:mm:ss.sssZ"
        return `${datePart}T${timePart}.000Z`; // Add .000 for milliseconds and Z for UTC
    } catch (error) {
        console.error("mergeDateTimeforDatePicker: Unexpected error occurred", error);
        return null;
    }
};


export const FromandToformat = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
};

export const getDay = (isoString) => {
    const date = new Date(isoString);
    const options = {  day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
};

export const getMonth = (isoString) => {
    const date = new Date(isoString);
    const options = {  month: 'long' };
    return date.toLocaleDateString('en-US', options);
};

export const getTimeDiff = (punchInTime, punchOutTime) => {
    const inTime = new Date(punchInTime);
    const outTime = new Date(punchOutTime);
  
    const timeDiffMs = outTime - inTime; // Milliseconds
    const timeDiffHours = timeDiffMs / (1000 * 60 * 60); // Convert to hours
  
    return timeDiffHours.toFixed(2);
}


