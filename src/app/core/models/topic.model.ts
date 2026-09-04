export interface Topic {
  id: string;
  title: string;
  slug: string; // e.g., 'binding', 'forms'
  summary: string;
}

export const TOPICS: Topic[] = [
  { id: '1', 
    title: 'Directives, Templates & Animations', 
    slug: 'directives-templates-animations', 
    summary: 'Learn built-in control flow (@if, @for), custom directives, and animations.' },
  { id: '2', 
    title: 'Data Binding', 
    slug: 'binding', 
    summary: 'Property, event, two-way binding, and modern Signals.' },
  { id: '3', 
    title: 'DOM Manipulation', 
    slug: 'dom', 
    summary: 'Accessing and modifying DOM via ElementRef and viewChild().' },
  { id: '4', 
    title: 'Template-driven Forms', 
    slug: 'forms', 
    summary: 'Working with FormsModule, ngModel, and basic validation.' },
  { id: '5', 
    title: 'Reactive Forms', 
    slug: 'reactive-forms', 
    summary: 'FormGroup, FormControl, and custom validators.' },
  { id: '6', 
    title: 'Angular Router', 
    slug: 'router', 
    summary: 'Route parameters, query params, and navigation lifecycle.' },
  { id: '7', 
    title: 'Lazy Loading', 
    slug: 'lazy-load', 
    summary: 'Lazy route loading and modern @defer template blocks.' },
];