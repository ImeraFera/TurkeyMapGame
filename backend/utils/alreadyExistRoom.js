

exports.alreadyExistsRoom = (rooms, room) => {


    return rooms.find(_room => _room.roomName === room.roomName);

}
