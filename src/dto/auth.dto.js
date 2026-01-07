class AuthDTO {
    /**
     * Data allowed while creating user
     */
    static create(body) {
        return {
            username: body.username,
            password: body.password,
            full_name: body.full_name,
            email: body.email,
            contact_number: body.contact_number ?? null,
        };
    }

    /**
     * Data allowed while updating user
     */
    static update(body) {
        return {
            ...(body.username && { username: body.username }),
            ...(body.password && { password: body.password }),
            ...(body.full_name && { full_name: body.full_name }),
            ...(body.email && { email: body.email }),
            ...(body.contact_number && { contact_number: body.contact_number }),
        };
    }

    /**
     * Data allowed to send in response
     */
    static response(user) {
        return {
            huid: user.huid,
            username: user.username,
            full_name: user.full_name,
            email: user.email,
            contact_number: user.contact_number,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };
    }
}

module.exports = AuthDTO;
