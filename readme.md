https://fullstackopencoursepart3phonebook.onrender.com

## How to Run the Application

Follow these steps to run the application:

1. Clone this repository to your own machine.

2. Navigate to the cloned repository with the command:
   ```bash
   cd part3-notes-backend
   ```

3. Switch to the desired branch with the command:
   ```bash
   git switch <branch-name>
   ```

4. Install the node modules with the command:
   ```bash
   npm install
   ```

5. If you are on branch `part3-4` or later, you need to create a `.env` file in the root of the project with the following content:
   ```env
   MONGODB_URI=your_database_connection_string
   PORT=3001
   ```
   - `MONGODB_URI` defines the database connection URL.
   - `PORT` defines the port on which the application will be started.

6. Start the application with the command:
   ```bash
   npm run dev
   ```
   By default, the application will start on port `3001`, so it will be available at [http://localhost:3001/](http://localhost:3001/).
