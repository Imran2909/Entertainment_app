# Entertainment App

The Entertainment App is a platform where you can find the latest movies and TV series. You can view the IMDb ratings for any movie or TV series and watch trailers. You can also add movies and series to your bookmarks.
 
## Acknowledgements

- Website link: [Netlify](https://verdant-pie-aa1d2f.netlify.app/)
- GitHub repo link: [GitHub](https://github.com/Imran2909/Entertainment_app)
- Backend link: [Render](https://entertainment-backend-1.onrender.com)

## Tech Stack Used

- React.js
- Redux.js
- Node.js
- Express.js
- MongoDB
- Chakra UI
- CSS

## Deployments

- The full-stack app is deployed on Netlify:  
  [https://verdant-pie-aa1d2f.netlify.app/](https://verdant-pie-aa1d2f.netlify.app/)

- Backend is deployed on Render:  
  [https://entertainment-backend-1.onrender.com](https://entertainment-backend-1.onrender.com)

## How to Start

To run this project locally:

1. Clone the repository to your local path.
2. Run the command `npm run start` in the terminal to start the frontend.
3. Run the command `npm run server` to start the Express server.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

- `MONGO_URL`: Your MongoDB URL.
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: For Google OAuth.
- `OAUTH_CALLBACK_URL`: Redirect path after Google OAuth for the backend.
- `CALLBACK_URL`: Redirect path after Google OAuth for the frontend.

## Documentation

Here is a brief description of the Entertainment App:

- **Landing Page**: The landing page includes a navbar on the left side, trending movies slider, and recommended movies.
  ![App Screenshot](https://i.imgur.com/y2RbiyW.png)

- **Movies Section**: View all movies and search for any movie.
  ![App Screenshot](https://imgur.com/dgS9s96.png)
  ![App Screenshot](https://imgur.com/cpQAgeP.png)

- **TV Series Section**: Similar functionality as the movies section.
  ![App Screenshot](https://imgur.com/wXBdc3v.png)
  ![App Screenshot](https://imgur.com/xIr6drg.png)

- **Individual Pages**: Each movie and series has an individual page where you can see all details.
  ![App Screenshot](https://imgur.com/HObLL2J.png)
  ![App Screenshot](https://imgur.com/J9X8Zcv.png)
  ![App Screenshot](https://imgur.com/4Mc1vig.png)

- **Bookmark Functionality**: Add any movie or series to your bookmarks using the bookmark flag.
  ![App Screenshot](https://imgur.com/w31frP2.png)

- **Bookmark Section**: View your bookmarked movies.
  ![App Screenshot](https://imgur.com/pi6BZzh.png)

- **Authentication Redirect**: If you try to bookmark a movie without being authenticated, you will be redirected to the login page.
  ![App Screenshot](https://imgur.com/hz6avY2.png)
  ![App Screenshot](https://imgur.com/fzDGOyU.png)

- **Google OAuth**: Log in with your Google account.
  ![App Screenshot](https://imgur.com/QmzYMzh.png)

