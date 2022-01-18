const defines = {
serverUrl: "http://47.107.240.81:3000"
}, isopen_sound = 1;

qian_state = {
buqiang: 0,
qian: 1
};

const RoomState = {
ROOM_INVALID: -1,
ROOM_WAITREADY: 1,
ROOM_GAMESTART: 2,
ROOM_PUSHCARD: 3,
ROOM_ROBSTATE: 4,
ROOM_SHOWBOTTOMCARD: 5,
ROOM_PLAYING: 6,
ROOM_SETTLE: 7
};

createRoomConfig = {
rate_1: {
needCostGold: 10,
bottom: 1,
rate: 1
},
rate_2: {
needCostGold: 100,
bottom: 10,
rate: 2
},
rate_3: {
needCostGold: 200,
bottom: 20,
rate: 3
},
rate_4: {
needCostGold: 500,
bottom: 50,
rate: 4
}
};

const CardsValue = {
one: {
name: "One",
value: 1
},
double: {
name: "Double",
value: 1
},
three: {
name: "Three",
value: 1
},
boom: {
name: "Boom",
value: 2
},
threeWithOne: {
name: "ThreeWithOne",
value: 1
},
threeWithTwo: {
name: "ThreeWithTwo",
value: 1
},
plane: {
name: "Plane",
value: 1
},
planeWithOne: {
name: "PlaneWithOne",
value: 1
},
planeWithTwo: {
name: "PlaneWithTwo",
value: 1
},
scroll: {
name: "Scroll",
value: 1
},
doubleScroll: {
name: "DoubleScroll",
value: 1
},
kingboom: {
name: "Kingboom",
value: 3
}
};

window.defines = defines;