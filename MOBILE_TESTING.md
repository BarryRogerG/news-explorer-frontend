# Mobile Burger Menu Testing Guide

This guide explains how to test the mobile burger menu functionality.

## Quick Test Methods

### Method 1: Browser DevTools (Easiest)

1. **Open your app** in the browser (usually `http://localhost:5173`)

2. **Open DevTools:**
   - Press `F12` or `Ctrl+Shift+I` (Windows/Linux)
   - Press `Cmd+Option+I` (Mac)
   - Or right-click → "Inspect"

3. **Enable Mobile View:**
   - Click the device toggle icon (📱) in DevTools
   - Or press `Ctrl+Shift+M` (Windows/Linux) / `Cmd+Shift+M` (Mac)
   - Select a mobile device preset (e.g., "iPhone 12 Pro", "Pixel 5")
   - Or set custom width: **≤ 768px**

4. **What to Test:**
   - ✅ Burger menu icon (☰) appears on the right side of header
   - ✅ Click burger icon → Menu slides in from left
   - ✅ Burger icon transforms to X (✕) when menu is open
   - ✅ Dark overlay appears behind menu
   - ✅ Menu contains "Home" link and "Sign in" button
   - ✅ Click outside menu (on overlay) → Menu closes
   - ✅ Click X icon → Menu closes
   - ✅ Click "Home" link → Menu closes and navigates
   - ✅ Click "Sign in" button → Menu closes and opens login modal

### Method 2: Actual Mobile Device

1. **Find your local IP address:**
   ```bash
   # Windows
   ipconfig
   # Look for "IPv4 Address" (e.g., 192.168.1.100)
   
   # Mac/Linux
   ifconfig | grep "inet "
   # Or
   ip addr show
   ```

2. **Start dev server with network access:**
   ```bash
   npm run dev -- --host
   # Or
   npm run dev -- --host 0.0.0.0
   ```

3. **Access from mobile device:**
   - Make sure your phone is on the same WiFi network
   - Open browser on phone
   - Go to: `http://YOUR_IP_ADDRESS:5173`
   - Example: `http://192.168.1.100:5173`

4. **Test the burger menu** on your actual device

### Method 3: Resize Browser Window

1. **Manually resize** your browser window to **≤ 768px wide**
2. The burger menu should automatically appear
3. Test all the same functionality as above

## Visual Checklist

### When Menu is CLOSED:
- [ ] Burger icon (☰) visible on right side of header
- [ ] Icon is white on main page (overlay mode)
- [ ] Icon is black on other pages
- [ ] Desktop navigation is hidden
- [ ] No menu overlay visible

### When Menu is OPEN:
- [ ] Burger icon transforms to X (✕)
- [ ] Dark overlay appears (semi-transparent black)
- [ ] Menu slides in from left side
- [ ] Menu has dark background (#1a1a22)
- [ ] "Home" link is visible (white text)
- [ ] "Sign in" button is visible (white background, black text)
- [ ] Menu is properly positioned below header

### Menu Interactions:
- [ ] Click burger → Menu opens smoothly
- [ ] Click X → Menu closes smoothly
- [ ] Click overlay (outside menu) → Menu closes
- [ ] Click "Home" → Menu closes, navigates to home
- [ ] Click "Sign in" → Menu closes, opens login modal
- [ ] Menu slides smoothly (no janky animations)

## Responsive Breakpoints

The burger menu appears at:
- **≤ 768px width** - Mobile view with burger menu
- **> 768px width** - Desktop view with horizontal navigation

## Common Issues & Solutions

### Issue: Burger menu not appearing
- **Check:** Window width is ≤ 768px
- **Check:** DevTools mobile mode is enabled
- **Solution:** Refresh the page

### Issue: Menu doesn't slide in
- **Check:** Browser console for errors
- **Check:** CSS transitions are enabled
- **Solution:** Clear browser cache and refresh

### Issue: Menu doesn't close
- **Check:** Click handlers are working
- **Check:** Overlay click detection
- **Solution:** Check browser console for JavaScript errors

### Issue: Menu styling looks wrong
- **Check:** CSS file is loaded
- **Check:** No conflicting styles
- **Solution:** Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

## Testing on Different Devices

### iPhone (Safari)
- Test on actual iPhone or Safari DevTools
- Check touch interactions
- Verify menu animations

### Android (Chrome)
- Test on actual Android device or Chrome DevTools
- Check touch interactions
- Verify menu animations

### Tablet
- Test at 768px breakpoint
- Should show burger menu (not desktop nav)

## Browser Console Testing

Open console and check:
```javascript
// Check if mobile breakpoint is active
window.innerWidth <= 768  // Should be true for mobile

// Check menu state (if you add debug logging)
// The menu state is managed in Header component
```

## Expected Behavior Summary

1. **Desktop (>768px):** Horizontal navigation, no burger menu
2. **Mobile (≤768px):** Burger menu icon, hidden desktop nav
3. **Menu Open:** Dark overlay, slide-in menu from left, X icon
4. **Menu Close:** Click X, overlay, or navigation link
5. **Navigation:** Menu closes when navigating or clicking buttons

## Design Match Verification

Compare with design reference:
- ✅ Dark menu background (#1a1a22)
- ✅ White text for links
- ✅ White button with black text for "Sign in"
- ✅ Smooth slide-in animation
- ✅ Dark overlay behind menu
- ✅ Burger icon transforms to X

