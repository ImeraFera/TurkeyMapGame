const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const port = 3000;

const { alreadyExistsRoom } = require('./utils/alreadyExistRoom');
const { randomCity } = require('./utils/getRandomCity');

const io = socketIo(server, {
    cors: {
        origin: "*",
    }
});

const players = [];
const rooms = [];
const cities = [
    { title: "Adana", id: "TR-01", founded: false },
    { title: "Adıyaman", id: "TR-02", founded: false },
    { title: "Afyonkarahisar", id: "TR-03", founded: false },
    { title: "Ağrı", id: "TR-04", founded: false },
    { title: "Aksaray", id: "TR-68", founded: false },
    { title: "Amasya", id: "TR-05", founded: false },
    { title: "Ankara", id: "TR-06", founded: false },
    { title: "Antalya", id: "TR-07", founded: false },
    { title: "Ardahan", id: "TR-75", founded: false },
    { title: "Artvin", id: "TR-08", founded: false },
    { title: "Aydın", id: "TR-09", founded: false },
    { title: "Balıkesir", id: "TR-10", founded: false },
    { title: "Bartın", id: "TR-74", founded: false },
    { title: "Batman", id: "TR-72", founded: false },
    { title: "Bayburt", id: "TR-69", founded: false },
    { title: "Bilecik", id: "TR-11", founded: false },
    { title: "Bingöl", id: "TR-12", founded: false },
    { title: "Bitlis", id: "TR-13", founded: false },
    { title: "Bolu", id: "TR-14", founded: false },
    { title: "Burdur", id: "TR-15", founded: false },
    { title: "Bursa", id: "TR-16", founded: false },
    { title: "Çanakkale", id: "TR-17", founded: false },
    { title: "Çankırı", id: "TR-18", founded: false },
    { title: "Çorum", id: "TR-19", founded: false },
    { title: "Denizli", id: "TR-20", founded: false },
    { title: "Diyarbakır", id: "TR-21", founded: false },
    { title: "Düzce", id: "TR-81", founded: false },
    { title: "Edirne", id: "TR-22", founded: false },
    { title: "Elazığ", id: "TR-23", founded: false },
    { title: "Erzincan", id: "TR-24", founded: false },
    { title: "Erzurum", id: "TR-25", founded: false },
    { title: "Eskişehir", id: "TR-26", founded: false },
    { title: "Gaziantep", id: "TR-27", founded: false },
    { title: "Giresun", id: "TR-28", founded: false },
    { title: "Gümüşhane", id: "TR-29", founded: false },
    { title: "Hakkari", id: "TR-30", founded: false },
    { title: "Hatay", id: "TR-31", founded: false },
    { title: "Iğdır", id: "TR-76", founded: false },
    { title: "Isparta", id: "TR-32", founded: false },
    { title: "İstanbul", id: "TR-34", founded: false },
    { title: "İzmir", id: "TR-35", founded: false },
    { title: "Kahramanmaraş", id: "TR-46", founded: false },
    { title: "Karabük", id: "TR-78", founded: false },
    { title: "Karaman", id: "TR-70", founded: false },
    { title: "Kars", id: "TR-36", founded: false },
    { title: "Kastamonu", id: "TR-37", founded: false },
    { title: "Kayseri", id: "TR-38", founded: false },
    { title: "Kırıkkale", id: "TR-71", founded: false },
    { title: "Kırklareli", id: "TR-39", founded: false },
    { title: "Kırşehir", id: "TR-40", founded: false },
    { title: "Kilis", id: "TR-79", founded: false },
    { title: "Kocaeli", id: "TR-41", founded: false },
    { title: "Konya", id: "TR-42", founded: false },
    { title: "Kütahya", id: "TR-43", founded: false },
    { title: "Malatya", id: "TR-44", founded: false },
    { title: "Manisa", id: "TR-45", founded: false },
    { title: "Mardin", id: "TR-47", founded: false },
    { title: "Mersin", id: "TR-33", founded: false },
    { title: "Muğla", id: "TR-48", founded: false },
    { title: "Muş", id: "TR-49", founded: false },
    { title: "Nevşehir", id: "TR-50", founded: false },
    { title: "Niğde", id: "TR-51", founded: false },
    { title: "Ordu", id: "TR-52", founded: false },
    { title: "Osmaniye", id: "TR-80", founded: false },
    { title: "Rize", id: "TR-53", founded: false },
    { title: "Sakarya", id: "TR-54", founded: false },
    { title: "Samsun", id: "TR-55", founded: false },
    { title: "Siirt", id: "TR-56", founded: false },
    { title: "Sinop", id: "TR-57", founded: false },
    { title: "Sivas", id: "TR-58", founded: false },
    { title: "Şanlıurfa", id: "TR-63", founded: false },
    { title: "Şırnak", id: "TR-73", founded: false },
    { title: "Tekirdağ", id: "TR-59", founded: false },
    { title: "Tokat", id: "TR-60", founded: false },
    { title: "Trabzon", id: "TR-61", founded: false },
    { title: "Tunceli", id: "TR-62", founded: false },
    { title: "Uşak", id: "TR-64", founded: false },
    { title: "Van", id: "TR-65", founded: false },
    { title: "Yalova", id: "TR-77", founded: false },
    { title: "Yozgat", id: "TR-66", founded: false },
    { title: "Zonguldak", id: "TR-67", founded: false }
];
let whoseTurn = null;
let unfoundCities = cities;
let foundCities = [];
let city = randomCity(unfoundCities);

io.on('connection', (socket) => {




    console.log('whose turn is ', whoseTurn)
    socket.on('ready', ({ user, room }) => {
        const hasRoom = alreadyExistsRoom(rooms, room);
        if (hasRoom) {

            players.push({ ...user, score: 0, homeOwner: false });
            room.members += 1;
            socket.join(room.roomName);
            console.log('ilk bulunacak olan : ', city);
            io.to(room.roomName).emit('start_game', { players, city, whoseTurn })
        } else {

            players.push({ ...user, score: 0, homeOwner: true });
            rooms.push({ ...room, members: 1 });
            whoseTurn = user;
            socket.join(room.roomName);
        }
    })

    socket.on('handle_click', (data) => {

        const cityId = data.choosenCity;
        const user = players.find(player => player.username === data.user.username)
        console.log(user)
        const room = data.room;

        whoseTurn = players.filter(player => player.username !== user.username)[0];
        // console.log('karşılaştırılan city:', city.id, 'seçilen  city: ', cityId)
        if (cityId === city.id) {
            user.score += 10;
            console.log(user.username, 'score: ', user.score)

            console.log('bulunacak olan : ', city);
            const arr = unfoundCities.filter(city => city.id !== cityId)
            unfoundCities = arr;
            foundCities.push(cityId);
            city = randomCity(unfoundCities);
            console.log(unfoundCities.length)

            io.to(room.roomName).emit('answer', {
                trueAnswer: true,
                nextCity: city,
                whoseTurn,
                correctCity: cityId,
                players,
                foundList: foundCities,
            })

        } else {
            user.score -= 5;
            city = randomCity(unfoundCities);
            console.log('bulunacak olan : ', city);
            io.to(room.roomName).emit('answer', {
                trueAnswer: false,
                nextCity: city,
                correctCity: cityId,
                whoseTurn,
                players,
                foundList: foundCities,
            })
        }

    })



    socket.on('disconnect', ({ user }) => {

        console.log('user disconnected: ', socket.id);
    });
});

server.listen(port, () => {
    console.log("server is listening on port ", port);
});
