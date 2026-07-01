# Responsive Design System - Quick Reference

## Responsive Variables (in `variables.scss`)

### Breakpoints
```scss
$breakpoint-xl: 1440px;
$breakpoint-lg: 1024px;
$breakpoint-md: 768px;   // Tablet
$breakpoint-sm: 480px;   // Mobile
$breakpoint-xs: 320px;   // Small mobile
```

### Using the `respond-to()` Mixin

Apply responsive styles using the `respond-to()` mixin:

```scss
.element {
  font-size: 1.5rem;  // Desktop
  
  @include respond-to("lg") {
    font-size: 1.25rem;  // Large screens
  }
  
  @include respond-to("md") {
    font-size: 1rem;  // Tablets
  }
  
  @include respond-to("sm") {
    font-size: 0.875rem;  // Mobile
  }
}
```

### Using `grid-responsive()` Mixin

Create responsive grids easily:

```scss
.card-grid {
  @include grid-responsive(4, 2, 1, 1);
  // 4 columns on desktop
  // 2 columns on lg
  // 1 column on md
  // 1 column on sm
}
```

## Common Responsive Patterns

### Responsive Padding/Margin
```scss
.container {
  padding: $space-xl;  // 2rem
  
  @include respond-to("md") {
    padding: $space-lg;  // 1.5rem
  }
  
  @include respond-to("sm") {
    padding: $space-md;  // 1rem
  }
}
```

### Responsive Font Sizes
```scss
h1 {
  font-size: $font-size-3xl;  // 2rem
  
  @include respond-to("md") {
    font-size: $font-size-2xl;  // 1.5rem
  }
  
  @include respond-to("sm") {
    font-size: $font-size-xl;  // 1.25rem
  }
}
```

### Hide/Show Elements
```scss
.desktop-only {
  @include respond-to("md") {
    display: none;
  }
}

.mobile-only {
  display: none;
  
  @include respond-to("md") {
    display: block;
  }
}
```

### Responsive Flex Layout
```scss
.flex-container {
  display: flex;
  gap: $space-lg;
  
  @include respond-to("md") {
    flex-direction: column;
    gap: $space-md;
  }
}
```

## Spacing System

```scss
$space-xs:   0.25rem    // 4px
$space-sm:   0.5rem     // 8px
$space-md:   1rem       // 16px
$space-lg:   1.5rem     // 24px
$space-xl:   2rem       // 32px
$space-2xl:  3rem       // 48px
```

## Font Sizes

```scss
$font-size-xs:   0.75rem    // 12px
$font-size-sm:   0.875rem   // 14px
$font-size-base: 1rem       // 16px
$font-size-lg:   1.125rem   // 18px
$font-size-xl:   1.25rem    // 20px
$font-size-2xl:  1.5rem     // 24px
$font-size-3xl:  2rem       // 32px
```

## Border Radius

```scss
$radius-sm:   8px      // Small buttons
$radius-md:   12px     // Default
$radius-lg:   16px     // Cards
$radius-xl:   20px     // Large cards
$radius-2xl:  28px     // Modal/Container
```

## Shadow System

```scss
$shadow-sm: 0 2px 8px rgba($navy, 0.04);
$shadow-md: 0 4px 16px rgba($navy, 0.06);
$shadow-lg: 0 16px 38px rgba($navy, 0.06);
$shadow-xl: 0 38px 84px rgba($navy, 0.16);
```

## Transition Times

```scss
$transition-fast: 0.15s ease;   // Quick feedback
$transition-base: 0.25s ease;   // Normal
$transition-slow: 0.35s ease;   // Slower animations
```

## Real-World Examples

### Responsive Card Layout
```scss
.card-container {
  @include grid-responsive(3, 2, 2, 1);
  gap: $space-lg;
  
  @include respond-to("md") {
    gap: $space-md;
  }
}

.card {
  padding: $space-lg;
  border-radius: $radius-lg;
  box-shadow: $shadow-md;
  
  @include respond-to("sm") {
    padding: $space-md;
  }
}
```

### Responsive Navigation
```scss
.nav {
  display: flex;
  gap: $space-lg;
  
  @include respond-to("md") {
    flex-direction: column;
    gap: $space-md;
  }
}

.nav-link {
  padding: $space-md $space-lg;
  
  @include respond-to("sm") {
    padding: $space-sm $space-md;
    font-size: $font-size-sm;
  }
}
```

### Responsive Form
```scss
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $space-lg;
  
  @include respond-to("md") {
    grid-template-columns: 1fr;
    gap: $space-md;
  }
}
```

## Testing Responsive Design

### Using Browser DevTools
1. Open Chrome DevTools (F12)
2. Click Device Toggle Toolbar (Ctrl+Shift+M)
3. Select device or set custom dimensions
4. Test at key breakpoints:
   - 320px (small mobile)
   - 480px (mobile)
   - 768px (tablet)
   - 1024px (large)
   - 1440px (desktop)

### Mobile-First Development Tips
1. Start with mobile styles first
2. Add breakpoints for larger screens
3. Test touch interactions on actual mobile devices
4. Use `@include respond-to("md")` to progressively enhance

## Accessibility Considerations

- Minimum touch target size: 44px × 44px
- Font sizes never go below 12px (use $font-size-xs)
- Use `prefer-reduced-motion` in globals.scss
- Ensure adequate spacing for keyboard navigation
- Test with screen readers on different devices

## Best Practices

✅ Use the spacing system consistently
✅ Use responsive mixins instead of raw media queries
✅ Mobile-first: start small, enhance for larger screens
✅ Test on real devices, not just browser emulation
✅ Keep layouts flexible with flexbox/grid
✅ Use max-width containers for better readability
✅ Optimize images for mobile (use modern formats)
✅ Minimize animations on mobile devices
✅ Touch-friendly button sizes on mobile
✅ Consider safe areas on notched devices
