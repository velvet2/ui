import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    menus: Array<any> = [
        { "icon" : "room", "menu": "Rooms", "link" : "/room" },
        { "icon" : "person", "menu": "Users", "link" : "/user" },
        { "icon" : "group", "menu": "Groups", "link" : "/group" },
        { "icon" : "folder", "menu": "Datasets", "link" : "/dataset" },
        { "icon" : "settings", "menu": "Settings", "link" : "/setting" }
    ]
}
