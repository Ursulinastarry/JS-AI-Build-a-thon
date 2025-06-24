import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

// Create a new MCP server instance for your salon search agent
const server = new McpServer({
    name: "node-salon-mcp",
    description: "A server that provides tools for finding open salons in a given area.",
    version: "1.0.0",
});

// Define the `search_open_salons` tool
server.tool(
  "search_open_salons",
  "Search for open salons in a given area and return a list of available salons.",
  {
    type: "object",
    properties: {
      location: {
        type: "string",
        description: "The name of the area or city to search for salons."
      }
    },
    required: ["location"]
  },
  async ({ location }) => {
    const mockSalons = {
      nyeri: ["Hair by Nelly", "Glow & Go", "The Hair Spot"],
      westlands: ["Urban Curls", "Style Hub", "Salon Royale"]
    };

    const salons = mockSalons[location.toLowerCase()] || [];

    if (salons.length === 0) {
      return {
        content: [{
          type: "text",
          text: `No open salons found in ${location}.`
        }],
        isError: false
      };
    }

    return {
      content: [{
        type: "text",
        text: `Here are open salons in ${location}:\n- ${salons.join("\n- ")}`
      }],
      isError: false
    };
  }
);


// Export your server instance
export { server };



