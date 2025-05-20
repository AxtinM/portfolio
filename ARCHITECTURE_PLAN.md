# Image Integration Architecture Plan

## Current Analysis

Your current portfolio has a modern, sleek design with:
- Dark theme with accent colors (#FF204E, #A0153E)
- Retro grid background with card-based layout
- Clean typography using Geist fonts
- Animation effects (float, pulse, glow)

The hero section currently displays your name and title in a prominent card, but lacks a personal image.

## Integration Strategy

### Placement & Layout

The Bebop-style portrait will be integrated into the hero section for maximum impact. This requires:

1. Restructuring the hero card to create a side-by-side layout on desktop:
   - Image on the left
   - Name, title, description on the right
   - Stacked layout on mobile (image above text)

2. Using Next.js Image component for optimization:
   ```tsx
   import Image from "next/image";
   
   <Image 
     src="/me_bebop_style.png"
     alt="Mohamed Attig - Bebop Style Portrait"
     width={300}
     height={300}
     className="..."
   />
   ```

### Styling Approach

To match your site's aesthetic:

1. **Container Styling**:
   - Rounded borders matching card radius (var(--radius))
   - Subtle border using accent color
   - Background gradient with site theme colors

2. **Animation Effects**:
   - Apply `animate-float` for subtle movement
   - Add glow effect using the site's accent color
   - Transition effects on hover

3. **Responsive Behavior**:
   ```css
   /* Desktop */
   .hero-layout {
     @apply flex flex-row items-center gap-8;
   }
   
   /* Mobile */
   @media (max-width: 768px) {
     .hero-layout {
       @apply flex-col items-center text-center;
     }
   }
   ```

## Implementation Details

The primary change will be to the Hero Card section in `app/page.tsx`:

1. Add image container div with proper styling
2. Implement responsive layout with flexbox
3. Add appropriate animations from existing global.css
4. Ensure accessibility with proper alt text
5. Add fallback handling in case image fails to load

## Risks & Considerations

1. The image file appears to have an authentication error that needs to be resolved
2. Mobile layout needs careful consideration to maintain hierarchy
3. Image size should be optimized for performance
4. Animation effects should be subtle and not distract from content

## Next Steps

1. Modify `app/page.tsx` to implement the new hero section layout
2. Test responsiveness across multiple device sizes
3. Verify image loading and fallback behavior
4. Consider enhancing with interactive hover effects