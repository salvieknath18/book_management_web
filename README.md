# Book Management Portal

### Setup Environment

In the project directory:

* To run, the application requires Node Js to be installed on the machine.
* Run the following commands in the project root directory.
* npm install to install dependencies.
* npm start to start the application.
* The application will open at http://localhost:3000 to view it in the browser

For deployment, we can create a build as per the following instructions:

- `npm run build` Builds the app for production to the `build` folder.\
  It correctly bundles React in production mode and optimizes the build for the best performance.

- The build is minified and the filenames include the hashes.\
  Your app is ready to be deployed!
- See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Assumptions made

While developing the assignment, I made a few assumptions.

* To return to the book, the user can login and go to the home page.
* Because only administrators can create users, we did not include a signup page; instead, administrators can add users from the user page by clicking the add user button.

### Redux setup

We use redux to maintain the state of the data through ou the components in the app.

- started development of app with command `npx create-react-app my-app --template redux-typescript` this installs redux along with react and typescript.
- Created reducers which perform the required actions on the dispatched data.
- Added required hooks in `hooks.ts`
- Created store in `store.ts` where we can compose all our reducers.
- Created action types for which we can define actions after dispatching the data.
- Dispatched data to reducers which is required across the components.
- We were supposed to write action logic in the actions folder for each action type, but due to rapid development with a constraint time, I kept it as an improvement.

### The project file structure

created four pages on the portal Home Page, Book Page, User Page, Analytics Page
File and folder structure

- Startup file is `index.tsx` at root location calls my App written in `App.tsx`
- home, book, user and analytics components are added features folder.
- created seperate folder for seperate feature.
- each feature have view, add, edit, delete and list component.
- in component folder kept common component like header and login.
- in `app` folder, `api` sub folder All API calls are configured.
- in `model` folder model class are defined.

### Code Implementation:

While implementing the code, React, Typescript, Redux, React-Bootstrap and victory-chart are mainly used

- Implementation consist of creating feature components and reuse the components wherever required.
- Stored the data in redux which required across the components
- Added Modal forms for Create and Edit resource.
-

### Scalability of Project:

This Web App can be scalable to next level where all library can be managed through this portal.

- Recommendation Feature : We can add more analytics like what type of books borrowed commonly, which user have major interest in which genre, Such analytics we can get and we suggest more such books to user.
- Alert to member who overdue the book return date.
- Adding images of books and user in portal
- Instead of limiting ourselves to books, we can add more resources that can be borrowed and returned.

### Improvements

There are few things which I suppose to be implemented as a part of standard practice, but due to time constraint I didn't got time to implement those

- Data Validation in POST request
- Unit test cases, We suppose to write Unit test first but due to time constraints I have focused on development of functional requirements first.
- Admin can assign or remove book for any member (API implemented, Integration Pending)
- UI wise, Only basic UI implemented, But there is always recommendation for good UX template
