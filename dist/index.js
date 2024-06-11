"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const grpc = __importStar(require("@grpc/grpc-js"));
const protoLoader = __importStar(require("@grpc/proto-loader"));
const packageDefinition = protoLoader.loadSync(path_1.default.join(__dirname, '../src/a.proto'));
const personProto = grpc.loadPackageDefinition(packageDefinition);
const Persons = [];
function addPerson(call, callback) {
    let person = {
        name: call.request.name,
        age: call.request.age
    };
    Persons.push(person);
    callback(null, person);
}
const server = new grpc.Server();
// @ts-ignore
server.addService(personProto.AddressBookService.service, { addPerson: addPerson });
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});
// import path from 'path';
// import * as grpc from "@grpc/grpc-js";
// import * as protoLoader from "@grpc/proto-loader";
// import { GrpcObject, ServiceClientConstructor } from '@grpc/grpc-js';
// // Load the protobuf file
// const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../src/a.proto'), {
//     keepCase: true,
//     longs: String,
//     enums: String,
//     defaults: true,
//     oneofs: true
// });
// const personProto: GrpcObject = grpc.loadPackageDefinition(packageDefinition);
// // Assuming the structure of the loaded package
// interface AddressBookService extends ServiceClientConstructor {
//     service: any;
// }
// const Persons: any[] = [];
// function addPerson(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>) {
//     let person = {
//         name: call.request.name,
//         age: call.request.age
//     };
//     Persons.push(person);
//     callback(null, person);
// }
// const server = new grpc.Server();
// server.addService((personProto as any).AddressBookService.service, { addPerson: addPerson });
// server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err: Error | null, port: number) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(`Server running at http://0.0.0.0:${port}`);
//     server.start();
// });
