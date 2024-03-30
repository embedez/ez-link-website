## Next.js Template

This is a Next.js template with features like Atom, Redis, Mongoose, authentication (including Discord and Google), and SMTP signup.

### Environment Variables

Before running the application, make sure to set up the following environment variables:

````bash
NEXTAUTH_URL=https://example.com
NEXTAUTH_SECRET=

REDIS_URL=redis://
MONGODB_URL=mongodb+srv://

DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

SMTP_FROM=
SMTP_HOST=
SMTP_PORT=465
SMTP_USERNAME=
SMTP_SECURE=
SMTP_PASSWORD=
````

### UI Components

This template utilizes UI components from [Shadcn](https://ui.shadcn.com) with additional animated components from [Aceternity](https://ui.aceternity.com).

### Installation Guide

1. Clone the repository:

   ````bash
   git clone https://github.com/Gratenes/chance-nextjs-template.git chance-nextjs-template
   ````

2. Navigate to the project directory:

   ````bash
   cd chance-nextjs-template
   ````

3. Install dependencies:

   ````bash
   npm install
   ````

### Running the Application

To run the application, execute the following command:

````bash
npm run dev
````

This will start the development server. Visit \`http://localhost:3000\` in your browser to view the application.

### Additional Notes

Make sure to configure your authentication providers (Discord, Google, SMTP) in their respective dashboards and update the environment variables accordingly.

For more information on Next.js, refer to the [Next.js documentation](https://nextjs.org/docs/getting-started).

Feel free to customize and extend this template as needed for your project!
