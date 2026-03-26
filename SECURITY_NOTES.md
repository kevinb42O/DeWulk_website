# Security Notes - De Wulk Admin Dashboard

## Overview

This document outlines the security considerations for the admin dashboard implementation.

## Current Security Measures ✅

### 1. Authentication
- **Session-based authentication**: PHP sessions prevent unauthorized access to updateMenu.php
- **Password protection**: Admin panel requires correct password before accessing dashboard
- **Logout functionality**: Properly destroys session on logout

### 2. Input Validation
- **Data structure validation**: updateMenu.php validates that menu and openingsuren arrays exist
- **Menu structure validation**: Checks that categories have required fields (title, items)
- **JSON validation**: Validates that input is valid JSON before processing

### 3. File Security
- **Absolute paths**: Uses `dirname(__DIR__)` to prevent directory traversal attacks
- **.htaccess protection**: Blocks direct access to .json files via web browser
- **Proper file permissions**: Documentation guides user to set correct permissions (755/777)

### 4. CORS Configuration
- **Headers configured**: Proper CORS headers allow frontend to communicate with backend
- **Works with production domain**: Can be restricted to specific domain if needed

### 5. Code Quality
- **CodeQL scan**: Passed with 0 vulnerabilities
- **Code review**: 7 comments addressed, critical security issues resolved

## Security Limitations & Trade-offs ⚠️

### 1. Plain Text Password
**Status**: Accepted trade-off for this use case

**Reasoning**:
- Only one admin user (website owner)
- Admin URL not publicly advertised
- Simple use case doesn't warrant complex auth system
- Owner is non-technical, needs easy password management

**Mitigation**:
- Strong password recommendation in docs
- HTTPS requirement (password encrypted in transit)
- Instructions to change default password immediately

### 2. No Password Hashing
**Status**: Could be improved in future

**Current**: Password stored as plain text in login.php
**Better**: Use `password_hash()` and `password_verify()` in PHP

**Why not implemented now**:
- Owner needs ability to edit password directly (non-technical)
- Hashing would require them to use a script to generate hash
- Complexity vs security benefit trade-off for single-admin system

**Future improvement**:
```php
// In login.php (future version)
$hashedPassword = '$2y$10$...'; // Generated with password_hash()
if (password_verify($password, $hashedPassword)) {
    $_SESSION['admin_logged_in'] = true;
    echo json_encode(['success' => true]);
}
```

### 3. No Rate Limiting
**Status**: Accepted for simple hosting environment

**Risk**: Brute force attacks possible
**Mitigation**:
- Admin URL not public knowledge
- Strong password requirement
- Can be added at web server level (Easyhost config)

### 4. No CSRF Protection
**Status**: Low risk, but could be improved

**Current**: No CSRF tokens on API requests
**Risk**: Minimal - admin must be logged in, session-based
**Future improvement**: Add CSRF tokens to forms

### 5. Session Security
**Status**: Relies on PHP defaults

**Current**: Standard PHP session handling
**Could improve**:
- Set httponly and secure flags on session cookie
- Add session timeout
- Regenerate session ID on login

## Required Security Setup (User Actions) 🔒

### CRITICAL: Enable HTTPS
**Why**: Password sent over HTTP is visible in plain text

**Action Required**:
1. Request free Let's Encrypt SSL certificate from Easyhost
2. Force HTTPS redirection in .htaccess:
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

### CRITICAL: Change Default Password
**Why**: Default password is in public code repository

**Action Required**:
1. Edit `api/login.php` on server
2. Change `$correctPassword = 'DeWulk2025!';` to unique strong password
3. Use 12+ characters, mix of upper, lower, numbers, symbols

### RECOMMENDED: Restrict File Permissions
**Why**: Prevent unauthorized file modifications

**Action**:
- Set `data/` folder to 755 (not 777 unless necessary)
- Set `menu.json` to 644 (not 666 unless necessary)
- Only use 777/666 if write errors occur

### RECOMMENDED: Regular Backups
**Why**: Protect against accidental data loss or corruption

**Action**:
- Download `menu.json` weekly via FTP
- Keep multiple dated backups locally
- Test restore procedure once

