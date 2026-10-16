# EventHub - Event Management System

Web Programming Assignment 2. A React app for browsing live events from Ticketmaster, searching and filtering them, registering for the ones you care about and keeping track of them in "My Events". Authentication is simulated on the frontend using localStorage, there is no backend.

## Features

- Register, login and logout, with validation and clear error messages. Session stays active after a page refresh.
- Browse events pulled live from the Ticketmaster Discovery API
- Search by keyword with a debounce so we don't spam the API
- Filter by category, city, country and date range
- Dedicated Upcoming and Categories views
- Pagination through results
- Event details page with date, venue, location, category, price range, image and a link to buy tickets, plus the seat map when Ticketmaster has one
- Register or cancel registration for an event (requires login)
- My Events page, split into Upcoming and Completed, with cancel option
- Fully responsive layout

## Tech stack

- React (Vite)
- Redux Toolkit + react-redux
- React Router
- Plain CSS
- Ticketmaster Discovery API v2

## Getting started

1. Clone the repo and move into the project folder

   ```
   git clone <your-repo-url>
   cd event-management-system
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Create a `.env` file from the example and add your own Ticketmaster API key

   ```
   cp .env.example .env
   ```

   Get a free key at https://developer.ticketmaster.com/ (sign up, create an app, copy the consumer key) and paste it in:

   ```
   VITE_TICKETMASTER_API_KEY=your_key_here
   ```

4. Run the app

   ```
   npm run dev
   ```

Other scripts: `npm run build` to build for production, `npm run preview` to preview the production build.

## Folder structure

```
src/
  components/      reusable UI pieces (Navbar, EventCard, SearchBar, FilterPanel, Loader, ErrorMessage, Pagination, Toast, ProtectedRoute)
  pages/           one component per route (Home, EventsList, EventDetails, Categories, Upcoming, Login, Register, MyEvents, NotFound)
  store/
    store.js       Redux store setup
    slices/        auth, events and registrations slices
  services/        Ticketmaster API calls
  utils/           small helpers (localStorage, validation, date formatting)
```

## Notes

- The Ticketmaster free tier allows 5,000 requests a day and 2 per second, so search is debounced and filters only fetch on change.
- Registered users and session info live in localStorage under `ems_users` and `ems_session`. Event registrations live under `ems_registrations`.
- Each registration stores a small snapshot of the event (name, date, venue, image) so My Events keeps working even if that event later disappears from the Ticketmaster API.
