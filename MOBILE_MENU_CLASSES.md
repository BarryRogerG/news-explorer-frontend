# All CSS Classes When Burger Menu is Clicked (Mobile)

## Header Component Classes

### Header Element (`<header>`)
- `.header` (base class)
- `.header_overlay` (if on main page)
- `.header_menu-open` (when menu is open) ✅ **Active when clicked**

### Menu Button (`<button>`)
- `.header__menu-button` (base class)
- `.header__menu-button_close` ✅ **Active when clicked**

### Menu Icons (`<span>` x3)
- `.header__menu-icon` (base class, 3 instances)
- `.header__menu-button_close .header__menu-icon:nth-child(1)` ✅ **Active when clicked** (rotated)
- `.header__menu-button_close .header__menu-icon:nth-child(2)` ✅ **Active when clicked** (hidden)
- `.header__menu-button_close .header__menu-icon:nth-child(3)` ✅ **Active when clicked** (rotated)

### Logo (`<Link>`)
- `.header__logo` (base class)
- `.header_menu-open .header__logo` ✅ **Active when clicked** (changes color to black)

---

## Navigation Component Classes (Mobile)

### Navigation Element (`<nav>`)
- `.navigation` (base class)
- `.navigation_overlay` (if on main page)
- `.navigation_mobile` ✅ **Active when clicked** (mobile version)
- `.navigation_mobile_open` ✅ **Active when clicked** (menu open state)

### Mobile Header (`<div>`)
- `.navigation_mobile__header` ✅ **Active when clicked**

### Mobile Logo (`<span>`)
- `.navigation_mobile__logo` ✅ **Active when clicked**

### Close Button (`<button>`)
- `.navigation_mobile__close` ✅ **Active when clicked**

### Close Icons (`<span>` x2)
- `.navigation_mobile__close-icon` (base class, 2 instances)
- `.navigation_mobile__close-icon:nth-child(1)` ✅ **Active when clicked** (rotated 45deg)
- `.navigation_mobile__close-icon:nth-child(2)` ✅ **Active when clicked** (rotated -45deg)

### Mobile Content (`<div>`)
- `.navigation_mobile__content` ✅ **Active when clicked**

### Navigation Links (`<NavLink>`)
- `.navigation__link` (base class)
- `.navigation__link_active` (if current route matches)
- `.navigation_mobile__content .navigation__link` ✅ **Active when clicked** (mobile styling)
- `.navigation_mobile__content .navigation__link_active` ✅ **Active when clicked** (if active route)

### Navigation Button (`<button>`)
- `.navigation__button` (base class)
- `.navigation_mobile__content .navigation__button` ✅ **Active when clicked** (mobile styling)

---

## Key CSS Rules Applied at 768px and Below

### Header
```css
.header_menu-open {
  background-color: #ffffff;
  border-bottom: 1px solid rgba(196, 196, 196, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
```

### Navigation Mobile
```css
.navigation.navigation_mobile {
  display: flex !important;
  flex-direction: column !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 320px !important;
  background-color: #1a1a22 !important;
  height: 100vh !important;
  z-index: 12 !important;
  transform: translateX(-100%) !important; /* Hidden by default */
}

.navigation.navigation_mobile.navigation_mobile_open {
  transform: translateX(0) !important; /* ✅ Visible when clicked */
  width: 320px !important;
}
```

---

## Summary of Active Classes When Menu is Open

**Header:**
- `.header`
- `.header_menu-open` ✅
- `.header__menu-button`
- `.header__menu-button_close` ✅
- `.header__menu-icon` (x3)
- `.header__logo`
- `.header_menu-open .header__logo` ✅

**Navigation (Mobile):**
- `.navigation`
- `.navigation_mobile` ✅
- `.navigation_mobile_open` ✅
- `.navigation_mobile__header` ✅
- `.navigation_mobile__logo` ✅
- `.navigation_mobile__close` ✅
- `.navigation_mobile__close-icon` (x2) ✅
- `.navigation_mobile__content` ✅
- `.navigation__link` (inside mobile content)
- `.navigation__button` (inside mobile content)

**Total: ~15-20 active classes when menu is open**

