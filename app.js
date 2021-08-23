const db = require('./db');
db.Initiate();
const http = require('http');
const express = require('express');
const passport = require('passport');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// cors
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// parse application/json
app.use(express.json());

//routes
const routes = require('./routes');
app.use('/api', routes);

////////////////////

// app.use(Middlewares.ipInfoMiddleware)
app.use(passport.initialize());
app.use(passport.session());
const AdminJWTPassport = require('./passport.admin');
const UserJWTPassport = require('./passport.user');
AdminJWTPassport(passport);
UserJWTPassport(passport);

const PORT = process.env.PORT || 4444;

const WebSocket = require('./websocket');
const main = async () => {
    WebSocket.Initiate(server);
    app.get('/', (req, res) => {
        res.json({foo: 'bar'});
    });

    server.listen(PORT, () => {
        console.log(`[HTTP SERVER] Server listening on : ${PORT}`);
    });
};
main();

// const ethers = require('ethers');

// const provider = new ethers.providers.InfuraProvider(
//     'kovan',
//     '22cd1e640bb44734afa091abc58b66b6'
// );
// console.log(provider);
// const tops = [
//     'NewRole(bytes32)',
//     'RoleAdminChanged(bytes32, bytes32, bytes32)',
//     'RoleGranted(bytes32, address, address)',
//     'RoleRevoked(bytes32, address, address)',
// ];
// filter = {
//     address: '0x89d33d1f3735e16f2f1e5946009b69d9a7e10f06',
//     topics: [ethers.utils.id(tops[0])],
// };

// const a = async () => {
//     let b = await provider.getBlockNumber();

//     const logs = await provider.getLogs({
//         address: '0x89d33d1f3735e16f2f1e5946009b69d9a7e10f06',
//         fromBlock: b - 10000,
//         toBlock: 'latest',
//         topics: [ethers.utils.id(tops[0])],
//     });
//     console.log(logs);
// };

// const abi = [
//     'event NewRole(bytes32 indexed role)',
//     'event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole)',
//     'event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender)',
//     'event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender)',
// ];

// contract = new ethers.Contract(
//     '0x89d33d1f3735e16f2f1e5946009b69d9a7e10f06',
//     abi,
//     provider
// );

// contract.on('NewRole', (d, dd) => {
//     console.log('3', d, dd);
// });

// provider.on(filter, (d, dd) => {
//     console.log('1', d, dd);
// });
