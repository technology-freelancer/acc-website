# Admin App API Contract

The React Native admin app should call the deployed Google Apps Script Web App URL.

Every admin write request must include:

```json
{
  "action": "addResult",
  "secretKey": "ADMIN_SECRET_KEY",
  "token": "LOGIN_TOKEN"
}
```

## Login

```json
{
  "action": "login",
  "email": "admin@animateclasses.com",
  "password": "change-me"
}
```

Returns:

```json
{
  "success": true,
  "token": "...",
  "user": { "email": "...", "role": "admin" }
}
```

## Weekly Result Fields

Action: `addResult`

```text
studentName
className
subject
testName
testType
weekLabel
marks
totalMarks
rank
date
photoUrl
notes
```

## Weekly Result PDF Fields

Action: `addWeeklyResult`

```text
className
subject
testName
weekLabel
date
pdfUrl
notes
```

Use a Google Drive PDF sharing link. Apps Script converts normal Drive links into preview links for the website.

```text
https://drive.google.com/file/d/FILE_ID/view?usp=sharing
```

## Alumni Fields

Action: `addAlumni`

```text
studentName
batch
year
currentStatus
achievement
message
photoUrl
```

## Other Admin Actions

```text
addTestimonial
addAnnouncement
addCourse
addGalleryItem
```

## Public Website Actions

```text
getResults
getWeeklyResults
getAlumni
getTestimonials
getAnnouncements
getCourses
getGallery
```
