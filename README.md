# CoachingPro Website

React + Vite public website for a coaching class. It reads courses, weekly results,
toppers, testimonials and announcements from a Google Apps Script API connected to
Google Sheets. If the API is not configured or fails, the site falls back to mock
data so development still looks complete.

## Install

```bash
npm install
```

## Configure

Copy `.env.example` to `.env` and add your Apps Script web app URL:

```bash
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbxILzEmehgUmXUHYdq6X44QEQbRjBiJ3e75Lf9TM7e1BusYXl6XNpgYnyO2CgpdSBRg3g/exec
```

## Run

```bash
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy on Vercel

1. Push this `coaching-website` folder to GitHub.
2. Create a new Vercel project.
3. Set the framework preset to Vite.
4. Add `VITE_GOOGLE_SCRIPT_URL` in Vercel project environment variables.
5. Deploy. Vercel will run `npm run build` and publish the `dist` folder.

## Google Sheet Setup

Create a Google Sheet with these tabs and headers:

- `Admins`: `email | password | role | status`
- `Results`: `id | studentName | className | subject | testName | marks | totalMarks | percentage | rank | date | photoUrl | status`
- `Testimonials`: `id | studentName | batch | message | photoUrl | rating | year | status`
- `Announcements`: `id | title | description | date | type | status`
- `Courses`: `id | courseName | className | subjects | fees | duration | description | status`
- `Enquiries`: `id | name | phone | className | message | date | status`

The Apps Script also creates missing sheets and headers automatically when called.

## Apps Script Deployment

1. Open the Google Sheet.
2. Go to Extensions → Apps Script.
3. Paste `../google-apps-script/Code.gs`.
4. In Project Settings → Script Properties, add `SECRET_KEY`.
5. Deploy → New deployment → Web app.
6. Set Execute as: Me.
7. Set Who has access: Anyone.
8. Copy the web app URL into `.env`.

## Image Storage

The MVP stores image URLs directly in Google Sheets. This is Cloudinary-ready:
upload images to Cloudinary later and save the returned secure URL in `photoUrl`.
