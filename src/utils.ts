export function formatDate(date: Date) {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }
    return new Date(date).toLocaleDateString(undefined, options)
}
