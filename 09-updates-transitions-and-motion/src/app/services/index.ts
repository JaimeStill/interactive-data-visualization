import { AppService } from './app.service';
import { CoreService } from './core.service';
import { SnackerService } from './snacker.service';
import { ThemeService } from './theme.service';

export const Services = [
  AppService,
  CoreService,
  SnackerService,
  ThemeService
];

export * from './app.service';
export * from './core.service';
export * from './snacker.service';
export * from './theme.service';
