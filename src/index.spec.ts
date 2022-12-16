import fetch from 'node-fetch';
import {startServer, stopServer} from './index';

test('basic test', async () => {
  const server = startServer(1818);
  const response = await fetch('http://localhost:1818/api/v1/sysinfo', {method: 'GET'});
  const data = await response.json();
  expect(await data).toHaveProperty('cpu');
  expect(await data).toHaveProperty('system');
  expect(await data).toHaveProperty('mem');
  expect(await data).toHaveProperty('os');
  expect(await data).toHaveProperty('currentLoad');
  expect(await data).toHaveProperty('processes');
  expect(await data).toHaveProperty('diskLayout');
  expect(await data).toHaveProperty('networkInterfaces');
  stopServer(server);
});


