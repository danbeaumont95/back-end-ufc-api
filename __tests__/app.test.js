const request = require("supertest");
const apis = require("../routes.json");
const app = require("../app");
const connection = require("../db/connection");

afterAll(() => {
  return connection.destroy();
});

beforeEach(() => {
  return connection.seed.run();
});

describe("/", () => {
  test("GET: 200 response with correct status code and returns status code", () => {
    return request(app)
      .get("/")
      .expect(200)
      .then(({ body }) => {
        expect(body.welcome).toEqual(
          expect.objectContaining({
            description: expect.any(String),
            apiPath: expect.any(String),
          })
        );
      });
  });
});

describe("/api", () => {
  test("GET:200 responds with correct status code", () => {
    return request(app).get("/api").expect(200);
  });
  test("GET:200 response with all routes", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        console.log(body.apis);
        expect(body.apis).toEqual(apis);
      });
  });
});

describe("/api/fighters", () => {
  test("GET:200 responds with correct status code", () => {
    return request(app).get("/api/fighters").expect(200);
  });
  test("GET:200 responds with array of all fighters", () => {
    return request(app)
      .get("/api/fighters")
      .expect(200)
      .then(({ body }) => {
        console.log(body.fighters);
        expect(body.fighters).toHaveLength(3);
        expect(body.fighters[0]).toEqual(
          expect.objectContaining({
            first_name: expect.any(String),
            surname: expect.any(String),
            full_name: expect.any(String),
            weight: expect.any(String),
            age: expect.any(Number),
            dob: expect.any(String),
            champ_status: expect.any(String),
            next_fight: expect.any(String),
            img_url: expect.any(String),
          })
        );
      });
  });
  test("POST:201 responds with correct status code", () => {
    const input = {
      first_name: "Leon",
      surname: "Edwards",
      full_name: "LeonEdwards",
      weight: "Welterweight",
      age: 29,
      dob: "18/07/1991",
      champ_status: "NA",
      next_fight: "Belal Muhammed",
      img_url:
        "https://img.bleacherreport.net/img/images/photos/003/869/668/hi-res-12f1daf6b3f44792ca1bf721a87633e0_crop_north.jpg?1590248758&w=3072&h=2048",
    };
    return request(app).post("/api/fighters").send(input).expect(201);
  });
  test("POST:201 adds new fighter to fighters table", () => {
    const input = {
      first_name: "Leon",
      surname: "Edwards",
      full_name: "LeonEdwards",
      weight: "Welterweight",
      age: 29,
      dob: "18/07/1991",
      champ_status: "NA",
      next_fight: "Belal Muhammed",
      img_url:
        "https://img.bleacherreport.net/img/images/photos/003/869/668/hi-res-12f1daf6b3f44792ca1bf721a87633e0_crop_north.jpg?1590248758&w=3072&h=2048",
    };
    const expected = {
      first_name: "Leon",
      surname: "Edwards",
      full_name: "LeonEdwards",
      weight: "Welterweight",
      age: 29,
      dob: "18/07/1991",
      champ_status: "NA",
      next_fight: "Belal Muhammed",
      img_url:
        "https://img.bleacherreport.net/img/images/photos/003/869/668/hi-res-12f1daf6b3f44792ca1bf721a87633e0_crop_north.jpg?1590248758&w=3072&h=2048",
    };
    return request(app)
      .post("/api/fighters")
      .send(input)
      .expect(201)
      .then(({ body }) => {
        expect(body.fighter).toEqual(expected);
      });
  });
});

