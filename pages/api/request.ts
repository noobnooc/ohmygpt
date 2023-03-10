// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import server from "../../config-server";
import { OpenAIClient, OpenAI } from "@fern-api/openai";
import { MESSAGE_DONE_SYMBOL } from "../../constants";

type Data = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let messageContent = req.query.input;

  if (typeof messageContent !== "string" || !messageContent) {
    return res.status(404).json({
      error: "invalid request",
    });
  }

  if (server.messageTemplate) {
    if (server.messageTemplate.includes("{{input}}")) {
      messageContent = server.messageTemplate.replaceAll(
        "{{input}}",
        messageContent
      );
    } else {
      messageContent = server.messageTemplate + messageContent;
    }
  }

  let systemMessage: OpenAI.ChatCompletionRequestMessage | undefined =
    server.systemMessage
      ? {
          role: "system",
          content: server.systemMessage,
        }
      : undefined;
  let userMessage: OpenAI.ChatCompletionRequestMessage = {
    role: "user",
    content: messageContent,
  };

  const headers = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    // To avoid to block the SSE stream
    "Content-Encoding": "none",
  };

  res.writeHead(200, headers);

  const client = new OpenAIClient({
    token: server.openAIAPIKey,
  });

  client.chat.createCompletion(
    {
      model: "gpt-3.5-turbo",
      messages: systemMessage ? [systemMessage, userMessage] : [userMessage],
      stream: true,
    },
    (data) => {
      let content = data.choices[0]?.delta.content;
      if (content) {
        res.write(`data: ${content}\n\n`);
      }
    },
    {
      onError(err) {
        res.write(`data: ${MESSAGE_DONE_SYMBOL}\n\n`);
      },
      onFinish() {
        res.write(`data: ${MESSAGE_DONE_SYMBOL}\n\n`);
      },
    }
  );
}
