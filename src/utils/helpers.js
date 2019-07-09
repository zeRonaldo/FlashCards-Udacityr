export const hashID = (length) => (
    (+new Date).toString(36).slice(-length)
)

export const getIndex = (pool, id) => {
    let data = JSON.parse(JSON.stringify(pool));
    return data.findIndex( item => item.id === id)
}