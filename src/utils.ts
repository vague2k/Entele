export function formatDate(dateString: string) {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'America/New_York',
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
}
