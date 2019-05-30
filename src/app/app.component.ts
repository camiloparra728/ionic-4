import { Component } from '@angular/core';

import { Platform, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ThemeColorsComponent } from './theme/theme-colors/theme-colors.component';
import { SettingsProvider } from 'src/providers/settings/settings';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  selectedTheme: string;
  public appPages = [
    {
      title: 'Consulta',
      url: '/request',
      icon: 'home'
    },
    {
      title: 'Registro',
      url: '/register',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public popoverController: PopoverController,
    private settings: SettingsProvider,  
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async showColors(ev: any) {
    const popover = await this.popoverController.create({
      component: ThemeColorsComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  out() {
    this.settings.storage.clear();
  }
}
