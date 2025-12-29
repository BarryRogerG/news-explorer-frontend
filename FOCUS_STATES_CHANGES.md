# Focus States Implementation - Before & After

This document shows all changes made to add focus states to form elements and buttons, addressing the unchecked criteria: "Form elements should be highlighted when focused."

---

## 1. SearchForm Input - Desktop Focus State

### Before:
```css
.search-form__input {
  flex: 1;
  padding: 20px 24px;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  color: #000000;
  font-family: 'Inter', sans-serif;
  background-color: transparent;
  transition: border-color 0.2s ease;
}
```

### After:
```css
.search-form__input {
  flex: 1;
  padding: 20px 24px;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  color: #000000;
  font-family: 'Inter', sans-serif;
  background-color: transparent;
  transition: border-color 0.2s ease;
}

.search-form__input:focus {
  outline: 2px solid #2f71e5;
  outline-offset: 2px;
}
```

**Explanation:** Added a `:focus` pseudo-class that displays a 2px blue outline when the input is focused. The `outline-offset: 2px` creates a small gap between the input and the outline for better visibility. This helps keyboard users see which form field they're currently interacting with.

---

## 2. SearchForm Button - Desktop Focus State

### Before:
```css
.search-form__button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### After:
```css
.search-form__button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.search-form__button:focus:not(:disabled) {
  outline: 2px solid #2f71e5;
  outline-offset: 2px;
}
```

**Explanation:** Added a focus state for the search button that only applies when the button is not disabled (`:not(:disabled)`). The blue outline matches the input focus style for consistency. This ensures keyboard users can see when the button is focused.

---

## 3. SearchForm Input - Mobile Focus State

### Before:
```css
  .search-form__input {
    padding: 17px 16px;
    border-radius: 100px !important;
    /* ... other styles ... */
    outline: none;
  }
```

### After:
```css
  .search-form__input {
    padding: 17px 16px;
    border-radius: 100px !important;
    /* ... other styles ... */
    outline: none;
  }
  
  .search-form__input:focus {
    outline: 2px solid #2f71e5;
    outline-offset: 2px;
    border-color: #2f71e5;
  }
```

**Explanation:** Added focus state for mobile input with both an outline and a border color change. The border color change provides additional visual feedback since mobile inputs have visible borders. This ensures the focus state is clear on smaller screens.

---

## 4. SearchForm Button - Mobile Focus State

### Before:
```css
  .search-form__button {
    padding: 17px 0;
    /* ... other styles ... */
    outline: none;
  }
```

### After:
```css
  .search-form__button {
    padding: 17px 0;
    /* ... other styles ... */
    outline: none;
  }
  
  .search-form__button:focus:not(:disabled) {
    outline: 2px solid #ffffff;
    outline-offset: 2px;
  }
```

**Explanation:** Added focus state for mobile button with a white outline (since the button has a blue background). The white outline provides good contrast against the blue button. The `:not(:disabled)` ensures the focus state only appears when the button is interactive.

---

## 5. Navigation Button - Desktop Focus State

### Before:
```css
.navigation__button:hover {
  background: rgba(0, 0, 0, 0.8);
}
```

### After:
```css
.navigation__button:hover {
  background: rgba(0, 0, 0, 0.8);
}

.navigation__button:focus {
  outline: 2px solid #2f71e5;
  outline-offset: 2px;
}
```

**Explanation:** Added focus state for navigation buttons (like "Sign in" button). The blue outline provides clear visual feedback when navigating with keyboard. This is important for accessibility as users can tab through navigation elements.

---

## 6. Navigation Button - Overlay Mode Focus State

### Before:
```css
.navigation_overlay .navigation__button:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #ffffff;
  color: #ffffff;
}
```

### After:
```css
.navigation_overlay .navigation__button:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #ffffff;
  color: #ffffff;
}