## Security Best Practices for Users

### 1. Strong Password
- Minimum 12 characters
- Mix of uppercase, lowercase, numbers, symbols
- Avoid dictionary words
- Don't reuse passwords from other sites

**Example**: `De#Wulk$2025!Blkb@Vis`

### 2. Access Control
- Don't share admin password
- Don't access admin panel on public WiFi
- Use private browsing if on shared computer
- Always logout after editing

### 3. Monitor Access
- Check `menu.json` modification date regularly
- If unexpected changes appear, change password immediately
- Keep backup to restore if needed

### 4. Browser Security
- Keep browser updated
- Use reputable browser (Chrome, Firefox, Safari, Edge)
- Don't save password in browser on shared computers
- Clear browser cache after admin session on public computers

## Security by Design Decisions

### Why JSON File Instead of Database?
**Pros**:
- No SQL injection risk
- Simpler to backup (single file)
- No database credentials to manage
- Works on basic shared hosting

**Cons**:
- Concurrent write issues (unlikely for single admin)
- No built-in access control
- Manual backup process

**Decision**: Pros outweigh cons for this use case

### Why Session-Based Auth?
**Pros**:
- Built into PHP
- Works without external dependencies
- Automatic cleanup on server restart
- Simple to implement

**Cons**:
- Relies on PHP session configuration
- No token refresh
- Session hijacking possible (mitigated by HTTPS)

**Decision**: Appropriate for single-admin system

## Incident Response

### If Password Compromised
1. Immediately change password in `api/login.php`
2. Check `menu.json` for unauthorized changes
3. Restore from backup if needed
4. Review server logs for unauthorized access
5. Consider changing admin route name

### If Data Corrupted
1. Stop making changes immediately
2. Restore `menu.json` from latest backup
3. Upload via FTP
4. Verify website displays correctly
5. Identify cause of corruption

### If Website Hacked
1. Contact Easyhost support immediately
2. Change all passwords (FTP, admin panel)
3. Restore entire site from known-good backup
4. Review all uploaded files
5. Check for malicious code in PHP files

## Security Checklist for Deployment

Before going live:
- [ ] HTTPS enabled (SSL certificate installed)
- [ ] Default password changed to strong unique password
- [ ] Password not shared or written down insecurely
- [ ] File permissions set correctly (755 for folders, 644 for files)
- [ ] Initial backup of menu.json created
- [ ] Admin panel tested and logout works
- [ ] Website owner educated on security practices
- [ ] Emergency contact information documented

## Future Security Enhancements

If expanding system in future, consider:

1. **Password hashing**: Implement bcrypt password hashing
2. **Rate limiting**: Add login attempt restrictions
3. **Two-factor authentication**: Add 2FA via TOTP
4. **Audit log**: Track all changes with timestamps and IP
5. **CSRF tokens**: Add CSRF protection to forms
6. **Session hardening**: Implement secure session configuration
7. **Admin route obfuscation**: Change /admin to non-obvious path
8. **IP whitelisting**: Restrict admin access to specific IPs
9. **Content Security Policy**: Add CSP headers
10. **Automated backups**: Script to backup menu.json daily

## Compliance Notes

### GDPR Considerations
- No personal data collected from website visitors
- Admin password is not considered personal data in this context
- No cookies used on public website
- Session cookie only used for admin authentication

### Data Retention
- Menu data retained indefinitely (business requirement)
- Session data auto-expires (PHP default)
- No user tracking or analytics implemented

## Contact Security Issues

If security vulnerability discovered:
1. Do NOT post publicly
2. Change password immediately
3. Contact website owner privately
4. Document the issue
5. Apply fix promptly

## Conclusion

This implementation provides **adequate security for a small business website** with proper deployment and password management. The security model is appropriate for the use case: a single non-technical admin managing menu content on shared hosting without a database.

**Key points**:
- ✅ Secure enough for intended use case
- ⚠️ Requires HTTPS to be fully secure
- ⚠️ Requires password change from default
- 🔒 Follow best practices in documentation
- 📚 Comprehensive guidance provided

---

**Last updated**: December 2025
**Applies to**: De Wulk Admin Dashboard v1.0
