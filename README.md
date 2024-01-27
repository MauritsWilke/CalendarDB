# <img src="./static/favicon.png" title="logo" width=25 style="border-radius: 5px;" /> CalendarDB

CalendarDB is a calendar app for people who want the level of customisation a NoSQL database offers. The interface will be intuitive for those who have used Notion databases.

## 💻 Developing
If you're interested in contributing, search for `TODO` in the codebase! There are a lot of little things I haven't gotten around to implementing yet.

### 🧰 Stack
 - [`SvelteKit`](https://kit.svelte.dev/): Framework used
 - [`TypeScript`](https://www.typescriptlang.org/): Ensures "type safety"
 - [`SCSS`](https://sass-lang.com/): Used for  styling
 - [`Vitest`](https://vitest.dev/): Used for unit tests
 - [`Firebase`](https://firebase.google.com/): Used for auth and as database ([`Firestore`](https://firebase.google.com/docs/firestore))
 - [`Temporal Polyfill`](https://github.com/js-temporal/temporal-polyfill) Gets a shout-out because it's the backbone of this project.

### 🚀 Running
 - Clone the repository locally
 - Set up a Firebase project and update the config in [`firebase.ts`](./src/lib/firebase.ts)
 - Install the dependencies
 - Run the project

```
 $ git clone https://github.com/MauritsWilke/CalendarDB
 $ npm i
 $ npm run dev
```

## 🧭 Roadmap
The design for this project has been done in Figma and can be found [`here`](https://www.figma.com/file/OAItySq20ZbDfqA3OVQOjC/Custom-Calendar-App?type=design&node-id=0-1&mode=design), the related Figjam file can be found [`here`](https://www.figma.com/file/76DfGUPj8fiyIUeAZkSUM7/Moodboard?type=whiteboard&node-id=0%3A1&t=aoKBqLg666HIOYmH-1).

The MVP of this project will be **v1.0.0** and will also (likely) be hosted somewhere.