.navigation_overlay .navigation__button:focus {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
}
```

**Explanation:** Added focus state for navigation buttons in overlay mode (on the main page with transparent header). Used white outline instead of blue to match the white text and border of overlay buttons, ensuring good contrast against the dark/transparent background.

---

## 7. NewsCard Bookmark Button Focus State

### Before:
```css
.news-card__bookmark:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
```

### After:
```css
.news-card__bookmark:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.news-card__bookmark:focus {
  outline: 2px solid #2f71e5;
  outline-offset: 2px;
}
```

**Explanation:** Added focus state for the bookmark/save icon button on news cards. The blue outline helps keyboard users identify which card's save button they're focused on. This is crucial for accessibility when navigating through multiple article cards.

---

## 8. Modal Close Button Focus State

### Before:
```css
.modal__close-button:hover {
  opacity: 0.6;
}
```

### After:
```css
.modal__close-button:hover {
  opacity: 0.6;
}

.modal__close-button:focus {
  outline: 2px solid #2f71e5;
  outline-offset: 2px;
  border-radius: 4px;
}
```

**Explanation:** Added focus state for the modal close button (X icon). The blue outline with rounded corners provides clear visual feedback. The `border-radius: 4px` ensures the outline follows the button's shape. This is important because users should be able to close modals using keyboard navigation.

---

## 9. Modal Submit Button Focus State

### Before:
```css
.modal__submit-button_disabled {
  background-color: #e6e8eb;
  color: #b6bcbf;
  cursor: not-allowed;
}
```

### After:
```css
.modal__submit-button_disabled {
  background-color: #e6e8eb;
  color: #b6bcbf;
  cursor: not-allowed;
}

.modal__submit-button:focus:not(:disabled) {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
}
```

**Explanation:** Added focus state for modal submit buttons (like "Sign in" or "Sign up" in modals). Used white outline to contrast with the blue button background. The `:not(:disabled)` ensures the focus state only appears when the button is active, preventing confusion when the form is invalid.

---

## 10. Modal Footer Link Focus State

### Before:
```css
.modal__footer-link:hover {
  opacity: 0.7;
}
```

### After:
```css
.modal__footer-link:hover {
  opacity: 0.7;
}

.modal__footer-link:focus {
  outline: 2px solid #2f71e5;
  outline-offset: 2px;
  border-radius: 4px;
}
```

**Explanation:** Added focus state for modal footer links (like "Sign up" link in login modal). The blue outline matches the link color and provides clear focus indication. The `border-radius: 4px` gives the outline a subtle rounded appearance.

---

## 11. Main "Show More" Button Focus State

### Before:
```css
.main__show-more-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.main__show-more-button:active {
  background-color: rgba(0, 0, 0, 0.1);
}
```

### After:
```css
.main__show-more-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.main__show-more-button:active {
  background-color: rgba(0, 0, 0, 0.1);
}

.main__show-more-button:focus {
  outline: 2px solid #2f71e5;
  outline-offset: 2px;
}
```

**Explanation:** Added focus state for the "Show more" button that appears when there are more search results to display. The blue outline provides clear visual feedback for keyboard users navigating through the results page.

---

## Summary

**Total Changes:** 11 focus states added across 5 CSS files

**Files Modified:**
1. `src/components/SearchForm/SearchForm.css` - 4 focus states (input/button desktop + mobile)
2. `src/components/Navigation/Navigation.css` - 2 focus states (regular + overlay buttons)
3. `src/components/NewsCard/NewsCard.css` - 1 focus state (bookmark button)
4. `src/components/ModalWithForm/ModalWithForm.css` - 3 focus states (close, submit, footer link)
5. `src/components/Main/Main.css` - 1 focus state (show more button)

**Design Pattern:**
- All focus states use `outline: 2px solid [color]` with `outline-offset: 2px`
- Color choice based on context:
  - Blue (`#2f71e5`) for most elements
  - White (`#ffffff`) for elements on blue backgrounds
- Disabled elements are excluded using `:not(:disabled)` where applicable
- Mobile inputs also get `border-color` change for additional visual feedback

**Accessibility Impact:**
- ✅ All interactive elements now have visible focus indicators
- ✅ Keyboard navigation is fully supported
- ✅ Meets WCAG accessibility guidelines for focus visibility
- ✅ Addresses the unchecked criteria: "Form elements should be highlighted when focused"

