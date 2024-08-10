// Define the Room class with pricing
class Room {
    constructor(number, type, price) {
        this.number = number;
        this.type = type; 
        this.price = price; 
        this.isAvailable = true;
    }

    bookRoom() {
        if (this.isAvailable) {
            this.isAvailable = false;
            return true;
        }
        return false;
    }

    cancelBooking() {
        if (!this.isAvailable) {
            this.isAvailable = true;
            return true;
        }
        return false;
    }
}


class Hotel {
    constructor(name) {
        this.name = name;
        this.rooms = [];
    }

    addRoom(room) {
        this.rooms.push(room);
    }

    getAvailableRooms() {
        return this.rooms.filter(room => room.isAvailable);
    }

    findAvailableRoom(type) {
        return this.getAvailableRooms().find(room => room.type === type);
    }
}


class Reservation {
    constructor(hotel) {
        this.hotel = hotel;
        this.reservations = [];
    }

    makeReservation(type) {
        const room = this.hotel.findAvailableRoom(type);
        if (room) {
            if (room.bookRoom()) {
                this.reservations.push(room);
                return `Room ${room.number} booked successfully.`;
            }
        }
        return 'No available rooms of this type.';
    }

    cancelReservation(roomNumber) {
        const room = this.reservations.find(r => r.number === roomNumber);
        if (room) {
            if (room.cancelBooking()) {
                this.reservations = this.reservations.filter(r => r.number !== roomNumber);
                return `Reservation for room ${roomNumber} cancelled.`;
            }
        }
        return 'Reservation not found.';
    }

    viewReservations() {
        if (this.reservations.length === 0) {
            return 'No current reservations.';
        }
        return this.reservations.map(r => `Room ${r.number}, Type: ${r.type}, Price: $${r.price}`).join('\n');
    }
}


class RoomManager {
    constructor(hotel) {
        this.hotel = hotel;
    }

    displayAvailableRooms() {
        const availableRooms = this.hotel.getAvailableRooms();
        if (availableRooms.length === 0) {
            return 'No available rooms.';
        }
        return availableRooms.map(room => `Room ${room.number}, Type: ${room.type}, Price: $${room.price}`).join('\n');
    }
}


const hotel = new Hotel('Grand Hotel');
hotel.addRoom(new Room(101, 'single', 100));
hotel.addRoom(new Room(102, 'double', 150));
hotel.addRoom(new Room(103, 'suite', 200));
hotel.addRoom(new Room(104, 'double', 150));


const reservation = new Reservation(hotel);


const roomManager = new RoomManager(hotel);


function updateReservationList() {
    const reservationList = document.getElementById('reservation-list');
    reservationList.textContent = reservation.viewReservations();
}


function updateAvailableRooms() {
    const availableRooms = document.getElementById('available-rooms');
    availableRooms.textContent = roomManager.displayAvailableRooms();
}


document.getElementById('booking-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const roomType = document.getElementById('room-type').value.split(' - ')[0];
    const result = reservation.makeReservation(roomType);
    alert(result);
    updateAvailableRooms();
    updateReservationList();
});


document.getElementById('cancellation-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const roomNumber = parseInt(document.getElementById('room-number').value, 10);
    const result = reservation.cancelReservation(roomNumber);
    alert(result);
    updateAvailableRooms();
    updateReservationList();
});


updateAvailableRooms();
updateReservationList();