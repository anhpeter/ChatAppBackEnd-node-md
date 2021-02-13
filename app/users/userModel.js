const userModel = {
    users: [
        {
            id: 1,
            username: 'peteranh',
            password: 'admin',
            picture: "https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.0-9/61103469_1109770422558853_2564158225184194560_n.jpg?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_ohc=BJ6L5IV_JfQAX8iDLtk&_nc_ht=scontent.fsgn2-5.fna&oh=ccf7880a2a77ee48a2fdf6663f3050c0&oe=6049EB1D",

        },
        {
            id: 2,
            username: 'peterkhang',
            password: 'admin',
            picture: "https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/137561041_1853205284856919_7590474778452561765_o.jpg?_nc_cat=108&ccb=2&_nc_sid=09cbfe&_nc_ohc=Wh8AsYFtNE8AX8ZUxrZ&_nc_ht=scontent.fsgn2-3.fna&oh=5fd70fba323c9d72da5caa2ebd1e00ef&oe=604836B2",
        },
        {
            id: 3,
            username: 'rose',
            password: 'admin',
            picture: "https://i.pinimg.com/originals/76/fa/eb/76faeb9c818efdf76cf066aea3685a80.jpg",
        },
        {
            id: 4,
            username: 'lisa',
            password: 'admin',
            picture: "https://assets.vogue.com/photos/5ebc71d4a85f0288b7c3efda/16:9/w_3376,h_1899,c_limit/lisa-promo-crop.jpg",
        },
        {
            id: 5,
            username: 'jisoo',
            password: 'admin',
            picture: "https://upload.wikimedia.org/wikipedia/commons/3/38/Kim_Ji-soo_at_Jimmy_Choo_Event_on_January_09%2C_2020_%287%29.jpg",
        },
        {
            id: 5,
            username: 'jennie',
            password: 'admin',
            picture: "https://cdn1.i-scmp.com/sites/default/files/styles/768x768/public/images/methode/2019/01/16/07a7ab2a-17ce-11e9-8ff8-c80f5203e5c9_image_hires_160333.jpg?itok=SYxUEfvx&v=1547625814",
        },
    ],
    findById: function (id) {
        let index = this.findIndexById(id);
        if (index > -1) return this.users[index];
        return null;
    },
    findByUsernameAndPassword: function (username, password) {
        if (username && password) {
            return this.users.find((user) => {
                return (user.username === username && user.password === password);
            })
        }
    },
    findIndexById: function (id) {
        return this.users.findIndex((user) => {
            return (user.id === id);
        })
    },
}

module.exports = userModel;