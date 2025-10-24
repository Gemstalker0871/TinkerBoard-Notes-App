export function formatdate(date) {
    return date.toLocaleDateString("eng-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    })
}