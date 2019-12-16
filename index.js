const Hapi = require("@hapi/hapi");
const crypto = require("crypto");

const state = {};

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: true
    }
  });

  server.route({
    method: "GET",
    path: "/first/{id}",
    handler: (request, h) => {
      const id = request.params.id;
      const date = Date.now();
      if (!state[id]) {
        state[id] = {};
      }
      if (state[id].status === "fail") {
        return h.response({ status: "fail" }).code(404);
      }
      let subState = state[id].first;
      if (subState) {
        if (date < subState.expect || date > subState.fail) {
          state[id] = {
            status: "fail"
          };
          return h.response({ status: "fail" }).code(404);
        }
      }

      subState = {
        was: date,
        expect: date + Math.floor(Math.random() * 1000 * 10),
        fail: date + 150000
      };
      if (!state[id]) {
        state.id = {};
      }
      state[id].first = subState;
      if (subState.expect - subState.was > 4500) {
        return h
          .response({ bigDiff: subState.expect - subState.was, id })
          .code(400);
      }
      return { diff: subState.expect - subState.was, id };
    }
  });

  server.route({
    method: "GET",
    path: "/second/{id}",
    handler: (request, h) => {
      const id = request.params.id;
      const date = Date.now();
      if (!state[id]) {
        state[id] = {};
      }
      if (state[id].status === "fail") {
        return h.response({ status: "fail" }).code(404);
      }
      let subState = state[id].second;
      if (subState) {
        if (date < subState.expect || date > subState.fail) {
          state[id] = {
            status: "fail"
          };
          return h.response({ status: "fail" }).code(404);
        }
      }

      subState = {
        was: date,
        expect: date + Math.floor(Math.random() * 1000 * 10),
        fail: date + 150000
      };
      if (!state[id]) {
        state.id = {};
      }
      state[id].second = subState;
      if (subState.expect - subState.was > 4500) {
        return h
          .response({ bigDiff: subState.expect - subState.was, id })
          .code(400);
      }
      return { diff: subState.expect - subState.was, id };
    }
  });

  server.route({
    method: "GET",
    path: "/third/{id}",
    handler: (request, h) => {
      const id = request.params.id;
      const date = Date.now();
      if (!state[id]) {
        state[id] = {};
      }
      if (state[id].status === "fail") {
        return h.response({ status: "fail" }).code(404);
      }
      let subState = state[id].third;
      if (subState) {
        if (date < subState.expect || date > subState.fail) {
          state[id] = {
            status: "fail"
          };
          return h.response({ status: "fail" }).code(404);
        }
      }

      subState = {
        was: date,
        expect: date + Math.floor(Math.random() * 1000 * 10),
        fail: date + 150000
      };
      if (!state[id]) {
        state.id = {};
      }
      state[id].third = subState;
      if (subState.expect - subState.was > 4500) {
        return h
          .response({ bigDiff: subState.expect - subState.was, id })
          .code(400);
      }
      return { diff: subState.expect - subState.was, id };
    }
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
