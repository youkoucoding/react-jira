import { rest } from "msw";
import { setupServer } from "msw/node";
import { http } from "utils/http";

const apiUrl = process.env.REACT_APP_API_URL;

const server = setupServer();

// beforeAll 执行所有测试之前，先执行此回调函数
beforeAll(() => server.listen());

// 每一个测试完成后， 都重置mock路由
afterEach(() => server.resetHandlers());

// 所有的测试都结束后，关闭mock路由
afterAll(() => server.close());

test("http发送异步请求", async () => {
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };

  server.use(
    rest.get(`${apiUrl}/${endpoint}`, (req, res, ctx) =>
      res(ctx.json(mockResult))
    )
  );

  const result = await http(endpoint);
  expect(result).toEqual(mockResult);
});

test("http发送请求时，会在header中加入Token", async () => {
  const token = "FAKE_TOKEN";
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };

  let request: any;

  server.use(
    rest.get(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    })
  );

  await http(endpoint, { token });

  expect(request.headers.get("Authorization")).toBe(`Bearer ${token}`);
});
