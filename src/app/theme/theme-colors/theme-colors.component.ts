import { Component, OnInit } from '@angular/core';
import { SettingsProvider } from 'src/providers/settings/settings';
/**
 * Componente popover para elegir el color del tema personalizado
 */
@Component({
  selector: 'app-theme-colors',
  templateUrl: './theme-colors.component.html',
  styleUrls: ['./theme-colors.component.scss'],
})
export class ThemeColorsComponent implements OnInit {
  /** Arreglo con los colores de los temas correspondientes */
  public colors = [{class: 'theme1', color: '#FE5D26'},
  {class: 'theme2', color: '#F2C078'},
  {class: 'theme3', color: '#FAEDCA'},
  {class: 'theme4', color: '#7EBC89'},
  {class: 'theme5', color: '#C1DBB3'}];

public themes = {
  theme1: {
    primary: '#FE5D26',
    secondary: '#FFF',
    tertiary: '#FE5D26',
    light: '#FFF',
    medium: '#FE5D26',
    dark: '#FE5D26'
  },
  theme2: {
    primary: '#FFF',
    secondary: '#FFF',
    tertiary: '#FFF',
    medium: '#FFF',
    dark: '#F2C078',
    light: '#F2C078'
  },
  theme3: {
    primary: '#FAEDCA',
    secondary: '#FFF',
    tertiary: '#FAEDCA',
    light: '#FFF',
    medium: '#FAEDCA',
    dark: '#FAEDCA'
  },
  theme4: {
    primary: '#7EBC89',
    secondary: '#FFF',
    tertiary: '#7EBC89',
    light: '#FFF',
    medium: '#7EBC89',
    dark: '#7EBC89'
  },
  theme5: {
    primary: '#C1DBB3',
    secondary: '#FFF',
    tertiary: '#C1DBB3',
    light: '#FFF',
    medium: '#C1DBB3',
    dark: '#C1DBB3'
  }
};
  selectedTheme: string;
  constructor(private theme: SettingsProvider) { }
  
  ngOnInit() {}

  toggleAppTheme(name) {
    this.theme.setTheme(this.themes[name]);
    this.changeSpeed(1000);
  }
  changeSpeed(val) {
    this.theme.setVariable('--speed', `${val}ms`);
  } 
}
