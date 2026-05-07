# Animate Google Sheets Backend Setup

This backend uses only free Google tools:

- Google Sheets as the database
- Google Apps Script as the API
- Google Drive public links for images

## 1. Create the Sheet

1. Create a new Google Sheet named `Animate Coaching Classes DB`.
2. Open `Extensions > Apps Script`.
3. Replace the default script with `google-apps-script/Code.gs`.
4. Save the project.

## 2. Set the Secret Key

In Apps Script, run this once from the editor:

```js
setSecretKey('replace-with-a-long-random-secret');
```

Use the same value in the React Native admin app as `ADMIN_SECRET_KEY`.

## 3. Create Tabs and Default Admin

Run this once:

```js
setupWorkbook();
```

It creates these tabs:

- Admins
- Results
- WeeklyResults
- Alumni
- Testimonials
- Announcements
- Courses
- Enquiries
- Gallery

It also creates a temporary admin:

```text
email: admin@animateclasses.com
password: change-me
```

Change that password immediately in the `Admins` sheet.

The script also auto-seeds this default admin whenever the API runs and the `Admins` sheet is empty, so a fresh sheet will not get stuck without a login record.

## 4. Deploy Apps Script

1. Click `Deploy > New deployment`.
2. Type: `Web app`
3. Execute as: `Me`
4. Who has access: `Anyone`
5. Copy the Web App URL.

Use this URL as:

- Website: `VITE_GOOGLE_SCRIPT_URL`
- Admin app: `GOOGLE_SCRIPT_URL`

## 5. Drive Images

Upload student photos/result images to Google Drive.

Set sharing to:

```text
Anyone with the link can view
```

Paste the normal Drive link in admin. Apps Script converts it to a direct view URL automatically.

## 6. Weekly Result Flow

Admin app calls:

```text
login
addResult
addWeeklyResult
addAlumni
addTestimonial
addAnnouncement
addCourse
addGalleryItem
```

Public website calls:

```text
getResults
getWeeklyResults
getAlumni
getTestimonials
getAnnouncements
getCourses
getGallery
```
