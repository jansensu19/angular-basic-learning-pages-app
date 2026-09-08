export interface ProgressItem {
  id: string;
  name: string;
  category: 'directives' | 'binding' | 'forms' | 'router';
  subCategory?: string;
  description: string;
  completed: boolean;
  topicSlug: string;
  autoDetected?: boolean;
  detectedSnippet?: string;
}

export interface CategorySummary {
  key: string;
  title: string;
  icon: string;
  completed: number;
  total: number;
  percentage: number;
}

export const INITIAL_PROGRESS_ITEMS: ProgressItem[] = [
  // Directives
  {
    id: 'dir-if',
    name: 'ngIf / @if',
    category: 'directives',
    subCategory: 'Structural Directives',
    description: 'Conditional element rendering using @if or *ngIf',
    completed: false,
    topicSlug: 'directives-templates-animations'
  },
  {
    id: 'dir-for',
    name: 'ngFor / @for',
    category: 'directives',
    subCategory: 'Structural Directives',
    description: 'List iteration over collections with @for (or *ngFor) with track expression',
    completed: false,
    topicSlug: 'directives-templates-animations'
  },
  {
    id: 'dir-switch',
    name: 'ngSwitch / @switch',
    category: 'directives',
    subCategory: 'Structural Directives',
    description: 'Multi-branch conditional rendering using @switch / @case',
    completed: false,
    topicSlug: 'directives-templates-animations'
  },
  {
    id: 'dir-template',
    name: '<ng-template>',
    category: 'directives',
    subCategory: 'Structural Directives',
    description: 'Template definition for deferred or programmatic rendering',
    completed: false,
    topicSlug: 'directives-templates-animations'
  },
  {
    id: 'dir-component',
    name: 'ngComponentOutlet',
    category: 'directives',
    subCategory: 'Structural Directives',
    description: 'Dynamic component instantiation via ngComponentOutlet',
    completed: false,
    topicSlug: 'directives-templates-animations'
  },

  {
    id: 'dir-class',
    name: 'ngClass',
    category: 'directives',
    subCategory: 'Attribute Directives',
    description: 'Dynamic CSS class manipulation based on component state',
    completed: false,
    topicSlug: 'directives-templates-animations'
  },
  {
    id: 'dir-style',
    name: 'ngStyle',
    category: 'directives',
    subCategory: 'Attribute Directives',
    description: 'Inline style binding using conditional object syntax',
    completed: false,
    topicSlug: 'directives-templates-animations'
  },
  {
    id: 'dir-routerlink',
    name: 'routerLink',
    category: 'directives',
    subCategory: 'Attribute Directives',
    description: 'Declarative route navigation directive on anchor and buttons',
    completed: false,
    topicSlug: 'directives-templates-animations'
  },
  {
    id: 'dir-model',
    name: 'ngModel',
    category: 'directives',
    subCategory: 'Attribute Directives',
    description: 'Form control value binding directive from FormsModule',
    completed: false,
    topicSlug: 'directives-templates-animations'
  },

  // Binding
  {
    id: 'bind-interp',
    name: 'Interpolation {{ }}',
    category: 'binding',
    subCategory: 'Data Binding',
    description: 'Embed expressions and variable values directly into template HTML',
    completed: false,
    topicSlug: 'binding'
  },
  {
    id: 'bind-prop',
    name: 'Property Binding [prop]',
    category: 'binding',
    subCategory: 'Data Binding',
    description: 'Pass data down to DOM properties or child component @Input / signal input',
    completed: false,
    topicSlug: 'binding'
  },
  {
    id: 'bind-event',
    name: 'Event Binding (event)',
    category: 'binding',
    subCategory: 'Data Binding',
    description: 'Listen to user events (click, input, submit) and invoke methods',
    completed: false,
    topicSlug: 'binding'
  },
  {
    id: 'bind-twoway',
    name: 'Two-way Binding [()]',
    category: 'binding',
    subCategory: 'Data Binding',
    description: 'Synchronize input values and component state using [(ngModel)] or custom model()',
    completed: false,
    topicSlug: 'binding'
  },

  // Forms
  {
    id: 'form-template',
    name: 'Template-Driven Forms',
    category: 'forms',
    subCategory: 'Forms',
    description: 'Form with ngForm, ngModel, and template validation states (valid, touched)',
    completed: false,
    topicSlug: 'forms'
  },
  {
    id: 'form-reactive',
    name: 'Reactive Forms',
    category: 'forms',
    subCategory: 'Forms',
    description: 'FormGroup, FormControl, formControlName, and Validators in TypeScript',
    completed: false,
    topicSlug: 'reactive-forms'
  },

  // Router
  {
    id: 'router-nav',
    name: 'Router Navigation',
    category: 'router',
    subCategory: 'Router & Navigation',
    description: 'Route transitions using routerLink and programmatic router.navigate()',
    completed: false,
    topicSlug: 'router'
  }
];
