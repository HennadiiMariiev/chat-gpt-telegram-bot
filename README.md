# ChatGPT Telegram Bot 🤖

## General

This is very simple ChatGPT Telegram Bot.
App is based on [node-telegram-bot-api](https://www.npmjs.com/package/node-telegram-bot-api) and [OpenAI](https://platform.openai.com/) and written on TypeScript.

## App Functionality

This telegram bot can answer your questions and generate images, based on your explanation. Bot uses **gpt-3.5-turbo** AI model.
Also app saves all users and there requests history to db. Each user has a 10 requests limit, but there is some magic command 😁 for restoring this limit. You can set this command with env-variable, so it will not appear in your codebase. You'll receive a message in Telegram, when new user type **/start** command in bot. Just set OWNER_ID variable with your telegram id.

### Please, feel free to use this repo))

Clone it, install dependencies, create and config your bot with [BotFather](https://t.me/BotFather), finally paste your environment variables described in env-example file and run the app.
