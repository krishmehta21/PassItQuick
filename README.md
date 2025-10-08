# Welcome to the project

## Project info

## How can I edit this code?

There are several ways of editing your application.

This project was migrated from a hosted Supabase backend to Firebase (Auth + Firestore + Storage).
Make sure to update the `.env` variables with your Firebase config before running the app.

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps to run locally:

```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies and start dev server
npm install
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

This project can be deployed to any static hosting provider that supports Vite builds (Vercel, Netlify, Firebase Hosting, etc.).

For Firebase Hosting:

- Install Firebase CLI and initialize hosting in your project: `firebase init hosting`.
- Build the app: `npm run build`.
- Deploy: `firebase deploy --only hosting`.
