import {startServer} from './index';

test('handleRequest good path', async () => {
  const server = startServer(1818);
  const response = await fetch('http://localhost:1818/testgoodpath', {method: 'GET'});
  const data = await response.json();
  expect(data).toHaveProperty('cpu');
  expect(data).toHaveProperty('system');
  expect(data).toHaveProperty('mem');
  expect(data).toHaveProperty('os');
  expect(data).toHaveProperty('currentLoad');
  expect(data).toHaveProperty('processes');
  expect(data).toHaveProperty('diskLayout');
  expect(data).toHaveProperty('networkInterfaces');
  server.close();
});

test('handleRequest bad path', async () => {
  const server = startServer(1818);
  const response = await fetch('http://localhost:1818/testbadpathFAIL', {method: 'GET'});
  expect(response.status).toBe(404);
  server.close();
});

