# HomeCare Admin Dashboard - Premium UI

A modern, premium admin dashboard for a home care services platform built with Next.js, React, Tailwind CSS, and shadcn/ui. Designed with SaaS best practices inspired by Stripe, Vercel, and Notion.

## Features

### 🎨 Design Excellence
- **Premium Aesthetic**: Soft shadows, subtle gradients, and refined typography
- **Perfect Alignment**: 8px spacing scale with consistent padding and margins
- **Modern SaaS Style**: Minimal, clean interface with proper visual hierarchy
- **Dark Mode**: Full dark mode support with OKLch color system
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

### 🧩 Component Library
- **Improved Sidebar**: Collapsible navigation with active states and hover effects
- **Enhanced Header**: Search, notifications, theme toggle, and profile dropdown
- **Premium Cards**: Stat cards with animated values and trend indicators
- **Advanced Tables**: Sortable, filterable, paginated data tables
- **Modern Charts**: Gradient fills, smooth animations, interactive tooltips
- **Loading States**: Skeleton loaders for all content types

### ⚡ Performance & UX
- **Smooth Animations**: Micro-interactions with staggered delays
- **Accessibility**: WCAG 2.1 AA compliance, keyboard navigation
- **Optimized**: CSS transitions over JS, GPU-accelerated transforms
- **Mobile Optimized**: Touch-friendly, responsive layouts
- **Fast Load Times**: Code splitting, lazy loading, optimized assets

### 🛠️ Technology Stack
- **Framework**: Next.js 16+ with App Router
- **UI Library**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS 4.2 with PostCSS
- **Charts**: Recharts with custom tooltips
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Colors**: OKLch color space for perceptual uniformity

## Getting Started

### Prerequisites
- Node.js 18+ (for pnpm, npm, or yarn)
- A modern browser

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd v0-admin-dashboard-ui
```

2. Install dependencies:
```bash
pnpm install
# or npm install
# or yarn install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
.
├── app/
│   ├── globals.css              # Global styles & animations
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   └── dashboard/
│       ├── layout.tsx           # Dashboard layout with sidebar
│       ├── page.tsx             # Dashboard overview
│       ├── bookings/            # Bookings section
│       ├── users/               # Users section
│       ├── services/            # Services section
│       ├── settings/            # Settings section
│       └── notifications/       # Notifications section
├── components/
│   ├── app-sidebar.tsx          # Navigation sidebar
│   ├── dashboard-header.tsx     # Top header bar
│   ├── stat-card.tsx            # Stat card component
│   ├── recent-bookings.tsx      # Recent activity list
│   ├── overview-charts.tsx      # Chart components
│   ├── breadcrumbs.tsx          # Breadcrumb navigation
│   ├── section.tsx              # Section layout components
│   ├── grid.tsx                 # Grid layout utilities
│   ├── status-badge.tsx         # Status indicators
│   ├── empty-state.tsx          # Empty state placeholder
│   ├── loading-skeleton.tsx     # Skeleton loaders (NEW)
│   ├── data-table.tsx           # Advanced table (NEW)
│   ├── theme-provider.tsx       # Theme management
│   └── ui/                      # shadcn/ui components
├── hooks/
│   ├── useMobile.ts             # Mobile detection
│   └── useToast.ts              # Toast notifications
├── lib/
│   ├── types.ts                 # TypeScript types
│   ├── utils.ts                 # Utility functions
│   └── mock-data.ts             # Sample data
├── public/                      # Static assets
├── styles/                      # Additional styles
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
└── README.md

## Key Components

### Sidebar (`components/app-sidebar.tsx`)
- Collapsible navigation with smooth animations
- Active state styling with color transitions
- Badge support for notifications
- Pro upgrade promotional card
- User profile footer with logout

### Dashboard Header (`components/dashboard-header.tsx`)
- Sticky positioning with backdrop blur
- Search with keyboard shortcut indicator
- Notification bell with pulse animation
- Theme toggle dropdown
- Profile menu with user options

### Stat Cards (`components/stat-card.tsx`)
- Animated number counters
- Trend indicators (up/down)
- Gradient backgrounds
- Icon displays
- Hover lift effect