describe("/api/fighters/:full_name", () => {
  test("GET:200 responds with correct status code", () => {
    return request(app).get("/api/fighters/ConorMcgregor").expect(200);
  });
  test("GET:200 responds with correct fighter based on passed parameter Mcgregor", () => {
    return request(app)
      .get("/api/fighters/ConorMcgregor")
      .expect(200)
      .then(({ body: { fighter } }) => {
        expect(fighter).toEqual(
          expect.objectContaining({
            first_name: "Conor",
            surname: "Mcgregor",
            full_name: "ConorMcgregor",
            weight: "Lightweight",
            age: 32,
            dob: "14/07/88",
            champ_status: "NA",
            next_fight: "TBA",
            img_url:
              "https://img.bleacherreport.net/img/images/photos/003/869/668/hi-res-12f1daf6b3f44792ca1bf721a87633e0_crop_north.jpg?1590248758&w=3072&h=2048",
          })
        );
      });
  });
  test("GET:200 responds with correct fighter based on passed parameter Masvidal", () => {
    return request(app)
      .get("/api/fighters/JorgeMasvidal")
      .expect(200)
      .then(({ body: { fighter } }) => {
        expect(fighter).toEqual(
          expect.objectContaining({
            first_name: "Jorge",
            surname: "Masvidal",
            full_name: "JorgeMasvidal",
            weight: "Welterweight",
            age: 36,
            dob: "12/11/84",
            champ_status: "BMF champ",
            next_fight: "TBA",
            img_url:
              "http://mmauk.net/wp-content/uploads/2020/07/inbound8592821476642478449.jpg",
          })
        );
      });
  });
  test("DELETE:200 responds with correct status code", () => {
    const input = { first_name: "Jorge" };
    return (
      request(app)
        .delete("/api/fighters/JorgeMasvidal")
        // .send(input)
        .expect(200)
    );
  });
  test("DELETE:200 responds with correct error code if passed false full_name", () => {
    const input = { first_name: "Jorge" };
    return (
      request(app)
        .delete("/api/fighters/invalidFighterName")
        // .send(input)
        .expect(404)
        .then(({ body }) => {
          console.log(body, "body");
          expect(body.msg).toBe("No fighter found");
        })
    );
  });
});

describe("/api/fighters/weight/:weight", () => {
  test("GET:200 responds with correct status code", () => {
    return request(app).get("/api/fighters/weight/Lightweight").expect(200);
  });
  test("GET:200 responds with fighters depending on passed weight parameter", () => {
    return request(app)
      .get("/api/fighters/weight/Welterweight")
      .expect(200)
      .then(({ body: { fighters } }) => {
        expect(fighters).toEqual([
          {
            first_name: "Jorge",
            surname: "Masvidal",
            full_name: "JorgeMasvidal",
            weight: "Welterweight",
            age: 36,
            dob: "12/11/84",
            champ_status: "BMF champ",
            next_fight: "TBA",
            img_url:
              "http://mmauk.net/wp-content/uploads/2020/07/inbound8592821476642478449.jpg",
          },
        ]);
      });
  });
  test("GET:200 responds with fighters depending on passed weight parameter Lightweight", () => {
    return request(app)
      .get("/api/fighters/weight/Lightweight")
      .expect(200)
      .then(({ body: { fighters } }) => {
        expect(fighters).toEqual([
          {
            first_name: "Conor",
            surname: "Mcgregor",
            full_name: "ConorMcgregor",
            weight: "Lightweight",
            age: 32,
            dob: "14/07/88",
            champ_status: "NA",
            next_fight: "TBA",
            img_url:
              "https://img.bleacherreport.net/img/images/photos/003/869/668/hi-res-12f1daf6b3f44792ca1bf721a87633e0_crop_north.jpg?1590248758&w=3072&h=2048",
          },
        ]);
      });
  });
});

describe("/api/fighters/champions/champ_status", () => {
  test("GET:200 responds with correct status code", () => {
    return request(app).get("/api/fighters/champions/champ_status").expect(200);
  });
  test("GET:200 responds with correct fighters that are champions", () => {
    return request(app)
      .get("/api/fighters/champions/champ_status")
      .expect(200)
      .then(({ body: { fighters } }) => {
        expect(fighters).toEqual([
          {
            first_name: "Jorge",
            surname: "Masvidal",
            full_name: "JorgeMasvidal",
            weight: "Welterweight",
            age: 36,
            dob: "12/11/84",
            champ_status: "BMF champ",
            next_fight: "TBA",
            img_url:
              "http://mmauk.net/wp-content/uploads/2020/07/inbound8592821476642478449.jpg",
          },
          {
            first_name: "Israel",
            surname: "Adesanya",
            full_name: "IsraelAdesanya",
            weight: "Middleweight",
            age: 31,
            dob: "22/07/89",
            champ_status: "Middleweight champ",
            next_fight: "Jan Blachowicz",
            img_url:
              "https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_90,w_1400/fl_lossy,pg_1/mis1v3kp5naybwffoegj/ufc-bc-header-1",
          },
        ]);
      });
  });
});

describe("/api/staff", () => {
  test("GET:200 responds with correct status code", () => {
    return request(app).get("/api/staff").expect(200);
  });
  test("GET: 200 responds with all staff members", () => {
    return request(app)
      .get("/api/staff")
      .expect(200)
      .then(({ body }) => {
        expect(body.staff).toHaveLength(3);
        expect(body.staff[0]).toEqual(
          expect.objectContaining({
            first_name: expect.any(String),
            surname: expect.any(String),
            full_name: expect.any(String),
            age: expect.any(Number),
            role: expect.any(String),
            years_at_company: expect.any(Number),
            img_url: expect.any(String),
          })
        );
      });
  });
});

