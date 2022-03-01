const mapToDBModel = ({
    id, 
    title,
    body,
    created_at,
    updated_at
}) => ({
    id,
    title,
    body,
    createdAt: created_at,
    updatedAt: updated_at,
})

module.exports  = mapToDBModel;