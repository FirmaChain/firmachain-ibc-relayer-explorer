import { format, formatDistanceToNowStrict } from "date-fns";
import { formatInTimeZone, getTimezoneOffset } from "date-fns-tz";

export const toLocaleFormattedDate = (_date: Date | string, _format = "yyyy-MM-dd HH:mm:ss") => {
    return format(new Date(_date), _format);
};

export const toUTCFormattedDate = (_date: Date | string, _format = "yyyy-MM-dd HH:mm:ss") => {
    return formatInTimeZone(new Date(_date), "UTC", _format);
};

export const formatDateOrShowDistance = (targetDate: Date) => {
    try {
        return formatDistanceToNowStrict(new Date(targetDate), { addSuffix: true });
    } catch (error) {
        console.error(error);
        return "-";
    }
};

export const getUTCOffset = (date: Date | string) => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const dateObj = typeof date === "string" ? new Date(date) : date;
    const offsetMilliseconds = getTimezoneOffset(userTimeZone, dateObj);
    const offsetHours = Math.floor(offsetMilliseconds / (60 * 60 * 1000));
    const offsetSign = offsetHours >= 0 ? "+" : "-";
    return `UTC${offsetSign}${String(Math.abs(offsetHours)).padStart(2, "0")}`;
};
