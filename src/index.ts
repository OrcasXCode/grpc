import path from 'path';
import * as grpc  from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { GrpcObject,ServiceClientConstructor } from '@grpc/grpc-js';
import { ProtoGrpcType } from './generated/a';


const packageDefinition = protoLoader.loadSync(path.join(__dirname,'../src/a.proto'));
const personProto = (grpc.loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType;
const Persons:any[]=[];

function addPerson(call:any,callback:any){
    let person={
        name:call.request.name,
        age:call.request.age
    }
    Persons.push(person);
    callback(null,person);
}

const server=new grpc.Server();

// @ts-ignore
server.addService(personProto.AddressBookService.service,{addPerson:addPerson});

server.bindAsync('0.0.0.0:50051',grpc.ServerCredentials.createInsecure(),()=>{
    server.start();
})


