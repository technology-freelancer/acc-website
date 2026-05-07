var SECRET_KEY = PropertiesService.getScriptProperties().getProperty('SECRET_KEY') || 'change-me-before-production';
var TOKEN_TTL_HOURS = 12;

var SHEETS = {
  Admins: ['id', 'email', 'password', 'name', 'role', 'status', 'createdAt'],
  Results: [
    'id', 'studentName', 'className', 'subject', 'testName', 'testType', 'weekLabel',
    'marks', 'totalMarks', 'percentage', 'rank', 'date', 'photoUrl', 'notes', 'status', 'createdAt'
  ],
  WeeklyResults: [
    'id', 'className', 'subject', 'testName', 'weekLabel', 'date', 'pdfUrl', 'notes', 'status', 'createdAt'
  ],
  Alumni: ['id', 'studentName', 'batch', 'year', 'currentStatus', 'achievement', 'message', 'photoUrl', 'status', 'createdAt'],
  Testimonials: ['id', 'studentName', 'batch', 'message', 'photoUrl', 'rating', 'year', 'status', 'createdAt'],
  Announcements: ['id', 'title', 'description', 'date', 'type', 'status', 'createdAt'],
  Courses: ['id', 'courseName', 'className', 'subjects', 'fees', 'duration', 'description', 'status', 'createdAt'],
  Enquiries: ['id', 'name', 'phone', 'className', 'message', 'date', 'status', 'createdAt'],
  Gallery: ['id', 'title', 'imageUrl', 'category', 'eventDate', 'status', 'createdAt']
};

var PUBLIC_GET_ACTIONS = {
  getResults: function() { return getActiveRows('Results'); },
  getWeeklyResults: function() { return getActiveRows('WeeklyResults'); },
  getAlumni: function() { return getActiveRows('Alumni'); },
  getTestimonials: function() { return getActiveRows('Testimonials'); },
  getAnnouncements: function() { return getActiveRows('Announcements'); },
  getCourses: function() { return getActiveRows('Courses'); },
  getGallery: function() { return getActiveRows('Gallery'); }
};

var ADMIN_POST_ACTIONS = {
  addResult: addResult,
  addWeeklyResult: addWeeklyResult,
  addAlumni: addAlumni,
  addTestimonial: addTestimonial,
  addAnnouncement: addAnnouncement,
  addCourse: addCourse,
  addGalleryItem: addGalleryItem
};

function doGet(e) {
  ensureSheets();
  var action = getAction(e);

  if (PUBLIC_GET_ACTIONS[action]) {
    return sendResponse(true, action + ' loaded.', PUBLIC_GET_ACTIONS[action]());
  }

  return sendResponse(false, 'Unknown GET action: ' + action, null);
}

function doPost(e) {
  ensureSheets();
  var body = parseBody(e);
  var action = getAction(e, body);

  try {
    if (action === 'login') return loginAdmin(body);
    if (action === 'addEnquiry') return addEnquiry(body);

    if (!isAuthorized(body)) {
      return sendResponse(false, 'Unauthorized request. Check ADMIN_SECRET_KEY or login token.', null);
    }

    if (ADMIN_POST_ACTIONS[action]) return ADMIN_POST_ACTIONS[action](body);

    return sendResponse(false, 'Unknown POST action: ' + action, null);
  } catch (error) {
    return sendResponse(false, error.message, null);
  }
}

function sendResponse(success, message, data) {
  return ContentService
    .createTextOutput(JSON.stringify({ success: success, message: message, data: data }))
    .setMimeType(ContentService.MimeType.JSON);
}

function addResult(payload) {
  var marks = Number(payload.marks || 0);
  var totalMarks = Number(payload.totalMarks || 0);
  var percentage = totalMarks > 0 ? Number(((marks / totalMarks) * 100).toFixed(2)) : 0;
  var record = {
    id: payload.id || makeId('RES'),
    studentName: payload.studentName,
    className: payload.className,
    subject: payload.subject,
    testName: payload.testName,
    testType: payload.testType || 'Weekly Test',
    weekLabel: payload.weekLabel || makeWeekLabel(payload.date),
    marks: marks,
    totalMarks: totalMarks,
    percentage: percentage,
    rank: payload.rank,
    date: payload.date || today(),
    photoUrl: toDriveViewUrl(payload.photoUrl),
    notes: payload.notes || '',
    status: payload.status || 'active',
    createdAt: nowIso()
  };
  appendRecord('Results', record);
  return sendResponse(true, 'Weekly result added successfully.', record);
}

