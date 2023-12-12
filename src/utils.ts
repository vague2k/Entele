export function formatDate(date: Date) {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'America/New_York',
    }
    return new Date(date).toLocaleDateString(undefined, options)
}