### Charts (`components/overview-charts.tsx`)
- Area chart for bookings trend
- Bar chart for revenue breakdown
- Gradient fills and animations
- Interactive tooltips
- Mobile responsive

### Data Table (`components/data-table.tsx`)
- Column-based data display
- Sortable columns
- Search filtering
- Column visibility toggle
- Row selection
- Pagination controls

## Styling System

### Color Palette
- **Primary**: oklch(0.55 0.2 250) - Blue
- **Success**: oklch(0.65 0.2 145) - Emerald
- **Warning**: oklch(0.75 0.18 80) - Amber
- **Destructive**: oklch(0.55 0.22 25) - Red

### Spacing Scale
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px

### Typography
- **Font Family**: Geist (sans-serif), Geist Mono
- **Sizes**: xs (12px), sm (14px), base (16px), lg (18px), xl+ varies
- **Weights**: Regular (400), Medium (500), Semibold (600)

### Animations
- `animate-fade-in`: Fade + slide up (0.5s)
- `animate-slide-in-right`: Slide from left (0.4s)
- `animate-scale-in`: Scale + fade (0.3s)
- `animate-slide-up`: Upward entrance (0.5s)
- `stagger-children`: Auto-delayed children animation

## Usage Examples

### Using Stat Cards
```tsx
import { StatCard } from "@/components/stat-card"
import { Users } from "lucide-react"

<StatCard
  title="Total Users"
  value={1234}
  change={12}
  icon={<Users className="size-5" />}
/>
```

### Using Data Table
```tsx
import { DataTable } from "@/components/data-table"
import type { ColumnDef } from "@tanstack/react-table"

const columns: ColumnDef<YourData>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  // ... more columns
]

<DataTable columns={columns} data={data} searchKey="name" />
```

### Using Loading Skeleton
```tsx
import { DashboardSkeleton } from "@/components/loading-skeleton"

export default function Loading() {
  return <DashboardSkeleton />
}
```

### Using Status Badge
```tsx
import { StatusBadge } from "@/components/status-badge"

<StatusBadge variant="success">Active</StatusBadge>
<StatusBadge variant="warning">Pending</StatusBadge>
<StatusBadge variant="destructive">Cancelled</StatusBadge>
```

## Dark Mode

Dark mode is automatically enabled based on system preferences. Users can toggle between light, dark, and system modes via the theme dropdown in the header.

The color system adjusts all colors to maintain contrast and readability in dark mode using OKLch color space.

## Responsive Breakpoints

| Breakpoint | Width | Use Case |
|-----------|-------|----------|
| `base` | 0px+ | Mobile |
| `sm` | 640px+ | Tablets |
| `md` | 768px+ | Small laptops |
| `lg` | 1024px+ | Desktops |
| `xl` | 1280px+ | Large screens |
| `2xl` | 1536px+ | Extra large |

## Accessibility

- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Focus indicators (outline ring)
- ✅ Color contrast ratios (WCAG AA)
- ✅ Motion preferences respected

## Performance Optimizations

- CSS transitions (GPU-accelerated)
- No unnecessary re-renders
- Code splitting by route
- Lazy loading for charts and tables
- Optimized images and assets
- Minimal vendor bundle

## Browser Support

| Browser | Minimum Version | Status |
|---------|-----------------|--------|
| Chrome | Latest | ✅ Full Support |
| Firefox | Latest | ✅ Full Support |
| Safari | 13.1+ | ✅ Full Support |
| Edge | 79+ | ✅ Full Support |

## Development

### Building for Production
```bash
pnpm build
pnpm start
```

### Linting
```bash
pnpm lint
```

### Environment Variables
Create a `.env.local` file:
```bash
NEXT_PUBLIC_APP_NAME=HomeCare Admin
```

## Related Documentation

- [Design Improvements Guide](./DESIGN_IMPROVEMENTS.md) - Detailed design system documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

MIT License - feel free to use this dashboard in your projects

## Credits

Built with:
- [Next.js](https://nextjs.org)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Radix UI](https://www.radix-ui.com)
- [Recharts](https://recharts.org)
- [Lucide Icons](https://lucide.dev)
