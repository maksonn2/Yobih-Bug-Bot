


const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNENuNmRqbm5BTE1sLzdEVFR2eU9DeWM2Uk5nZUp0NzY4SSsraHRuNU1WRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidE04SkMwQkF4TEE1YTVDd29NYzdQR1FBSUY0R09DTG1oOXNPUlJIeEdpQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrQ1FVWll1Z09Ha0k0cDlOc1hMRDFDaFQyeDlSSnJFdjhITlRheFFjOG1nPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkeUgvcFFFbXB2bDl2cDVIVUc2Q0p1dXdyN3ZKcUNFdXNWNk5FTXRld1dRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVMZWdrMmlMcGg1WGlNaTlrSE1pNjRaaFh1TkdDczJ1OE9ia3JtRm1aMTA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNUaE9oek90aXgxandRLzVLUnZFTXgrSThCb0FSRWs5Q0l0bmF3Y2dPQm89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUtSbWFiRTlreWx0U3MzNzdqL2F0R2M5T0ZKQ0JOYkR4WnFZYTNqLzJWVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0NTZytyQVUrQmJsT0JNVFRQQlRpWS9TejRwRmQxQTFmcTg4K2d4d0NsUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklTZjhEbmRkZGNiTnZvNW8wcXRLRXp2MWlBQStXL0ZLSjhlY2hjYVZIeVRKSHpCTnVHVzlSdlc1eXJrK3QrTENFaHQyUVNTVzhBLzFMam1IVWhMbUF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODAsImFkdlNlY3JldEtleSI6Ik0rTDlJQnBUTjkwd21GN2xma1daK0tGeEZvUmFVNXRuK2dIS2NhcVQ3Y0U9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjNZMEZ3NE9rU3RxeHA5MWdTVTFlbmciLCJwaG9uZUlkIjoiMjk1MmFkMmEtMjA4NS00OTc5LWFmYjUtOGRlNTg2NzEyODIwIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlQvaVBxd045eHBBMTZCVFpZUW5FQzNRSlNxaz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5bE1SZVIzVTBGekRjVldWM0c3MkRKRjYwbUU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQ043TVNMVkIiLCJtZSI6eyJpZCI6IjE4Mjk3OTcxODEzOjJAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi44Gj4oGg4oCi4oGg4bSl4oGg4oCiVMOzeGljbyDwnZCD8J2QgPCdkIHwnZuv8J2QjfCdkJLvvLzhtKXvvI/CoCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTGF2eitFQkVPN0c2OEFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoidW8zYUdiZGVOb1Y1eGk0c21lck1aY2ZhMjVCQTBGZUZDeHFpZWxKaXFDdz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiY243VEVxc21qczQrckxhclVSN3ZtdVNXelZrUm56M1JtRE00UHJra3ppT2xXN09pcTVZVEpaK0NTNnlrcVFhbW1UV0l1SlJYdTUxdGVPaXNEdFlhRFE9PSIsImRldmljZVNpZ25hdHVyZSI6InVneGZ3YmtzRDlBYU03eVNvQlRlSEZvQkdIVkliVXhQbUVGNVRBemdKc0ZialI4djJ3MTlNb0ZxWjVJdEw2R29FbFRVdW9HaStWOG1jVFJiVElVL0RRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMTgyOTc5NzE4MTM6MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJicU4yaG0zWGphRmVjWXVMSm5xekdYSDJ0dVFRTkJYaFFzYW9ucFNZcWdzIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ2NTkyNjM2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQVA1ZCJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Yobih md",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Yobih-MD",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Yobih md bug Bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/d0cd3c82fbbc120f38ac4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

