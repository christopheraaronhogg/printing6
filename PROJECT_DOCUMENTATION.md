# T-Shirt Printing Job Tracker Documentation

...

## Deploying to Replit (Production Mode)

To deploy this project on Replit in production mode, follow these steps:

...

9. In the Replit shell, start the server:
   ```
   npm run start
   ```
   This command will first build the project and then start the server in production mode.

...

## Troubleshooting

If you encounter any issues:

1. Check the Replit console for error messages
2. Ensure all dependencies are correctly installed
3. Verify that the build process completed successfully
   - If you see "ENOENT: no such file or directory" errors, make sure the build step is running before starting the server
4. Check that the `server.js` file is correctly configured for production
5. Make sure the `jobs.json` file exists and is writable

...