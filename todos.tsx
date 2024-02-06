import { data } from "@ampt/data";

export const TodosComponent = async () => {
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
