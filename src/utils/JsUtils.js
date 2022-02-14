import moment from "moment";

export const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
}

export const getLeftDaytime = () => {
    const now = moment().utc();
    const endDay = moment().utc().endOf("day");
    const diff = endDay.diff(now);
    const diffDuration = moment.duration(diff);

    return `${diffDuration.hours()} hours ${diffDuration.minutes()} minutes`;
}