describe("/api/staff/:full_name", () => {
  test("GET:200 responds with correct status code", () => {
    return request(app).get("/api/staff/DanaWhite").expect(200);
  });
  test("GET:200 responds with correct ufc staff member", () => {
    return request(app)
      .get("/api/staff/DanaWhite")
      .expect(200)
      .then(({ body: { staff } }) => {
        expect(staff).toEqual(
          expect.objectContaining({
            first_name: "Dana",
            surname: "White",
            full_name: "DanaWhite",
            age: 51,
            role: "President of UFC",
            years_at_company: 20,
            img_url:
              "https://cdn.vox-cdn.com/thumbor/GdRhyXvqzVVmOxnEaw10Kw8q5bU=/0x0:3300x2392/1200x800/filters:focal(1561x388:2089x916)/cdn.vox-cdn.com/uploads/chorus_image/image/68825477/1281460972.0.jpg",
          })
        );
      });
  });
});

describe("/api/events", () => {
  test("GET:200 responds with correct status code", () => {
    return request(app).get("/api/events").expect(200);
  });
  test("GET:200 responds with array of all events", () => {
    return request(app)
      .get("/api/events")
      .expect(200)
      .then(({ body }) => {
        expect(body.events).toHaveLength(3);
        expect(body.events[0]).toEqual(
          expect.objectContaining({
            event: expect.any(String),
            location: expect.any(String),
            date: expect.any(String),
            main_event: expect.any(String),
            co_main_event: expect.any(String),
            fight_three: expect.any(String),
            fight_four: expect.any(String),
          })
        );
      });
  });
});

/*
expect(body.fighters[0]).toEqual(expect.objectContaining({
                first_name: expect.any(String),
                surname: expect.any(String),
                full_name: expect.any(String),
                weight: expect.any(String),
                age: expect.any(Number),
                dob: expect.any(String),
                champ_status: expect.any(String),
                next_fight: expect.any(String),
                img_url: expect.any(String)
            }))
*/

describe("/api/weights", () => {
  test("GET:200 responds with correct status code", () => {
    return request(app).get("/api/weights").expect(200);
  });
  test("GET:200 responds with array of all weight classes", () => {
    return request(app)
      .get("/api/weights")
      .expect(200)
      .then(({ body }) => {
        expect(body.weights).toHaveLength(2);
        expect(body.weights[0]).toEqual(
          expect.objectContaining({
            weights: expect.any(String),
          })
        );
      });
  });
});

describe("/api/store", () => {
  test("GET:200 responds with correct status code", () => {
    return request(app).get("/api/store").expect(200);
  });
  test("GET:200 responds with all items in store", () => {
    return request(app)
      .get("/api/store")
      .expect(200)
      .then(({ body }) => {
        expect(body.items).toHaveLength(3);
        expect(body.items[0]).toEqual(
          expect.objectContaining({
            item_name: expect.any(String),
            price: expect.any(Number),
            description: expect.any(String),
            sizes: expect.any(String),
            img_url: expect.any(String),
            type: expect.any(String),
          })
        );
      });
  });
});

describe("/api/store/:type", () => {
  test("GET:200 responds with correct status code", () => {
    return request(app).get("/api/store/Gaming").expect(200);
  });
  test("GET:200 responds with all items of passed type gaming", () => {
    return request(app)
      .get("/api/store/Gaming")
      .expect(200)
      .then(({ body }) => {
        expect(body.items[0]).toEqual(
          expect.objectContaining({
            item_name: expect.any(String),
            price: expect.any(Number),
            description: expect.any(String),
            sizes: expect.any(String),
            img_url: expect.any(String),
            type: expect.any(String),
          })
        );
      });
  });
  test("GET:200 responds with all items of passed type Clothing", () => {
    return request(app)
      .get("/api/store/Clothing")
      .expect(200)
      .then(({ body }) => {
        expect(body.items[0]).toEqual(
          expect.objectContaining({
            item_name: expect.any(String),
            price: expect.any(Number),
            description: expect.any(String),
            sizes: expect.any(String),
            img_url: expect.any(String),
            type: expect.any(String),
          })
        );
      });
  });
});

describe("/api/types", () => {
  test("GET:200 responds with correct status code", () => {
    return request(app).get("/api/types").expect(200);
  });
  test("GET:200 responds with all types", () => {
    return request(app)
      .get("/api/types")
      .expect(200)
      .then(({ body: { type } }) => {
        expect(type).toHaveLength(2);
        expect(type[0]).toEqual(
          expect.objectContaining({
            type: expect.any(String),
          })
        );
      });
  });
});
