# OhMyGPT

OhMyGPT is a project that enables you to deploy a ChatGPT-based web app within minutes, by just configuring some environment variables. You will get a web app similar to the demos found on https://polisher.vercel.app and https://ohmyzhen.vercel.app.

To deploy your web app based on ChatGPT, you will require an API key from [OpenAI](https://platform.openai.com/account/api-keys) and an account in [Vercel](https://vercel.com). We plan to expand our support to include more cloud platforms in the future. However, currently, it has only been tested on Vercel.

## Get Start

1. Fork this repository to your own GitHub account.
2. Log in to your [Vercel](https://vercel.com) console to create a new project from the forked repository. ( ℹ️ Don't click the Deploy button at this moment)
3. [Setting up Environment Variables](#setting-up-environment-variables) in the Configure Project Step.
4. Deploy your application and give Vercel a moment to complete the deployment process.
5. Visit your web app in your web browser, and share it to your friends. 🥳

## Setting up Environment Variables

You can customize your application by using environment variables. Here are all available variables and the usages:

```env
# Client side

# The app logo url.
APP_LOGO="https://avatars.githubusercontent.com/u/38027416?v=4"
# The name of the app.
APP_NAME="Oh My Polisher"
# Summary your app's behavoir and show the users how to user it.
APP_SUMMARY="Correcting and polishing your text."
# Example input that shows user how to use the app.
EXAMPLE_INPUT="Hello there, im Nooc, it's glad to see you."

# Server side

# Required, the API key got from OpenAI (https://platform.openai.com/account/api-keys)
OPENAI_API_KEY="sk-XXXXXXXXX"
# Optional, the agent server of OpenAI API. Use this when the offical OpenAI API server is unreachable.
OPENAI_API_BASE_URL=""
# Optional, the system message helps set the behavior of the assistant. (Learn more from https://platform.openai.com/docs/guides/chat/introduction)
SYSTEM_MESSAGE="You are a language polisher, corrects and polishes the given content."
# Optional, the message template to wrap the user inputs, the `{{input}}` string in the template will be replaced by user inputs.
MESSAGE_TEMPLATE="Correct and polish the following content: "
```

You can edit the example file located in the root directory of this project named `.env.example`. Once you have made the necessary changes, you can then copy and paste the entire content of the file into the "Environment Variables" input field on the Vercel console.
