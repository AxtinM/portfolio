# Portrait Integration Implementation Plan

This document outlines the specific code changes needed to integrate your Bebop-style portrait into the homepage while maintaining the existing design aesthetics.

## Code Modifications - app/page.tsx

The hero section (around line 180-217) needs to be modified to include your portrait image. Here's the implementation plan:

### Current Hero Section Structure
```tsx
<section className="w-full flex flex-col items-center mb-10">
  <Card className="w-full bg-background/90 border border-accent shadow-2xl backdrop-blur-lg">
    <CardHeader className="flex flex-col items-center">
      <CardTitle className="text-4xl md:text-5xl font-extrabold text-accent-foreground mb-2 font-[var(--font-geist-mono)]">
        Mohamed Attig
      </CardTitle>
      <CardDescription className="text-xl md:text-2xl font-bold text-muted-foreground my-4 font-[var(--font-geist-mono)] text-center">
        Full Stack Developer & AI Specialist
      </CardDescription>
      <CardDescription className="text-base md:text-lg text-muted-foreground mb-4 text-center">
        Passionate about building intelligent, scalable solutions...
      </CardDescription>
      <div className="flex flex-col md:flex-row gap-4 items-center mt-4">
        <a href="mailto:attigmohammed@gmail.com"...>
        <a href="https://www.linkedin.com/in/mohamedattig"...>
      </div>
    </CardHeader>
  </Card>
</section>
```

### New Hero Section Structure
```tsx
<section className="w-full flex flex-col items-center mb-10">
  <Card className="w-full bg-background/90 border border-accent shadow-2xl backdrop-blur-lg overflow-hidden">
    <CardHeader className="p-6">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Portrait Image Container */}
        <div className="portrait-container flex-shrink-0 mb-6 md:mb-0">
          <div className="portrait-wrapper relative w-[220px] h-[220px] rounded-full overflow-hidden border-2 border-accent/50 shadow-accent/30 shadow-lg animate-float">
            <Image
              src="/me_bebop_style.png"
              alt="Mohamed Attig - Bebop Style Portrait"
              fill
              style={{ objectFit: "cover" }}
              className="hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
        </div>
        
        {/* Text Content Container */}
        <div className="text-content flex flex-col items-center md:items-start">
          <CardTitle className="text-4xl md:text-5xl font-extrabold text-accent-foreground mb-2 font-[var(--font-geist-mono)] text-center md:text-left">
            Mohamed Attig
          </CardTitle>
          <CardDescription className="text-xl md:text-2xl font-bold text-muted-foreground my-4 font-[var(--font-geist-mono)] text-center md:text-left">
            Full Stack Developer & AI Specialist
          </CardDescription>
          <CardDescription className="text-base md:text-lg text-muted-foreground mb-4 text-center md:text-left">
            Passionate about building intelligent, scalable solutions that solve real problems.
            I specialize in developing AI-driven applications with Python/FastAPI backends and
            modern React frontends. My experience spans LLM integration, RAG architecture,
            and full-stack web development.
          </CardDescription>
          <div className="flex flex-col md:flex-row gap-4 items-center md:items-start mt-4">
            <a
              href="mailto:attigmohammed@gmail.com"
              className="text-foreground bg-accent/20 px-4 py-2 rounded flex items-center gap-2 hover:text-background hover:bg-accent focus:text-background focus:bg-accent transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/mohamedattig"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground bg-accent/20 px-4 py-2 rounded flex items-center gap-2 hover:text-background hover:bg-accent focus:text-background focus:bg-accent transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </CardHeader>
  </Card>
</section>
```

## Required Imports

Make sure to add this import at the top of the file:

```tsx
import Image from "next/image";
```

## CSS Additions (Optional)

If you want to enhance the portrait with additional CSS effects that aren't already in your global.css, you could create a new CSS file or add these styles to your existing ones:

```css
.portrait-container {
  position: relative;
}

.portrait-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 9999px;
  background: radial-gradient(circle at center, transparent 95%, var(--accent) 100%);
  pointer-events: none;
  z-index: 10;
}

.portrait-wrapper:hover {
  box-shadow: 0 0 20px rgba(255, 32, 78, 0.6);
  transition: box-shadow 0.3s ease;
}
```

## Fallback Handling

To handle potential image loading issues, you might want to add an `onError` handler:

```tsx
<Image
  src="/me_bebop_style.png"
  alt="Mohamed Attig - Bebop Style Portrait"
  fill
  style={{ objectFit: "cover" }}
  className="hover:scale-105 transition-transform duration-300"
  priority
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.src = "/default-avatar.svg"; // Replace with a default image
    console.error("Failed to load profile image");
  }}
/>
```

## Mobile Responsiveness

The changes above already include responsive design considerations:
1. Flex direction changes from column to row on medium screens
2. Text alignment changes from center to left on medium screens
3. Image container has specific dimensions that work well across device sizes

## Implementation Steps

1. Add the Image import to app/page.tsx
2. Replace the current hero section with the new implementation
3. Test the layout on different screen sizes
4. Verify the portrait loads correctly and animates as expected
5. (Optional) Add any additional CSS effects to enhance the portrait