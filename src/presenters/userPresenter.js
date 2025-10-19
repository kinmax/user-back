const userPresenter = (user) => {
    return {
        id: user.userId,
        name: user.name,
        email: user.email,
        birthDate: user.birthDate,
        location: {
            city: user.city,
            state: user.state,
            country: user.country
        }
    };
}

module.exports = {
    userPresenter
}
