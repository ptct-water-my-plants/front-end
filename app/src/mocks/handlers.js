import { rest } from "msw";

const token =
  "ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98";

let plants = [
  {
    plant: "aliceblue",
    description: '',
    id: 1,
  },
  {
    plant: "limegreen",
    description: '',
    id: 2,
  },
  {
    plant: "aqua",
    description: '',
    id: 3,
  },
  {
    plant: "aquamarine",
    description: '',
    id: 4,
  },
  {
    plant: "lilac",
    description: '',
    id: 5,
  },
  {
    plant: "softpink",
    description: '',
    id: 6,
  },
  {
    plant: "bisque",
    description: '',
    id: 7,
  },
  {
    plant: "softyellow",
    description: '',
    id: 8,
  },
  {
    plant: "blanchedalmond",
    description: '',
    id: 9,
  },
  {
    plant: "blue",
    description: '',
    id: 10,
  },
  {
    plant: "blueviolet",
    description: '',
    id: 11,
  },
];

let nextId = 12;

function authenticator(req) {
  const { authorization } = req.headers.map;
  return authorization === token;
}

const urlBase = "http://localhost:5000/api";

export const handlers = [
  // Handles a POST /login request
  rest.post(`${urlBase}/login`, (req, res, ctx) => {
    const { username, password } = req.body;
    if (username === "Lambda School" && password === "i<3Lambd4") {
      return res(
        ctx.status(200),
        ctx.json({
          payload: token,
        })
      );
    } else {
      return res(
        ctx.status(403),
        ctx.json({ error: "Username or Password incorrect. Please see Readme" })
      );
    }
  }),
  // Handles a GET /user request
  rest.get(`${urlBase}/plants`, (req, res, ctx) => {
    if (authenticator(req)) {
      return res(ctx.status(200), ctx.json(plants));
    } else {
      res(
        ctx.status(403),
        ctx.json({ error: "User must be logged in to do that." })
      );
    }
  }),

  rest.post(`${urlBase}/plants`, (req, res, ctx) => {
    if (authenticator(req)) {
      if (req.body.plant !== undefined && req.body.description !== undefined) {
        const newplant = req.body;
        newplant.id = nextId;
        plants.push(newplant);
      }
      nextId = nextId + 1;
      return res(ctx.status(201), ctx.json(plants));
    } else {
      return res(
        ctx.status(403),
        ctx.json({ error: "User must be logged in to do that." })
      );
    }
  }),

  rest.put(`${urlBase}/plants/:id`, (req, res, ctx) => {
    if (authenticator(req)) {
      if (!req.params.id) {
        return res(
          ctx.status(400),
          ctx.json("Your request is missing the plant id")
        );
      }

      if (req.body.id === undefined || !req.body.plant || !req.body.description) {
        return res(
          ctx.status(422),
          ctx.json("Make sure your request body has all the fields it needs")
        );
      }

      plants = plants.map((plant) => {
        if (`${plant.id}` === req.params.id) {
          return req.body;
        }
        return plant;
      });

      return res(ctx.status(200), ctx.json(req.body));
    } else {
      return res(
        ctx.status(403),
        ctx.json({ error: "User must be logged in to do that." })
      );
    }
  }),

  rest.delete(`${urlBase}/plants/:id`, (req, res, ctx) => {
    if (authenticator(req)) {
      if (!req.params.id)
        return res(
          ctx.status(400),
          ctx.json("Your request is missing the plant id")
        );
      plants = plants.filter((plant) => `${plant.id}` !== req.params.id);
      return res(ctx.status(202), ctx.json(req.params.id));
    } else {
      return res(
        ctx.status(403),
        ctx.json({ error: "User must be logged in to do that." })
      );
    }
  }),

  rest.get(urlBase, function (req, res, ctx) {
    return res(ctx.status(200), ctx.json("The App is working!"));
  }),
];
