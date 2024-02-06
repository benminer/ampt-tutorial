import { Hono } from "hono";
import { params } from "@ampt/sdk";
import { data } from "@ampt/data";

const TodosComponent = async () => {
  const { items: todos } = await data.get<any>("todo:*");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ textAlign: "center" }}>tutorial todos</h1>
      {todos.length === 0 && (
        <div style={{ color: "#888", fontStyle: "italic" }}>no todos found</div>
      )}
      {todos.length > 0 &&
        todos.map((todo, index) => {
          const title = todo.value.name;
          const description = todo.value.description;
          const descriptionWithLinks = description?.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
          );
          return (
            <div
              key={index}
              style={{
                backgroundColor: "#f9f9f9",
                padding: "20px",
                margin: "10px 0",
                borderRadius: "5px",
                width: "100%",
                boxSizing: "border-box",
                fontFamily: "Arial, sans-serif",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#333",
                  fontSize: "1.5em",
                  fontWeight: "bold",
                  textDecoration:
                    todo.value.status === "complete" ? "line-through" : "none",
                }}
              >
                {title}
              </h2>
              {descriptionWithLinks ? (
                <p
                  style={{ margin: "10px 0", color: "#444" }}
                  dangerouslySetInnerHTML={{ __html: descriptionWithLinks }}
                />
              ) : description ? (
                <p style={{ margin: "10px 0", color: "#444" }}>{description}</p>
              ) : null}
            </div>
          );
        })}
    </div>
  );
};

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