function addWeeklyResult(payload) {
  var record = {
    id: payload.id || makeId('WRS'),
    className: payload.className,
    subject: payload.subject,
    testName: payload.testName,
    weekLabel: payload.weekLabel || makeWeekLabel(payload.date),
    date: payload.date || today(),
    pdfUrl: toDrivePreviewUrl(payload.pdfUrl),
    notes: payload.notes || '',
    status: payload.status || 'active',
    createdAt: nowIso()
  };
  appendRecord('WeeklyResults', record);
  return sendResponse(true, 'Weekly result PDF added successfully.', record);
}

function addAlumni(payload) {
  var record = {
    id: payload.id || makeId('ALU'),
    studentName: payload.studentName,
    batch: payload.batch,
    year: payload.year,
    currentStatus: payload.currentStatus,
    achievement: payload.achievement,
    message: payload.message || '',
    photoUrl: toDriveViewUrl(payload.photoUrl),
    status: payload.status || 'active',
    createdAt: nowIso()
  };
  appendRecord('Alumni', record);
  return sendResponse(true, 'Alumni profile added successfully.', record);
}

function addTestimonial(payload) {
  var record = {
    id: payload.id || makeId('TES'),
    studentName: payload.studentName,
    batch: payload.batch,
    message: payload.message,
    photoUrl: toDriveViewUrl(payload.photoUrl),
    rating: payload.rating || 5,
    year: payload.year,
    status: payload.status || 'active',
    createdAt: nowIso()
  };
  appendRecord('Testimonials', record);
  return sendResponse(true, 'Testimonial added successfully.', record);
}

function addAnnouncement(payload) {
  var record = {
    id: payload.id || makeId('ANN'),
    title: payload.title,
    description: payload.description,
    date: payload.date || today(),
    type: payload.type,
    status: payload.status || 'active',
    createdAt: nowIso()
  };
  appendRecord('Announcements', record);
  return sendResponse(true, 'Announcement added successfully.', record);
}

function addCourse(payload) {
  var record = {
    id: payload.id || makeId('COU'),
    courseName: payload.courseName,
    className: payload.className,
    subjects: payload.subjects,
    fees: payload.fees,
    duration: payload.duration,
    description: payload.description,
    status: payload.status || 'active',
    createdAt: nowIso()
  };
  appendRecord('Courses', record);
  return sendResponse(true, 'Course added successfully.', record);
}

function addGalleryItem(payload) {
  var record = {
    id: payload.id || makeId('GAL'),
    title: payload.title,
    imageUrl: toDriveViewUrl(payload.imageUrl || payload.photoUrl),
    category: payload.category || 'Event',
    eventDate: payload.eventDate || today(),
    status: payload.status || 'active',
    createdAt: nowIso()
  };
  appendRecord('Gallery', record);
  return sendResponse(true, 'Gallery item added successfully.', record);
}

function addEnquiry(payload) {
  var record = {
    id: payload.id || makeId('ENQ'),
    name: payload.name,
    phone: payload.phone,
    className: payload.className,
    message: payload.message,
    date: payload.date || today(),
    status: 'new',
    createdAt: nowIso()
  };
  appendRecord('Enquiries', record);
  return sendResponse(true, 'Enquiry submitted successfully.', record);
}

function loginAdmin(payload) {
  var admins = getRows('Admins');
  var email = String(payload.email || '').trim().toLowerCase();
  var password = String(payload.password || '');
  var admin = admins.find(function(row) {
    return String(row.email || '').trim().toLowerCase() === email &&
      String(row.password || '') === password &&
      String(row.status || '').toLowerCase() === 'active';
  });

  if (!admin) return sendResponse(false, 'Invalid admin credentials.', null);

  var token = makeToken(admin.email);
  CacheService.getScriptCache().put(token, JSON.stringify({
    email: admin.email,
    name: admin.name || '',
    role: admin.role || 'admin'
  }), TOKEN_TTL_HOURS * 60 * 60);

  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: 'Login successful.',
      token: token,
      user: { email: admin.email, name: admin.name || '', role: admin.role || 'admin' }
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function isAuthorized(payload) {
  if (String(payload.secretKey || '') !== SECRET_KEY) return false;
  var token = String(payload.token || '');
  if (!token) return false;
  return Boolean(CacheService.getScriptCache().get(token));
}

function ensureSheets() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(SHEETS).forEach(function(sheetName) {
    var sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
    var headers = SHEETS[sheetName];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      styleHeader(sheet, headers.length);
      return;
    }

    var existing = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), headers.length)).getValues()[0];
    var missing = headers.filter(function(header) { return existing.indexOf(header) === -1; });
    if (missing.length) {
      sheet.getRange(1, existing.length + 1, 1, missing.length).setValues([missing]);
    }

    var currentHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var ordered = headers.concat(currentHeaders.filter(function(header) { return headers.indexOf(header) === -1 && header; }));
    if (ordered.join('|') !== currentHeaders.filter(Boolean).join('|')) {
      rewriteSheetWithHeaders(sheet, ordered);
    }
    styleHeader(sheet, ordered.length);
  });
  seedDefaultAdmin();
}

