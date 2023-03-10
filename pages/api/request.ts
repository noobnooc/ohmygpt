// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import server from "../../config-server";
import { NextRequest } from "next/server";
import { OpenAIStream } from "../../helpers/openai-stream";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const requestBody = await req.json();

  let messageContent: string = requestBody.input;

  if (typeof messageContent !== "string" || !messageContent) {
    return new Response(null, { status: 404 });
  }

  if (server.messageTemplate) {
    if (server.messageTemplate.includes("{{input}}")) {
      messageContent = server.messageTemplate.replaceAll(
        "{{input}}",
        messageContent
      );
    } else {
      messageContent = server.messageTemplate + "\n\n" + messageContent;
    }
  }

  let systemMessage = server.systemMessage
    ? {
        role: "system",
        content: server.systemMessage,
      }
    : undefined;
  let userMessage = {
    role: "user",
    content: messageContent,
  };

  const payload = {
    model: "gpt-3.5-turbo",
    messages: systemMessage ? [systemMessage, userMessage] : [userMessage],
    stream: true,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}
