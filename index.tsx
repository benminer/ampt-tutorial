import { Hono } from "hono";
import { params } from "@ampt/sdk";
import { TodosComponent } from "./todos";

const app = new Hono();

app.use("*", async (c, next) => {
  // console.log(`${c.req.method} ${c.req.url}`);
  await next();
});

app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));

app.get("/", (c) => {
  const envName = params("ENV_NAME");

  return c.html(
    <html>
      <head>
        <title>{envName}'s Ampt Tutorial</title>
      </head>
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          margin: 0,
          backgroundColor: "#e0e0e0",
          color: "#333",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: 0,
          }}
        >
          <img
            src="/ampt.svg"
            alt="Ampt Logo"
            width="100"
            style={{ paddingTop: "10px", alignSelf: "center" }}
          />
          <h1>Welcome to the Ampt Tutorial, {envName}!</h1>
        </div>
        <TodosComponent />
      </body>
    </html>
  );
});

app.fire();