function rewriteSheetWithHeaders(sheet, orderedHeaders) {
  var values = sheet.getDataRange().getValues();
  var oldHeaders = values.shift();
  var rows = values.map(function(row) {
    return orderedHeaders.map(function(header) {
      var oldIndex = oldHeaders.indexOf(header);
      return oldIndex === -1 ? '' : row[oldIndex];
    });
  });
  sheet.clear();
  sheet.getRange(1, 1, 1, orderedHeaders.length).setValues([orderedHeaders]);
  if (rows.length) sheet.getRange(2, 1, rows.length, orderedHeaders.length).setValues(rows);
}

function styleHeader(sheet, columnCount) {
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, columnCount)
    .setFontWeight('bold')
    .setBackground('#4B2A05')
    .setFontColor('#FFFFFF');
  sheet.autoResizeColumns(1, columnCount);
}

function appendRecord(sheetName, record) {
  validateRequired(sheetName, record);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var row = headers.map(function(header) { return record[header] === undefined ? '' : record[header]; });
  sheet.appendRow(row);
}

function getActiveRows(sheetName) {
  return getRows(sheetName).filter(function(row) {
    return String(row.status || 'active').toLowerCase() !== 'inactive';
  }).sort(function(a, b) {
    return new Date(b.date || b.createdAt || b.year || 0) - new Date(a.date || a.createdAt || a.year || 0);
  });
}

function getRows(sheetName) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet || sheet.getLastRow() < 2) return [];
  var values = sheet.getDataRange().getValues();
  var headers = values.shift();
  return values.map(function(row) {
    var item = {};
    headers.forEach(function(header, index) { item[header] = row[index]; });
    return item;
  });
}

function validateRequired(sheetName, record) {
  var optional = ['id', 'percentage', 'rank', 'photoUrl', 'notes', 'message', 'status', 'createdAt', 'testType', 'weekLabel', 'eventDate'];
  var required = SHEETS[sheetName].filter(function(header) { return optional.indexOf(header) === -1; });
  required.forEach(function(field) {
    if (record[field] === undefined || record[field] === '') {
      throw new Error(field + ' is required for ' + sheetName + '.');
    }
  });
}

function setupWorkbook() {
  ensureSheets();
  seedDefaultAdmin();
  return sendResponse(true, 'Workbook setup completed. Change the default admin password immediately.', null);
}

function seedDefaultAdmin() {
  var admins = getRows('Admins');
  if (admins.length) return;
  appendRecord('Admins', {
    id: makeId('ADM'),
    email: 'admin@animateclasses.com',
    password: 'change-me',
    name: 'Animate Admin',
    role: 'admin',
    status: 'active',
    createdAt: nowIso()
  });
}

function setSecretKey(value) {
  PropertiesService.getScriptProperties().setProperty('SECRET_KEY', value);
}

function parseBody(e) {
  if (!e || !e.postData || !e.postData.contents) return {};
  try {
    return JSON.parse(e.postData.contents);
  } catch (error) {
    return e.parameter || {};
  }
}

function getAction(e, body) {
  return String((body && body.action) || (e && e.parameter && e.parameter.action) || '').trim();
}

function makeId(prefix) {
  return prefix + '-' + Utilities.getUuid().slice(0, 8).toUpperCase();
}

function makeToken(email) {
  return Utilities.base64Encode(email + ':' + Date.now() + ':' + Utilities.getUuid());
}

function today() {
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
}

function nowIso() {
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd'T'HH:mm:ss");
}

function makeWeekLabel(dateValue) {
  var date = dateValue ? new Date(dateValue) : new Date();
  return 'Week of ' + Utilities.formatDate(date, Session.getScriptTimeZone(), 'dd MMM yyyy');
}

function toDriveViewUrl(url) {
  var value = String(url || '').trim();
  if (!value) return '';
  var match = value.match(/\/d\/([^/]+)/) || value.match(/[?&]id=([^&]+)/);
  if (match && match[1]) return 'https://drive.google.com/uc?export=view&id=' + match[1];
  return value;
}

function toDrivePreviewUrl(url) {
  var value = String(url || '').trim();
  if (!value) return '';
  var match = value.match(/\/d\/([^/]+)/) || value.match(/[?&]id=([^&]+)/);
  if (match && match[1]) return 'https://drive.google.com/file/d/' + match[1] + '/preview';
  return value;
}
