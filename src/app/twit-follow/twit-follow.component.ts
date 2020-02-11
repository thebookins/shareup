import { Component, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-twit-follow',
  templateUrl: './twit-follow.component.html',
  styleUrls: ['./twit-follow.component.css']
})
export class TwitFollowComponent implements AfterViewInit {
  // @Input() url = location.href;
  @Input() text = '';

  constructor() {
    // load twitter sdk if required
    const url = 'https://platform.twitter.com/widgets.js';
    if (!document.querySelector(`script[src='${url}']`)) {
        let script = document.createElement('script');
        script.src = url;
        document.body.appendChild(script);
    }
  }

  ngAfterViewInit(): void {
      // render tweet button
      window['twttr'] && window['twttr'].widgets.load();
  }
}
