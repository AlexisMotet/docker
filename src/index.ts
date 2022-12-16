import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import si from 'systeminformation';


interface ISystemInformation {
  cpu: si.Systeminformation.CpuData;
  system: si.Systeminformation.SystemData;
  mem: si.Systeminformation.MemData;
  os: si.Systeminformation.OsData;
  currentLoad: si.Systeminformation.CurrentLoadData;
  processes: si.Systeminformation.ProcessesData;
  diskLayout: si.Systeminformation.DiskLayoutData[];
  networkInterfaces: si.Systeminformation.NetworkInterfacesData[];
}

export async function getSystemInfo() {
  let systeminfo = <ISystemInformation>{};
  systeminfo.cpu = await si.cpu();
  systeminfo.system = await si.system();
  systeminfo.mem = await si.mem();
  systeminfo.os = await si.osInfo();
  systeminfo.currentLoad = await si.currentLoad();
  systeminfo.processes = await si.processes();
  systeminfo.diskLayout = await si.diskLayout();
  systeminfo.networkInterfaces = await si.networkInterfaces();
  return JSON.stringify(systeminfo);
}

export function handleRequests(request: IncomingMessage, response: ServerResponse) {
  switch (request.url) {
    case "/api/v1/sysinfo" : {
      if (request.method === 'GET') {
        getSystemInfo().then(data => {
          response.end(data);
        })
      }
      break;
    }
    default: {
      response.statusCode = 404;
      response.end();
      break;
    }
  }
}

export function startServer(port: number) {
  console.log(`URL : http://localhost:${port}/api/v1/sysinfo`)
  const server = createServer((request: IncomingMessage, response: ServerResponse) => 
    {handleRequests(request, response)});
  return server.listen(port);
}

export function stopServer(server : Server) {
  server.close();
}

startServer(5000);


